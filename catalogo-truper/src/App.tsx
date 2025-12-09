import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ProductList } from "@/components/ProductList";
import { ProductDetail } from "@/components/ProductDetail";
import type { Producto } from "@/types/producto";
import productosData from "@/data/productos.json";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const productos = productosData as Producto[];

  // Filtrar productos basados en la búsqueda
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return productos;
    }

    const query = searchQuery.toLowerCase().trim();

    return productos.filter((product) => {
      const searchableText = `
        ${product.Código}
        ${product.Clave}
        ${product.Nombre}
        ${product.Descripción}
      `.toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchQuery, productos]);

  const handleSelectProduct = (product: Producto) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => setSelectedProduct(null), 200);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground">
                Catálogo de Productos Truper
              </h1>
              <p className="text-muted-foreground mt-2">
                Encuentra las mejores herramientas y productos para tu negocio
              </p>
            </div>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {searchQuery ? (
              <>
                Mostrando <span className="font-semibold">{filteredProducts.length}</span> resultados
                para "<span className="font-semibold">{searchQuery}</span>"
              </>
            ) : (
              <>
                Total de productos: <span className="font-semibold">{productos.length}</span>
              </>
            )}
          </p>
        </div>

        <ProductList
          products={filteredProducts}
          onSelectProduct={handleSelectProduct}
        />
      </main>

      {/* Product Detail Dialog */}
      <ProductDetail
        product={selectedProduct}
        open={isDialogOpen}
        onClose={handleCloseDialog}
      />

      {/* Footer */}
      <footer className="border-t mt-12 py-6 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Catálogo Agro Ujarras - Productos Truper {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
