import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Producto } from "@/types/producto";
import { ExternalLink, CheckCircle2, ZoomIn, ZoomOut, X } from "lucide-react";
import { useState } from "react";

interface ProductDetailProps {
  product: Producto | null;
  open: boolean;
  onClose: () => void;
}

export function ProductDetail({ product, open, onClose }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset estado cuando se abre/cierra el modal
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedImage(0);
      setIsZoomed(false);
    }
    onClose();
  };

  if (!product) return null;

  // Usar array de imágenes si existe, sino usar URL_Imagen
  const imagenes = product.Imagenes && product.Imagenes.length > 0 
    ? product.Imagenes 
    : [product.URL_Imagen];

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl pr-8">{product.Nombre}</DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-4">
            {/* Galería de imágenes */}
            <div className="space-y-3 md:space-y-4">
              {/* Imagen principal */}
              <div className="relative group">
                <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg p-4 md:p-6 min-h-[250px] md:min-h-[300px]">
                  <img
                    src={imagenes[selectedImage]}
                    alt={product.Nombre}
                    className="max-w-full h-auto max-h-[250px] md:max-h-96 object-contain transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/400?text=Sin+Imagen";
                    }}
                    style={{
                      animation: 'fadeIn 0.3s ease-in-out'
                    }}
                  />
                </div>
                
                {/* Botón de zoom */}
                <button
                  onClick={() => setIsZoomed(true)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 active:scale-95"
                  aria-label="Ampliar imagen"
                >
                  <ZoomIn className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>

              {/* Miniaturas (si hay más de 1 imagen) */}
              {imagenes.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                  {imagenes.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        selectedImage === idx
                          ? "border-primary ring-2 ring-primary/20 scale-105"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 hover:scale-105"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.Nombre} - imagen ${idx + 1}`}
                        className="w-full h-full object-contain bg-gray-50 dark:bg-gray-900 p-1"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/80?text=Img";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Indicador de imagen actual */}
              {imagenes.length > 1 && (
                <div className="text-center text-xs md:text-sm text-muted-foreground">
                  Imagen {selectedImage + 1} de {imagenes.length}
                </div>
              )}
            </div>

            {/* Información del producto */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-2">Información General</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex flex-wrap gap-2">
                    <span className="font-medium">Código:</span>
                    <span className="text-muted-foreground">{product.Código}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="font-medium">Clave:</span>
                    <span className="text-muted-foreground">{product.Clave}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-base md:text-lg mb-2">Descripción</h3>
                <p className="text-sm text-muted-foreground">
                  {product.Descripción}
                </p>
              </div>

              {/* Lista de características (si existen) */}
              {product.Caracteristicas && product.Caracteristicas.length > 0 && (
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-3">Características</h3>
                  <ul className="space-y-2">
                    {product.Caracteristicas.map((caracteristica, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-2 text-sm"
                        style={{
                          animation: `slideIn 0.3s ease-out ${idx * 0.05}s both`
                        }}
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Especificaciones (solo si NO hay características) */}
              {(!product.Caracteristicas || product.Caracteristicas.length === 0) && product.Especificaciones && (
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-2">Especificaciones</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {product.Especificaciones}
                  </p>
                </div>
              )}

              <div className="pt-4 space-y-2">
                {product.Ficha_Técnica && (
                  <a
                    href={product.Ficha_Técnica}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver Ficha Técnica
                  </a>
                )}
                {product.URL_Catálogo && (
                  <a
                    href={product.URL_Catálogo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver Catálogo Completo
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de zoom (fullscreen) */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
          style={{
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {/* Botón cerrar */}
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
            aria-label="Cerrar zoom"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Controles de navegación (si hay múltiples imágenes) */}
          {imagenes.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) => (prev > 0 ? prev - 1 : imagenes.length - 1));
                }}
                className="absolute left-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
                aria-label="Imagen anterior"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) => (prev < imagenes.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
                aria-label="Imagen siguiente"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Imagen en zoom */}
          <img
            src={imagenes[selectedImage]}
            alt={product.Nombre}
            className="max-w-full max-h-full object-contain cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/800?text=Sin+Imagen";
            }}
            style={{
              animation: 'zoomIn 0.3s ease-out'
            }}
          />

          {/* Indicador de imagen */}
          {imagenes.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              {selectedImage + 1} / {imagenes.length}
            </div>
          )}
        </div>
      )}

      {/* Estilos para animaciones */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Scrollbar personalizada para miniaturas */
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          border-radius: 3px;
        }

        .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
          background: rgb(209 213 219);
        }

        .dark .scrollbar-thumb-gray-700::-webkit-scrollbar-thumb {
          background: rgb(55 65 81);
        }
      `}</style>
    </>
  );
}
