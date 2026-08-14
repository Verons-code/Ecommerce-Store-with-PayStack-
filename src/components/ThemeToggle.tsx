"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme =
      storedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    document.documentElement.style.colorScheme = initialTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 bg-cream/80 text-charcoal shadow-sm backdrop-blur transition-all hover:scale-105 hover:border-gold dark:border-cream/20 dark:bg-charcoal/80 dark:text-cream"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
