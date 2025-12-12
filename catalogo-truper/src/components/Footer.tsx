import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#4a3728] text-white mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Slogan */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-xl font-semibold italic">
              "De la mano con el agricultor"
            </p>
          </div>

          {/* Columna 2: Contáctanos */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-lg mb-4">Contáctanos</h3>
            <div className="space-y-3">
              <a
                href="https://wa.me/50683706464"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-300 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>8370-6464</span>
              </a>
              <a
                href="mailto:info@agroujarras.com"
                className="flex items-center gap-2 hover:text-green-300 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>info@agroujarras.com</span>
              </a>
            </div>
          </div>

          {/* Columna 3: Síguenos en */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-lg mb-4">Síguenos en</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/agroujarras"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/agroujarras"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-300 transition-colors transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/20 text-center text-sm">
          <p>© {new Date().getFullYear()} Agro Ujarras - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}
