import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Modal } from 'react-native';
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
            <TouchableOpacity style={styles.modalButton} onPress={cerrarModal}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={volverMenu}>
              <Text style={styles.modalButtonText}>Volver al Menú</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f8f9fa', // Color de fondo más suave
    borderRadius: 10, // Bordes redondeados
    shadowColor: '#000', // Sombra para profundidad
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 3, // Sombra en Android
  },
  image: { 
    width: '100%', 
    height: 200, 
    marginBottom: 16, 
    borderRadius: 10, // Bordes redondeados para la imagen
    borderColor: '#dee2e6', // Bordes sutiles
    borderWidth: 1,
  },
  name: { 
    fontSize: 26, // Tamaño de fuente ligeramente más grande
    fontWeight: 'bold',
    color: '#343a40', // Color de texto más oscuro
    marginBottom: 8,
  },
  price: { 
    fontSize: 20, 
    color: '#28a745', // Color verde más brillante
    marginVertical: 8,
    fontWeight: '600', // Peso de fuente semi-negrita
  },
  description: { 
    fontSize: 16, 
    color: '#6c757d', // Color gris
    lineHeight: 24, // Espaciado entre líneas para mejor legibilidad
    marginBottom: 16,
  },
  cantidadContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginVertical: 16, 
    borderWidth: 1,
    borderColor: '#ced4da', // Bordes de la cantidad
    borderRadius: 5,
    padding: 8,
  },
  cantidadText: { 
    marginHorizontal: 16, 
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#343a40',
  },
  button: {
    marginTop: 20,
    paddingVertical: 12, // Mayor altura para los botones
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2, // Sombra ligera
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600', // Peso de fuente semi-negrita
  },
  buttonContainer: {
    marginVertical: 10,
    borderRadius: 8, // Asegurarse que los contenedores de botón también tengan bordes redondeados
    overflow: 'hidden', // Para asegurar que los bordes redondeados se mantengan
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
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // Sombra para el modal
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#343a40', // Color del texto en el modal
    textAlign: 'center', // Centrar el texto
  },
  modalButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});



export default Detalle;


