import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { FloatingCartButton } from "@/components/FloatingCartButton";
import { Home } from "@/pages/Home";
import { Cart } from "@/pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrito" element={<Cart />} />
        </Routes>
        <FloatingCartButton />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
