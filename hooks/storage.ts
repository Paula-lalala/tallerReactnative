import AsyncStorage from '@react-native-async-storage/async-storage';

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
    return carrito ? JSON.parse(carrito) : []; // Devuelve un arreglo vacío si no hay datos
};

export const vaciarCarrito = async () => {
    await AsyncStorage.removeItem(CARITO_STORAGE_KEY); // Solo elimina el carrito
};
  
export const obtenerHistorial = async () => {
    const historial = await AsyncStorage.getItem('historial');
    return historial ? JSON.parse(historial) : []; // Devuelve un arreglo vacío si no hay datos
};

export const guardarHistorial = async () => {
    const carrito = await obtenerCarrito(); // Obtiene el carrito actual
    const historial = await obtenerHistorial(); // Obtiene el historial actual

    const nuevaCompra = {
        id: Date.now().toString(),
        date: new Date().toLocaleString(),
        items: carrito,
    };

    console.log("Nueva compra que se agregará al historial:", nuevaCompra); // Verificación de la nueva compra
    await AsyncStorage.setItem('historial', JSON.stringify([...historial, nuevaCompra])); // Agrega la compra al historial
};

  
  // Eliminar un item específico del carrito
export const eliminarDelCarrito = async (id: string) => {
  const carrito = await obtenerCarrito();
  const nuevoCarrito = carrito.filter((item: any) => item.id !== id);
  await AsyncStorage.setItem(CARITO_STORAGE_KEY, JSON.stringify(nuevoCarrito)); 
};



