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
    <View style={{ padding: 20 }}>
      <FlatList
        data={historial}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
            <Text style={{ fontWeight: 'bold' }}>Fecha: {new Date(item.date).toLocaleString()}</Text>
            {item.items.map((producto) => (
              <Text key={producto.id}>
                {producto.name} - Cantidad: {producto.cantidad}
              </Text>
            ))}
            <Text style={{ fontWeight: 'bold' }}>
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



