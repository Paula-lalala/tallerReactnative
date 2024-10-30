import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const DetallePlato: React.FC = () => {
  const { id, name, image, price, description } = useLocalSearchParams();
  const router = useRouter();

  const [cantidad, setCantidad] = useState(1);  
    
  const VolverMenu = () => {
    router.back();
  };

  const agregarAlCarrito = () => {
    console.log(`Agregado al carrito: ${name}, Cantidad: ${cantidad}`);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image as string }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>Precio: ${price}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.cantidadContainer}>
        <Button title="-" onPress={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)} />
        <Text style={styles.cantidadText}>{cantidad}</Text>
        <Button title="+" onPress={() => setCantidad(cantidad + 1)} />
      </View>
        <View style={styles.buttonContainer}>
        <Button title="Agregar al Carrito" onPress={agregarAlCarrito} />
        </View>
        <View style={styles.buttonContainer}>
        <Button title="Volver al Menú" onPress={VolverMenu} />
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, marginBottom: 16, borderRadius: 8 },
  name: { fontSize: 24, fontWeight: 'bold' },
  price: { fontSize: 18, color: 'green', marginVertical: 8 },
  description: { fontSize: 16, color: '#555' },
  // Estilos opcionales para el botón personalizado
  cantidadContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginVertical: 16 
  },
  cantidadText: { 
    marginHorizontal: 16, 
    fontSize: 18 
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default DetallePlato;
