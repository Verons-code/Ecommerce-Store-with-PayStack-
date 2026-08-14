"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Footer() {
  const { itemCount } = useCart();

  return (
    <footer className="border-t border-[color:var(--border-soft)] bg-[color:var(--surface)] text-[color:var(--color-cream)]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-[0.08em] text-[color:var(--color-cream)]">
              BANANA
            </h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[rgba(245,240,232,0.72)]">
              Premium craft drinks made with real ingredients. No artificial
              flavors, no compromises.
            </p>
          </div>

          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[rgba(245,240,232,0.72)] transition-colors hover:text-[color:var(--color-cream)]"
                >
                  Shop Drinks
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="inline-flex items-center text-[rgba(245,240,232,0.72)] transition-colors hover:text-[color:var(--color-cream)]"
                >
                  Checkout
                  {itemCount > 0 && (
                    <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[0.65rem] font-bold text-charcoal">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-[rgba(245,240,232,0.72)]">
              <li>veronsbananadrinks@email.com</li>
              <li>Mon – Fri, 9am – 5pm</li>
              <li>Free shipping over $25</li>
              <li>Accra - Ghana</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[color:var(--border-soft)] pt-8 text-[0.72rem] text-[rgba(245,240,232,0.72)] sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Banana Drinks. All rights reserved.</p>
          <p>created by Veron Owusu.</p>
          <p>Crafted with care, bottled with love.</p>
        </div>
      </div>
    </footer>
  );
}
