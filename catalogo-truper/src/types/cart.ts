import type { Producto } from "./producto";

export interface CartItem {
  product: Producto;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Producto) => void;
  removeFromCart: (codigo: string) => void;
  updateQuantity: (codigo: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export interface QuoteFormData {
  name: string;
  phone: string;
}
