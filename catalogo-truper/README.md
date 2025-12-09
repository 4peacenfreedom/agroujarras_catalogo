# Catálogo de Productos Truper - Agro Ujarras

Aplicación web moderna para visualizar y buscar productos del catálogo Truper.

## 🚀 Tecnologías

- **Vite** - Build tool ultrarrápido
- **React** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos utilitarios
- **shadcn-ui** - Componentes de UI reutilizables
- **Lucide React** - Iconos modernos

## 📋 Características

- ✅ Buscador en tiempo real por código, clave, o nombre de producto
- ✅ Resultados clickeables con previsualización
- ✅ Modal de detalle con imagen del producto
- ✅ Información completa: nombre, descripción y especificaciones
- ✅ Enlaces a ficha técnica y catálogo
- ✅ Diseño responsive
- ✅ Tema claro/oscuro compatible

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── ui/               # Componentes base de shadcn-ui
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── dialog.tsx
│   ├── SearchBar.tsx     # Componente de búsqueda
│   ├── ProductList.tsx   # Lista de productos
│   └── ProductDetail.tsx # Modal de detalle
├── data/
│   └── productos.json    # Datos de productos Truper
├── lib/
│   └── utils.ts          # Utilidades (cn helper)
├── types/
│   └── producto.ts       # Tipos TypeScript
├── App.tsx               # Componente principal
├── main.tsx              # Punto de entrada
└── index.css             # Estilos globales

```

## 🎨 Componentes

### SearchBar
Barra de búsqueda con icono que permite filtrar productos en tiempo real.

### ProductList
Grid responsive que muestra los productos encontrados con imagen y datos básicos.

### ProductDetail
Modal que muestra información completa del producto seleccionado:
- Imagen a la izquierda
- Información detallada a la derecha
- Enlaces externos a fichas técnicas

## 📊 Datos

Los productos se cargan desde `src/data/productos.json` con la siguiente estructura:

```typescript
interface Producto {
  Código: string;
  Clave: string;
  Nombre: string;
  Descripción: string;
  Especificaciones: string;
  URL_Imagen: string;
  Ficha_Técnica: string;
  URL_Catálogo: string;
}
```

## 🔍 Búsqueda

La búsqueda es case-insensitive y busca en:
- Código del producto
- Clave del producto
- Nombre del producto
- Descripción del producto

## 📄 Licencia

Este proyecto es propiedad de Agro Ujarras.
