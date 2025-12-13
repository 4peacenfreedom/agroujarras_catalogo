import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ProductList } from "@/components/ProductList";
import { ProductDetail } from "@/components/ProductDetail";
import { Footer } from "@/components/Footer";
import type { Producto } from "@/types/producto";
import productosData from "@/data/productos.json";
import logo from "@/assets/logo_agroujarras_perfil.jpg";

export function Home() {
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
      <header className="bg-[#9abf63] shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-6">
            {/* Logo y Título */}
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Agro Ujarras Logo"
                className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover shadow-md"
              />
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Catálogo de Productos Truper
                </h1>
                <p className="text-white/90 mt-1 text-sm md:text-base">
                  Encuentra las mejores herramientas y productos para tu negocio
                </p>
              </div>
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
      <Footer />
    </div>
  );
}
