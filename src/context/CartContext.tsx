"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Drink } from "@/data/drinks";

export interface CartItem {
  drink: Drink;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (drink: Drink) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((drink: Drink) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.drink.id === drink.id);
      if (existing) {
        return prev.map((item) =>
          item.drink.id === drink.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { drink, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.drink.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.drink.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.drink.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce(
    (sum, item) => sum + item.drink.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
