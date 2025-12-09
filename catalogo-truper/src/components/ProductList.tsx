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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card
          key={product.Código}
          className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
          onClick={() => onSelectProduct(product)}
        >
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <img
                  src={product.URL_Imagen}
                  alt={product.Nombre}
                  className="w-20 h-20 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/80?text=Sin+Imagen";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-sm font-semibold mb-1 line-clamp-2">
                  {product.Nombre}
                </CardTitle>
                <CardDescription className="text-xs mb-2">
                  <span className="font-medium">Código:</span> {product.Código} | <span className="font-medium">Clave:</span> {product.Clave}
                </CardDescription>
                <CardDescription className="text-xs line-clamp-2">
                  {product.Descripción}
                </CardDescription>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
