// types/producto.ts

export interface Producto {
  Código: string;
  Clave: string;
  Nombre: string;
  Descripción: string;
  Especificaciones: string;
  URL_Imagen: string;
  Ficha_Técnica: string;
  URL_Catálogo: string;
  
  // Nuevos campos del extractor mejorado
  Caracteristicas?: string[];  // Array de características
  Imagenes?: string[];  // Array de URLs de imágenes
  Especificaciones_Tecnicas?: Record<string, string>;  // Objeto con specs técnicas
}
