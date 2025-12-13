import type { CartItem } from "@/types/cart";
import type { QuoteFormData } from "@/types/cart";

// Número de WhatsApp del negocio (Costa Rica)
// IMPORTANTE: Actualizar este número con el del cliente
const BUSINESS_WHATSAPP = "50670606060"; // Formato: código de país + número

export function formatWhatsAppMessage(
  items: CartItem[],
  formData: QuoteFormData
): string {
  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  let message = `🛒 *SOLICITUD DE COTIZACIÓN*\n\n`;
  message += `👤 Cliente: ${formData.name}\n`;
  message += `📱 Teléfono: ${formData.phone}\n\n`;
  message += `📦 *PRODUCTOS SOLICITADOS:*\n`;
  message += `━━━━━━━━━━━━━━━━━━\n\n`;

  items.forEach((item, index) => {
    const emoji = getNumberEmoji(index + 1);
    message += `${emoji} ${item.product.Nombre}\n`;
    message += `   Código: ${item.product.Código}\n`;
    message += `   Clave: ${item.product.Clave}\n`;
    message += `   Cantidad: ${item.quantity} ${item.quantity === 1 ? "unidad" : "unidades"}\n\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━\n`;
  message += `Total de productos: ${totalItems}\n`;
  message += `Total de unidades: ${totalQuantity}\n\n`;
  message += `_Enviado desde Catálogo Truper - Agro Ujarras_`;

  return message;
}

export function sendWhatsAppQuote(
  items: CartItem[],
  formData: QuoteFormData
): void {
  const message = formatWhatsAppMessage(items, formData);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodedMessage}`;

  // Abrir WhatsApp en nueva ventana
  window.open(whatsappUrl, "_blank");
}

function getNumberEmoji(num: number): string {
  const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
  return num <= 10 ? emojis[num - 1] : `${num}.`;
}
