/*
Stripe webhook handler that listens for checkout.session.completed and sends an email notification via SendGrid.

Setup (local / deployment):
1. Install dependencies:
   npm install stripe @sendgrid/mail

2. Environment variables (do NOT commit keys):
   STRIPE_SECRET_KEY      - your Stripe secret key (test or live)
   STRIPE_WEBHOOK_SECRET  - the webhook signing secret for the endpoint (from Stripe CLI or Dashboard)
   SENDGRID_API_KEY       - your SendGrid API key
   SENDGRID_SENDER        - verified sender email in SendGrid (e.g. hello@yourdomain.com)
   NOTIFY_RECIPIENT       - email address to receive notifications (e.g. orders@yourdomain.com)

3. Register / configure webhook:
   - For local development use the Stripe CLI:
       stripe login
       stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
     Copy the `Signing secret` (whsec_...) printed by the CLI and set STRIPE_WEBHOOK_SECRET.
   - For production register https://yourdomain.com/api/webhooks/stripe in the Stripe Dashboard (Developers → Webhooks) and copy the signing secret.

Notes:
- This route disables Next's body parsing (required to verify the Stripe signature against the raw request body).
- Do not paste any secret keys into source control or chat. Set them in your hosting environment or in a local .env.local file.
*/

import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import sgMail from "@sendgrid/mail";

// Disable body parsing so we can access the raw body for Stripe signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripeSecret = process.env.STRIPE_SECRET_KEY || "";
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
const sendgridKey = process.env.SENDGRID_API_KEY || "";
const sendgridFrom = process.env.SENDGRID_SENDER || "";
const notifyRecipient = process.env.NOTIFY_RECIPIENT || "";

if (sendgridKey) sgMail.setApiKey(sendgridKey);

const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

async function buffer(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", (err) => reject(err));
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const sig = req.headers["stripe-signature"] as string | undefined;
  if (!sig) {
    return res.status(400).send("Missing Stripe signature header");
  }

  if (!stripe) {
    return res.status(500).json({ error: "Stripe is not configured. Set STRIPE_SECRET_KEY." });
  }

  let event: Stripe.Event;
  try {
    const rawBody = await buffer(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error("⚠️  Webhook signature verification failed.", err?.message || err);
    return res.status(400).send(`Webhook Error: ${err?.message || err}`);
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      // Optionally fetch line items for the session to include in the email
      let lineItemsText = "";
      try {
        const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
        if (items && items.data && items.data.length) {
          lineItemsText = items.data
            .map((li) => `- ${li.description || li.price?.product || "item"} x ${li.quantity || 1} (${(li.amount_total ?? 0) / 100} ${li.currency?.toUpperCase() || ""})`)
            .join("\n");
        }
      } catch (err) {
        console.warn("Could not fetch line items:", err);
      }

      // Build email content
      const customerEmail = (session.customer_details && session.customer_details.email) || "(unknown)";
      const amount = ((session.amount_total ?? 0) / 100).toFixed(2);
      const currency = (session.currency || "").toUpperCase();

      const subject = `New order — ${session.id}`;
      const text = `A customer completed checkout.\n\nSession ID: ${session.id}\nCustomer: ${customerEmail}\nAmount: ${amount} ${currency}\n\nLine items:\n${lineItemsText || "(no line items fetched)"}\n\nView this session in Stripe Dashboard: https://dashboard.stripe.com/test/payments`;

      const html = `<p>A customer completed checkout.</p>
      <ul>
        <li><strong>Session ID:</strong> ${session.id}</li>
        <li><strong>Customer:</strong> ${customerEmail}</li>
        <li><strong>Amount:</strong> ${amount} ${currency}</li>
      </ul>
      <p><strong>Line items:</strong></p>
      <pre style="white-space:pre-wrap;">${lineItemsText || "(no line items fetched)"}</pre>
      <p><a href="https://dashboard.stripe.com/test/payments">Open in Stripe Dashboard</a></p>`;

      // Send notification email via SendGrid
      if (sendgridKey && sendgridFrom && notifyRecipient) {
        try {
          await sgMail.send({
            to: notifyRecipient,
            from: sendgridFrom,
            subject,
            text,
            html,
          });
          console.log("Notification email sent for session", session.id);
        } catch (err) {
          console.error("Error sending SendGrid notification:", err);
        }
      } else {
        console.warn("SendGrid not configured — skipping email send. Set SENDGRID_API_KEY, SENDGRID_SENDER and NOTIFY_RECIPIENT.");
      }

      break;
    }

    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
}
