"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { drinks } from "@/data/drinks";
import { useCart } from "@/context/CartContext";

export default function DrinkCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { addItem, itemCount } = useCart();
  const tiltRef = useRef({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const drinkRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const priceRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  const drink = drinks[currentIndex];

  const animateIn = useCallback(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      bgRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      0
    )
      .fromTo(
        imageRef.current,
        { scale: 0.6, rotation: -15, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.4)" },
        0.1
      )
      .fromTo(
        nameRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        0.3
      )
      .fromTo(
        taglineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        0.45
      )
      .fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        0.55
      )
      .fromTo(
        priceRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        0.65
      );

    return tl;
  }, []);

  useEffect(() => {
    animateIn();
  }, [currentIndex, animateIn]);

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (isAnimating) return;
      setIsAnimating(true);

      const exitX = direction === "next" ? -120 : 120;
      const enterX = direction === "next" ? 120 : -120;

      const nextIndex =
        direction === "next"
          ? currentIndex === drinks.length - 1
            ? 0
            : currentIndex + 1
          : currentIndex === 0
            ? drinks.length - 1
            : currentIndex - 1;

      gsap.to(drinkRef.current, {
        x: exitX,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex(nextIndex);
          gsap.set(drinkRef.current, { x: enterX, opacity: 0 });
          gsap.to(drinkRef.current, {
            x: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
            onComplete: () => setIsAnimating(false),
          });
        },
      });
    },
    [currentIndex, isAnimating]
  );

  useEffect(() => {
    gsap.fromTo(
      prevBtnRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power3.out" }
    );
    gsap.fromTo(
      nextBtnRef.current,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power3.out" }
    );
    gsap.fromTo(
      dotsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.7, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const handleAddToCart = () => {
    addItem(drink);

    gsap.fromTo(
      ".cart-badge",
      { scale: 1.4 },
      { scale: 1, duration: 0.4, ease: "back.out(2)" }
    );

    gsap.fromTo(
      imageRef.current,
      { scale: 1 },
      {
        scale: 1.15,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      }
    );
  };

  const handleBottlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;

    const rotateY = (relativeX - 0.5) * 18;
    const rotateX = (0.5 - relativeY) * 12;

    gsap.to(tiltRef.current, {
      x: rotateX,
      y: rotateY,
      duration: 0.8,
      ease: "elastic.out(1, 0.45)",
      overwrite: true,
      onUpdate: () => setTilt({ x: tiltRef.current.x, y: tiltRef.current.y }),
    });
  };

  const resetBottleTilt = () => {
    gsap.to(tiltRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.45)",
      overwrite: true,
      onUpdate: () => setTilt({ x: tiltRef.current.x, y: tiltRef.current.y }),
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* Animated background */}
      <div
        ref={bgRef}
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: `radial-gradient(ellipse at 70% 35%, ${drink.accent}bb 0%, ${drink.color}66 26%, ${drink.accent}33 52%, rgba(245, 240, 232, 0.94) 100%)`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <Link href="/" className="font-display text-2xl font-bold tracking-wide">
          Banana
        </Link>
        <Link
          href="/checkout"
          className="group flex items-center gap-2 rounded-full border border-charcoal/20 px-5 py-2.5 text-sm font-medium transition-all hover:border-charcoal hover:bg-charcoal hover:text-cream"
        >
          Cart
          {itemCount > 0 && (
            <span className="cart-badge inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-xs font-bold text-charcoal">
              {itemCount}
            </span>
          )}
        </Link>
      </header>

      {/* Main carousel area */}
      <div className="relative z-10 flex flex-1 items-center">
        {/* Previous button */}
        <button
          ref={prevBtnRef}
          onClick={() => navigate("prev")}
          disabled={isAnimating}
          aria-label="Previous drink"
          className="group absolute left-4 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-charcoal/20 bg-cream/80 backdrop-blur-sm transition-all hover:border-charcoal hover:bg-charcoal hover:text-cream disabled:opacity-50 md:left-8 md:h-16 md:w-16"
        >
          <Image
            src="/icons/arrow-left.svg"
            alt="Previous drink"
            width={24}
            height={24}
            className="h-6 w-6 transition-transform group-hover:-translate-x-0.5"
          />
        </button>

        {/* Drink content */}
        <div
          ref={drinkRef}
          className="mx-auto grid w-full max-w-6xl items-center gap-8 px-20 md:grid-cols-2 md:gap-12 md:px-24"
        >
          {/* Drink image */}
          <div
            ref={imageRef}
            className="relative mx-auto aspect-square w-full max-w-md"
            onPointerMove={handleBottlePointerMove}
            onPointerLeave={resetBottleTilt}
          >
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] opacity-100 md:h-80 md:w-80"
              style={{
                background: `radial-gradient(circle, ${drink.accent} 0%, ${drink.color} 45%, transparent 80%)`,
              }}
            />

            {/* Shadow under the bottle */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 bottom-4 z-0 h-3 w-36 -translate-x-1/2 rounded-full bg-black/20 opacity-60 blur-3xl md:h-5 md:w-48 lg:h-6 lg:w-64"
            />

            <div
              className="relative z-10 mx-auto flex h-full w-full items-center justify-center transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              <Image
                src={drink.image}
                alt={drink.name}
                width={400}
                height={400}
                className="mx-auto drop-shadow-2xl object-contain"
                priority
              />
            </div>
          </div>

          {/* Drink info */}
          <div className="text-center md:text-left">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-charcoal/50">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(drinks.length).padStart(2, "0")}
            </p>
            <h1
              ref={nameRef}
              className="font-display text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
              style={{ color: drink.color }}
            >
              {drink.name}
            </h1>
            <p
              ref={taglineRef}
              className="mt-3 font-display text-xl italic text-charcoal/70 md:text-2xl"
            >
              {drink.tagline}
            </p>
            <p
              ref={descRef}
              className="mt-6 max-w-md text-base leading-relaxed text-charcoal/60 md:text-lg"
            >
              {drink.description}
            </p>

            {/* Ingredients */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
              {drink.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="rounded-full border border-charcoal/10 px-3 py-1 text-xs text-charcoal/60"
                >
                  {ing}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:items-start">
              <p ref={priceRef} className="font-display text-3xl font-semibold">
                ${drink.price.toFixed(2)}
              </p>
              <button
                onClick={handleAddToCart}
                className="rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: drink.color }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Next button */}
        <button
          ref={nextBtnRef}
          onClick={() => navigate("next")}
          disabled={isAnimating}
          aria-label="Next drink"
          className="group absolute right-4 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-charcoal/20 bg-cream/80 backdrop-blur-sm transition-all hover:border-charcoal hover:bg-charcoal hover:text-cream disabled:opacity-50 md:right-8 md:h-16 md:w-16"
        >
          <Image
            src="/icons/arrow-right.svg"
            alt="Next drink"
            width={24}
            height={24}
            className="h-6 w-6 transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </div>

      {/* Dots indicator */}
      <div
        ref={dotsRef}
        className="relative z-10 flex justify-center gap-3 pb-10"
      >
        {drinks.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i !== currentIndex && !isAnimating) {
                setIsAnimating(true);
                gsap.to(drinkRef.current, {
                  opacity: 0,
                  y: 20,
                  duration: 0.3,
                  onComplete: () => {
                    setCurrentIndex(i);
                    gsap.fromTo(
                      drinkRef.current,
                      { opacity: 0, y: -20 },
                      {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        onComplete: () => setIsAnimating(false),
                      }
                    );
                  },
                });
              }
            }}
            aria-label={`Go to drink ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-8 bg-charcoal"
                : "w-2 bg-charcoal/25 hover:bg-charcoal/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
