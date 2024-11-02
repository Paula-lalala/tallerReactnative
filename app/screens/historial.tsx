import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { obtenerHistorial, limpiarHistorial } from '@/hooks/storage';
import { Compra } from './carrito';

const Historial = () => {
  const [historial, setHistorial] = useState<Compra[]>([]);

  useEffect(() => {
    fetchHistorial();
}, []);

const fetchHistorial = async () => {
    const historialData = await obtenerHistorial();
    setHistorial(historialData);
};

const limpiarHistorialCompras = async () => {
    await limpiarHistorial();
    Alert.alert("Historial Limpiado", "El historial de compras ha sido eliminado.");
    await fetchHistorial();
};

  return (
    <View style={{ padding: 20 }}>
        <FlatList
            data={historial}
            renderItem={({ item }) => (
                <View style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
                    <Text style={{ fontWeight: 'bold' }}>Fecha: {item.date}</Text>
                    {item.items.map((producto) => (
                        <Text key={producto.id}>
                            {producto.name} - Cantidad: {producto.cantidad}
                        </Text>
                    ))}
                </View>
            )}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={limpiarHistorialCompras}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Limpiar Historial</Text>
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

export default Historial;


