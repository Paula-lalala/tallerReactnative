import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Modal, } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { agregarAlCarrito } from '@/hooks/storage';

const Detalle: React.FC = () => {
  const { id, name, image, price, description } = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);  
  const [cantidad, setCantidad] = useState(1);  
    
  const volverMenu = () => {
    router.back();
  };

  const agregarCarrito = async () => {
    await agregarAlCarrito(
      { id: id as string, name: name as string, image: image as string, price: Number(price), description: description as string },
      cantidad
    );
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
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

      <TouchableOpacity style={styles.buttonContainer} onPress={agregarCarrito}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Agregar al Carrito</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={volverMenu}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Volver al Menú</Text>
        </View>
      </TouchableOpacity>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cerrarModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¡Agregado al carrito!</Text>
            <Button title="Cerrar" onPress={cerrarModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, marginBottom: 16, borderRadius: 8 },
  name: { fontSize: 24, fontWeight: 'bold' },
  price: { fontSize: 18, color: 'green', marginVertical: 8 },
  description: { fontSize: 16, color: '#555' },
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});


export default Detalle;


