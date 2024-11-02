import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { obtenerCarrito, vaciarCarrito, eliminarDelCarrito, guardarHistorial } from '@/hooks/storage';

export interface CarritoItem {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    cantidad: number;
}

const Carrito: React.FC = () => {
    const [carrito, setCarrito] = useState<any[]>([]);  

    useEffect(() => {
        cargarCarrito();
    }, []);
    
    const cargarCarrito = async () => {
        const itemsCarrito = await obtenerCarrito();
        console.log("Carrito cargado:", itemsCarrito);
        setCarrito(itemsCarrito);
    };
    
    const confirmarCompra = async () => {
            console.log("Confirmando compra...");
            await guardarHistorial();
            await vaciarCarrito();
            Alert.alert("Compra Confirmada", "Tu compra ha sido registrada en el historial.", [
                {
                    text: "OK",
                    onPress: () => {
                        cargarCarrito();
                    },
                },
            ]);
    };
    
    const eliminarItem = async (id: string) => {
        console.log("Eliminando item con ID:", id);
        await eliminarDelCarrito(id);
        Alert.alert("Item Eliminado", "El producto ha sido eliminado del carrito.");
        cargarCarrito();
    };
    
    const modificarCantidad = (id: string, cantidad: number) => {
        const newCarrito = carrito.map(item => {
            if (item.id === id) {
                return { ...item, cantidad };
            }
            return item;
        });
        setCarrito(newCarrito);
    };

    const calcularTotal = () => {
        const totalSinEnvio = carrito.reduce((total, item) => total + item.price * item.cantidad, 0);
        let costoEnvio = 5000;

        if (totalSinEnvio > 90000) {
            costoEnvio = 0;
        } else if (totalSinEnvio > 70000) {
            costoEnvio = 3000;
        }

        const totalConEnvio = totalSinEnvio + costoEnvio;

        return { totalSinEnvio, costoEnvio, totalConEnvio };
    };

    const { totalSinEnvio, costoEnvio, totalConEnvio } = calcularTotal();

    const renderItem = ({ item }: { item: CarritoItem }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>Precio: ${item.price}</Text>
            <Text style={styles.itemCantidad}>Cantidad: {item.cantidad}</Text>

            <View style={styles.cantidadContainer}>
                <Button title="-" onPress={() => modificarCantidad(item.id, Math.max(1, item.cantidad - 1))} />
                <Text style={styles.cantidadText}>{item.cantidad}</Text>
                <Button title="+" onPress={() => modificarCantidad(item.id, item.cantidad + 1)} />
            </View>
            <Button title="Eliminar" onPress={() => eliminarItem(item.id)} />
        </View>
    );

    const cancelarPedido = async () => {
            await vaciarCarrito();
            await cargarCarrito();
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Carrito de Compras</Text>
            <FlatList
                data={carrito}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total sin Envío: ${totalSinEnvio}</Text>
                <Text style={styles.totalText}>Costo de Envío: ${costoEnvio}</Text>
                <Text style={styles.totalText}>Total a Pagar: ${totalConEnvio}</Text>
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={confirmarCompra}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Confirmar Compra</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={cancelarPedido}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Cancelar Pedido</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    itemContainer: {
      marginBottom: 16,
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 5,
    },
    itemName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    itemPrice: {
      fontSize: 16,
      color: 'green',
    },
    itemCantidad: {
      fontSize: 14,
      marginTop: 4,
    },
    cantidadContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    cantidadText: {
      marginHorizontal: 8,
      fontSize: 16,
    },
    totalContainer: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#e0e0e0',
      borderRadius: 5,
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonContainer: {
      marginTop: 20,
      backgroundColor: '#007BFF',
      borderRadius: 5,
    },
    button: {
      padding: 10,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });

export default Carrito;
