import type { CartItem } from "@/types/cart";
import type { QuoteFormData } from "@/types/cart";

// Email del negocio para recibir cotizaciones
const BUSINESS_EMAIL = "david@agroujarras.com";

export function formatEmailQuote(
  items: CartItem[],
  formData: QuoteFormData
): { subject: string; body: string } {
  const subject = `Solicitud de Cotización - ${formData.name}`;

  // Construir el cuerpo del email con formato de tabla
  let body = `Solicitud de Cotización\n`;
  body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  body += `DATOS DEL CLIENTE:\n`;
  body += `Nombre completo: ${formData.name}\n`;
  body += `Número de teléfono: ${formData.phone}\n\n`;

  body += `PRODUCTOS SOLICITADOS:\n`;
  body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  // Lista de productos
  items.forEach((item) => {
    body += `${item.product.Nombre}\n`;
    body += `Código: ${item.product.Código}\n`;
    body += `Cantidad: ${item.quantity} ${item.quantity === 1 ? "unidad" : "unidades"}\n\n\n`;
  });

  // Resumen
  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  body += `RESUMEN:\n`;
  body += `Total de productos diferentes: ${totalItems}\n`;
  body += `Total de unidades solicitadas: ${totalQuantity}\n\n`;

  body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  body += `Enviado desde: Catálogo Truper - Agro Ujarras\n`;

  return { subject, body };
}

export function sendEmailQuote(
  items: CartItem[],
  formData: QuoteFormData
): void {
  const { subject, body } = formatEmailQuote(items, formData);

  // Codificar el subject y body para URL
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  // Crear el mailto link
  const mailtoLink = `mailto:${BUSINESS_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;

  // Abrir el cliente de email predeterminado
  window.location.href = mailtoLink;
}
