import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { CartItem, CartContextType } from "@/types/cart";
import type { Producto } from "@/types/producto";

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "truper_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Cargar carrito del localStorage al iniciar
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [items]);

  const addToCart = (product: Producto) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.Código === product.Código
      );

      if (existingItem) {
        // Si ya existe, incrementar cantidad
        return currentItems.map((item) =>
          item.product.Código === product.Código
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, agregar nuevo item
        return [...currentItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (codigo: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.Código !== codigo)
    );
  };

  const updateQuantity = (codigo: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(codigo);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.Código === codigo ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
