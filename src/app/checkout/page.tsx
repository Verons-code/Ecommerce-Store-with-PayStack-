"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
    );

    if (items.length > 0 && listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }

    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.4 }
      );
    }
  }, [items.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            drink: {
              id: item.drink.id,
              name: item.drink.name,
              price: item.drink.price,
            },
            quantity: item.quantity,
          })),
          customer: formData,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      window.location.assign(data.url);
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : "Unable to start checkout."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:px-12">
      <div ref={headerRef}>
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--text-primary)]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to shop
        </Link>
        <h1 className="font-display text-4xl font-bold md:text-5xl">Checkout</h1>
        <p className="mt-2 text-[color:var(--text-secondary)]">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {items.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-lg text-[color:var(--text-secondary)]">Your cart is empty.</p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-[color:var(--surface)] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[color:var(--color-cream)] transition-transform hover:scale-105"
          >
            Browse Drinks
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          {/* Cart items */}
          <div ref={listRef}>
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[color:var(--text-secondary)]">
              Your Order
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.drink.id}
                  className="flex items-center gap-4 rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-alt)]/70 p-4"
                >
                  <Image
                    src={item.drink.image}
                    alt={item.drink.name}
                    width={64}
                    height={64}
                    className="rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold">
                      {item.drink.name}
                    </h3>
                    <p className="text-sm text-[color:var(--text-secondary)]">
                      ${item.drink.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.drink.id, item.quantity - 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border-soft)] text-sm transition-colors hover:bg-[color:var(--surface)] hover:text-[color:var(--color-cream)]"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.drink.id, item.quantity + 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border-soft)] text-sm transition-colors hover:bg-[color:var(--surface)] hover:text-[color:var(--color-cream)]"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.drink.id)}
                    className="text-[color:var(--text-secondary)] transition-colors hover:text-red-500"
                    aria-label="Remove item"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[color:var(--border-soft)] pt-6">
              <span className="font-display text-xl font-semibold">Total</span>
              <span className="font-display text-2xl font-bold">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Checkout form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--text-secondary)]">
              Shipping Details
            </h2>

            {(
              [
                { name: "name", label: "Full Name", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "address", label: "Address", type: "text" },
                { name: "city", label: "City", type: "text" },
                { name: "zip", label: "ZIP Code", type: "text" },
              ] as const
            ).map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="mb-1.5 block text-sm font-medium text-[color:var(--text-secondary)]"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  type={field.type}
                  required
                  value={formData[field.name]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field.name]: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-[color:var(--border-soft)] bg-[color:var(--input-bg)] px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none transition-colors placeholder:text-[color:var(--text-secondary)] focus:border-[color:var(--color-gold)] focus:ring-1 focus:ring-[color:var(--color-gold)]"
                />
              </div>
            ))}

            {checkoutError && (
              <p className="text-sm text-red-500">{checkoutError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-full bg-[color:var(--color-charcoal)] py-4 text-sm font-semibold uppercase tracking-wider text-[color:var(--color-cream)] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Redirecting to Paystack..." : `Pay with Paystack — $${total.toFixed(2)}`}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
