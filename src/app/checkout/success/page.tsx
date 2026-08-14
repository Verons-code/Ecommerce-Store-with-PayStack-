import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-12">
      <div className="max-w-xl rounded-[2rem] border border-gold/25 bg-[color:var(--surface-alt)]/80 p-8 text-center shadow-xl shadow-charcoal/5 backdrop-blur">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/20 text-gold">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-4xl font-bold text-[color:var(--text-primary)]">Payment successful</h1>
        <p className="mt-4 text-[color:var(--text-secondary)]">
          Your order is confirmed. We&apos;ll send the receipt and updates to your email shortly.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="rounded-full bg-charcoal px-8 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-transform hover:scale-[1.02]">
            Continue shopping
          </Link>
          <Link href="/checkout" className="rounded-full border border-charcoal/15 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[color:var(--text-primary)] transition-transform hover:scale-[1.02]">
            Back to cart
          </Link>
        </div>
      </div>
    </div>
  );
}
