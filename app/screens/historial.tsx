import React, { useEffect, useState } from 'react'; 
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { obtenerHistorial, limpiarHistorial } from '@/hooks/storage';
import { Compra } from './carrito';

const Historial = () => {
  const [historial, setHistorial] = useState<Compra[]>([]);

  useEffect(() => {
    fetchHistorial();
  }, []);

  const fetchHistorial = async () => {
    const historialData: Compra[] = await obtenerHistorial();
    const historialOrdenado = historialData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setHistorial(historialOrdenado);
  };

  const limpiarHistorialCompras = async () => {
    await limpiarHistorial();
    await fetchHistorial();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={historial}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.dateText}>Fecha: {new Date(item.date).toLocaleString()}</Text>
            {item.items.map((producto) => (
              <Text key={producto.id} style={styles.productText}>
                {producto.name} - Cantidad: {producto.cantidad}
              </Text>
            ))}
            <Text style={styles.totalText}>
              Total con domicilio: ${item.totalConEnvio ? item.totalConEnvio : '0.00'}            
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
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
    padding: 20,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  itemContainer: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  productText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    padding: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Historial;


