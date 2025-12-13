import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/components/CartItem";
import { Footer } from "@/components/Footer";
import { sendWhatsAppQuote } from "@/utils/whatsapp";
import type { QuoteFormData } from "@/types/cart";
import { ArrowLeft, ShoppingCart, Send, Trash2 } from "lucide-react";
import logo from "@/assets/logo_agroujarras_perfil.jpg";

export function Cart() {
  const navigate = useNavigate();
  const { items, getTotalItems, clearCart } = useCart();
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<QuoteFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name as keyof QuoteFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<QuoteFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!/^\d{4}-?\d{4}$/.test(formData.phone.trim())) {
      newErrors.phone = "Formato válido: 8888-8888";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    if (!validateForm()) {
      return;
    }

    // Enviar cotización por WhatsApp
    sendWhatsAppQuote(items, formData);

    // Preguntar si desea limpiar el carrito
    const shouldClear = window.confirm(
      "¿Desea limpiar el carrito después de enviar la cotización?"
    );

    if (shouldClear) {
      clearCart();
      setFormData({ name: "", phone: "" });
    }
  };

  const handleClearCart = () => {
    if (window.confirm("¿Está seguro que desea vaciar el carrito?")) {
      clearCart();
    }
  };

  const totalItems = getTotalItems();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-[#9abf63] shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            {/* Logo y Título */}
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Agro Ujarras Logo"
                className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover shadow-md"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Carrito de Cotización
                </h1>
                <p className="text-white/90 mt-1 text-sm md:text-base">
                  Revise sus productos y envíe su solicitud
                </p>
              </div>
            </div>

            {/* Botón volver */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors w-fit"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Volver al catálogo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        {items.length === 0 ? (
          /* Carrito vacío */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingCart className="h-24 w-24 text-gray-300 dark:text-gray-700 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Su carrito está vacío
            </h2>
            <p className="text-muted-foreground mb-6">
              Agregue productos desde el catálogo para solicitar una cotización
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#9abf63] hover:bg-[#8ab053] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Ver catálogo
            </button>
          </div>
        ) : (
          /* Carrito con productos */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Productos seleccionados ({totalItems}{" "}
                  {totalItems === 1 ? "item" : "items"})
                </h2>
                <button
                  onClick={handleClearCart}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  Vaciar carrito
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item) => (
                  <CartItem key={item.product.Código} item={item} />
                ))}
              </div>
            </div>

            {/* Formulario de cotización */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold mb-4">
                    Datos para cotización
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Campo Nombre */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Nombre completo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ej: Juan Pérez"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.name
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 dark:border-gray-600 focus:ring-[#9abf63]"
                        } focus:outline-none focus:ring-2 bg-white dark:bg-gray-900 transition-colors`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Campo Teléfono */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-2"
                      >
                        Teléfono <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="8888-8888"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.phone
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 dark:border-gray-600 focus:ring-[#9abf63]"
                        } focus:outline-none focus:ring-2 bg-white dark:bg-gray-900 transition-colors`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Resumen */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Total de productos:
                          </span>
                          <span className="font-semibold">{items.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Total de unidades:
                          </span>
                          <span className="font-semibold">{totalItems}</span>
                        </div>
                      </div>
                    </div>

                    {/* Botón enviar */}
                    <button
                      type="submit"
                      className="w-full bg-[#9abf63] hover:bg-[#8ab053] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
                    >
                      <Send className="h-5 w-5" />
                      Enviar cotización por WhatsApp
                    </button>

                    <p className="text-xs text-muted-foreground text-center">
                      Se abrirá WhatsApp con su solicitud prellenada
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
