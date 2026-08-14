import type { NextApiRequest, NextApiResponse } from "next";

const paystackSecret = process.env.PAYSTACK_SECRET_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!paystackSecret) {
    return res.status(500).json({
      error: "Paystack is not configured. Set PAYSTACK_SECRET_KEY.",
    });
  }

  const { items, customer } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Cart is empty." });
  }

  if (!customer?.email) {
    return res.status(400).json({ error: "Customer email is required." });
  }

  try {
    const protocol = req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const host = req.headers.host || "localhost:3000";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

    const amount = items.reduce((total: number, item: any) => {
      const quantity = Number(item.quantity || 1);
      const price = Number(item.drink?.price || 0);
      return total + price * quantity;
    }, 0);

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: customer.email,
        amount: Math.round(amount * 100),
        currency: "GHS",
        reference: `banana-${Date.now()}`,
        callback_url: `${siteUrl}/checkout?success=1`,
        metadata: {
          custom_fields: [
            { display_name: "Name", variable_name: "name", value: customer.name || "" },
            { display_name: "Address", variable_name: "address", value: customer.address || "" },
            { display_name: "City", variable_name: "city", value: customer.city || "" },
            { display_name: "ZIP Code", variable_name: "zip", value: customer.zip || "" },
            {
              display_name: "Items",
              variable_name: "items",
              value: items
                .map((item: any) => `${item.drink?.name || "Drink"} x ${item.quantity || 1}`)
                .join(", "),
            },
          ],
        },
      }),
    });

    const data = await response.json();

    if (!response.ok || !data?.status || !data?.data?.authorization_url) {
      throw new Error(data?.message || "Unable to initialize Paystack checkout.");
    }

    return res.status(200).json({
      url: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error: any) {
    console.error("Failed to create Paystack checkout session", error);
    return res.status(500).json({
      error: error?.message || "Unable to create checkout session.",
    });
  }
}
