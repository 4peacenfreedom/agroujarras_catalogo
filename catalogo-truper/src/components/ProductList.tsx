import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import type { Producto } from "@/types/producto";

interface ProductListProps {
  products: Producto[];
  onSelectProduct: (product: Producto) => void;
}

export function ProductList({ products, onSelectProduct }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          No se encontraron productos. Intenta con otra búsqueda.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {products.map((product, index) => (
          <Card
            key={product.Código}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
            onClick={() => onSelectProduct(product)}
            style={{
              animation: `fadeInUp 0.3s ease-out ${index * 0.03}s both`
            }}
          >
            <CardContent className="p-3 md:p-4">
              <div className="flex gap-3 md:gap-4">
                {/* Imagen del producto */}
                <div className="flex-shrink-0 relative group">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={product.URL_Imagen}
                      alt={product.Nombre}
                      className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/80?text=Sin+Imagen";
                      }}
                    />
                  </div>
                  
                  {/* Indicador de múltiples imágenes */}
                  {product.Imagenes && product.Imagenes.length > 1 && (
                    <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-medium shadow-sm">
                      +{product.Imagenes.length - 1}
                    </div>
                  )}
                </div>

                {/* Información del producto */}
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-xs md:text-sm font-semibold mb-1 line-clamp-2 leading-tight">
                    {product.Nombre}
                  </CardTitle>
                  
                  <CardDescription className="text-[11px] md:text-xs mb-1.5 md:mb-2 flex flex-wrap gap-1">
                    <span className="inline-flex items-center">
                      <span className="font-medium">Cód:</span>
                      <span className="ml-1">{product.Código}</span>
                    </span>
                    <span className="text-muted-foreground/50">|</span>
                    <span className="inline-flex items-center">
                      <span className="font-medium">Clave:</span>
                      <span className="ml-1">{product.Clave}</span>
                    </span>
                  </CardDescription>
                  
                  <CardDescription className="text-[11px] md:text-xs line-clamp-2 mb-2">
                    {product.Descripción}
                  </CardDescription>
                  
                  {/* Badges de información */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {product.Caracteristicas && product.Caracteristicas.length > 0 && (
                      <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 text-[10px] md:text-xs font-medium text-blue-700 dark:text-blue-300">
                        {product.Caracteristicas.length} características
                      </span>
                    )}
                    
                    {product.Imagenes && product.Imagenes.length > 1 && (
                      <span className="inline-flex items-center rounded-full bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 text-[10px] md:text-xs font-medium text-purple-700 dark:text-purple-300">
                        {product.Imagenes.length} fotos
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estilos para animaciones */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mejoras para touch en móvil */
        @media (hover: none) {
          .hover\\:shadow-lg {
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          }
        }

        /* Optimización para pantallas pequeñas */
        @media (max-width: 640px) {
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}</style>
    </>
  );
}
