import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Producto } from "@/types/producto";
import { ExternalLink } from "lucide-react";

interface ProductDetailProps {
  product: Producto | null;
  open: boolean;
  onClose: () => void;
}

export function ProductDetail({ product, open, onClose }: ProductDetailProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.Nombre}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Imagen del producto */}
          <div className="flex items-start justify-center bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <img
              src={product.URL_Imagen}
              alt={product.Nombre}
              className="max-w-full h-auto max-h-96 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/400?text=Sin+Imagen";
              }}
            />
          </div>

          {/* Información del producto */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Información General</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Código:</span>{" "}
                  <span className="text-muted-foreground">{product.Código}</span>
                </div>
                <div>
                  <span className="font-medium">Clave:</span>{" "}
                  <span className="text-muted-foreground">{product.Clave}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Descripción</h3>
              <p className="text-sm text-muted-foreground">
                {product.Descripción}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Especificaciones</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {product.Especificaciones}
              </p>
            </div>

            <div className="pt-4 space-y-2">
              {product.Ficha_Técnica && (
                <a
                  href={product.Ficha_Técnica}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
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
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
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
  );
}
