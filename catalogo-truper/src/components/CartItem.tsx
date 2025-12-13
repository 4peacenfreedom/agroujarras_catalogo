import { Trash2, Plus, Minus } from "lucide-react";
import type { CartItem as CartItemType } from "@/types/cart";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleIncrement = () => {
    updateQuantity(product.Código, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.Código, quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      updateQuantity(product.Código, value);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.Código);
  };

  // Usar la primera imagen si existe, sino usar URL_Imagen
  const imageUrl =
    product.Imagenes && product.Imagenes.length > 0
      ? product.Imagenes[0]
      : product.URL_Imagen;

  return (
    <div className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      {/* Imagen del producto */}
      <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={imageUrl}
          alt={product.Nombre}
          className="w-full h-full object-contain p-2"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/100?text=Sin+Imagen";
          }}
        />
      </div>

      {/* Información del producto */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm md:text-base truncate mb-1">
          {product.Nombre}
        </h3>
        <div className="text-xs md:text-sm text-muted-foreground space-y-0.5">
          <p>
            <span className="font-medium">Código:</span> {product.Código}
          </p>
          <p>
            <span className="font-medium">Clave:</span> {product.Clave}
          </p>
        </div>
      </div>

      {/* Controles de cantidad */}
      <div className="flex flex-col md:flex-row items-end md:items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 rounded-lg px-2 py-1">
          <button
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Disminuir cantidad"
          >
            <Minus className="h-4 w-4" />
          </button>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-12 text-center bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary rounded text-sm font-semibold"
            aria-label="Cantidad"
          />

          <button
            onClick={handleIncrement}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            aria-label="Aumentar cantidad"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Botón eliminar */}
        <button
          onClick={handleRemove}
          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          aria-label="Eliminar producto"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
