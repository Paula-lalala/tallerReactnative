import AsyncStorage from '@react-native-async-storage/async-storage';

const CARITO_STORAGE_KEY = '@carrito_storage';

export const agregarAlCarrito = async (item: any, cantidad: number) => {
  try {
    const existingCart = await AsyncStorage.getItem(CARITO_STORAGE_KEY);
    const cart = existingCart ? JSON.parse(existingCart) : [];
    
    const itemIndex = cart.findIndex((cartItem: any) => cartItem.id === item.id);
    
    if (itemIndex > -1) {
      cart[itemIndex].cantidad += cantidad;
    } else {
      cart.push({ ...item, cantidad });
    }

    await AsyncStorage.setItem(CARITO_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error al agregar al carrito", error);
  }
};

export const obtenerCarrito = async () => {
  try {
    const existingCart = await AsyncStorage.getItem(CARITO_STORAGE_KEY);
    return existingCart ? JSON.parse(existingCart) : [];
  } catch (error) {
    console.error("Error al obtener el carrito", error);
    return [];
  }
};



