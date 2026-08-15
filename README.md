# Banana — Premium Craft Drinks

Banana is a premium beverage storefront built with Next.js, Tailwind CSS, and GSAP. It showcases a product carousel, shopping cart flow, and Paystack-powered checkout experience for artisan drinks.

## Features

- Interactive drink carousel with animated transitions
- Mouse-driven bottle tilt effect with spring motion
- Soft animated hero background that matches each product color
- Cart management with quantity controls
- Checkout form for customer details
- Paystack integration for payment initialization
- Responsive layout for desktop and mobile

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- GSAP
- Paystack API

## Project Structure

```bash
.
├── pages/
│   └── api/
│       └── checkout.ts
├── src/
│   ├── app/
│   ├── components/
│   ├── context/
│   └── data/
├── assets/
├── public/
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── next.config.ts
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env.local
```

3. Add your Paystack secret key:

```env
PAYSTACK_SECRET_KEY=your_paystack_secret_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Start the app:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `PAYSTACK_SECRET_KEY` — Paystack secret key used to initialize transactions
- `NEXT_PUBLIC_SITE_URL` — base URL used for redirects after checkout

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero carousel and brand sections |
| `/checkout` | Cart review and customer checkout form |

## Deployment

This app is ready for deployment on platforms like Vercel. Make sure to add the environment variables in your deployment dashboard and set the correct production URL.

## Notes

- Do not commit real secret keys.
- Keep `.env.local` local to your machine and ignore it in Git.
