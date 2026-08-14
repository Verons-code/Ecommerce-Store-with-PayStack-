import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-12">
      <div className="max-w-xl rounded-[2rem] border border-charcoal/10 bg-[color:var(--surface-alt)]/80 p-8 text-center shadow-xl shadow-charcoal/5 backdrop-blur">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="font-display text-4xl font-bold text-[color:var(--text-primary)]">Payment canceled</h1>
        <p className="mt-4 text-[color:var(--text-secondary)]">
          No charge was made. Your cart is still ready if you want to try again.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/checkout" className="rounded-full bg-charcoal px-8 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-transform hover:scale-[1.02]">
            Return to checkout
          </Link>
          <Link href="/" className="rounded-full border border-charcoal/15 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[color:var(--text-primary)] transition-transform hover:scale-[1.02]">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
