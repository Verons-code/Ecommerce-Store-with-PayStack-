import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/Footer";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Banana — Premium Craft Drinks",
  description: "Discover artisan beverages crafted with the finest ingredients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-body antialiased`}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
