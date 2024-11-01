// contexts/Carrito.tsx
import React, { createContext, useContext, useState } from 'react';

// Define el tipo para un producto en el carrito
interface ProductoCarrito {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  cantidad: number; // Añadido para manejar la cantidad
}

// Define el tipo del contexto
interface CarritoType {
  carrito: ProductoCarrito[];
  agregarAlCarrito: (producto: Omit<ProductoCarrito, 'cantidad'>, cantidad: number) => void;
}

// Crea el contexto
const Carrito = createContext<CarritoType | undefined>(undefined);

// Proveedor del contexto
export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
console.log("CarritoProvider rendered"); 
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto: Omit<ProductoCarrito, 'cantidad'>, cantidad: number) => {
    const productoExistente = carrito.find(item => item.id === producto.id);
    if (productoExistente) {
      // Si el producto ya existe, actualiza la cantidad
      setCarrito(carrito.map(item => 
        item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
      ));
    } else {
      // Si es un nuevo producto, lo agrega al carrito
      setCarrito([...carrito, { ...producto, cantidad }]);
    }
  };

  return (
    <Carrito.Provider value={{ carrito, agregarAlCarrito }}>
      {children}
    </Carrito.Provider>
  );
};

// Hook para usar el contexto
export const useCarrito = () => {
  const context = useContext( Carrito);
  if (!context) {
    throw new Error("useCarrito debe ser usado dentro de un CarritoProvider");
  }
  return context;
};
