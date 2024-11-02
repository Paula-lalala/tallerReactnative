import AsyncStorage from '@react-native-async-storage/async-storage';
import { Compra } from '@/app/screens/carrito';

const CARITO_STORAGE_KEY = 'carrito';

export const agregarAlCarrito = async (item: any, cantidad: number) => {
    const existingCart = await AsyncStorage.getItem(CARITO_STORAGE_KEY);
    const cart = existingCart ? JSON.parse(existingCart) : [];
    const itemIndex = cart.findIndex((cartItem: any) => cartItem.id === item.id);
    
    if (itemIndex > -1) {
      cart[itemIndex].cantidad += cantidad;
    } else {
      cart.push({ ...item, cantidad });
    }
    await AsyncStorage.setItem(CARITO_STORAGE_KEY, JSON.stringify(cart));
};

export const obtenerCarrito = async () => {
    const carrito = await AsyncStorage.getItem(CARITO_STORAGE_KEY);
    return carrito ? JSON.parse(carrito) : [];
};

export const vaciarCarrito = async () => {
    await AsyncStorage.removeItem(CARITO_STORAGE_KEY);
};
  
export const obtenerHistorial = async () => {
    const historial = await AsyncStorage.getItem('historial');
    return historial ? JSON.parse(historial) : [];
};

export const guardarHistorial = async (compra: Compra) => {
    try {
        const historialJSON = await AsyncStorage.getItem('historial');
        const historial = historialJSON ? JSON.parse(historialJSON) : [];
        historial.push(compra);
        await AsyncStorage.setItem('historial', JSON.stringify(historial));
    } catch (error) {
        console.error("Error al guardar en el historial:", error);
    }
};

export const limpiarHistorial = async () => {
    try {
        await AsyncStorage.removeItem('historial');
        console.log("Historial de compras eliminado");
    } catch (error) {
        console.error("Error al limpiar el historial:", error);
    }
};

  
  // Eliminar un item específico del carrito
export const eliminarDelCarrito = async (id: string) => {
  const carrito = await obtenerCarrito();
  const nuevoCarrito = carrito.filter((item: any) => item.id !== id);
  await AsyncStorage.setItem(CARITO_STORAGE_KEY, JSON.stringify(nuevoCarrito)); 
};




