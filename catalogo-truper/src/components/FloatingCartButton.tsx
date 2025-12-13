import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";

export function FloatingCartButton() {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const totalItems = getTotalItems();

  // No mostrar el botón si estamos en la página del carrito
  if (location.pathname === "/carrito") {
    return null;
  }

  const handleClick = () => {
    navigate("/carrito");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-[#9abf63] hover:bg-[#8ab053] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 z-50 group"
      aria-label="Ver carrito"
    >
      <div className="relative">
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </div>

      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {totalItems === 0
          ? "Carrito vacío"
          : `${totalItems} ${totalItems === 1 ? "producto" : "productos"}`}
      </span>
    </button>
  );
}
