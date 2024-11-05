import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import PlatoCarta from '../components/PlatoCarta';


interface Plato {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

const platos: Plato[] = [
  { id: 1, name: 'Limonada', category: 'Bebidas Frías', image: '../assets/images/Limonada.png', price: 5000, description: 'Limonada fresca' },
  { id: 2, name: 'CocaCola', category: 'Bebidas Frías', image: '../assets/images/CocaCola.png', price: 5000, description: 'Coca cola fría' },
  { id: 3, name: 'Café', category: 'Bebidas Calientes', image: '../assets/images/Cafe.png', price: 4000, description: 'Café colombiano' },
  { id: 4, name: 'Chocolate', category: 'Bebidas Calientes', image: '../assets/images/Chocolate.png', price: 6000, description: 'Chocolate colombiano' },
  { id: 5, name: 'Sancocho', category: 'Sopas', image: '../assets/images/sancocho.png', price: 15000, description: 'Sancocho' },
  { id: 6, name: 'Ajiaco', category: 'Sopas', image: '../assets/images/ajiaco.png', price: 15000, description: 'Ajiaco' },
  { id: 7, name: 'Ratatouille', category: 'Platos del día', image: '../assets/images/ratatouille.png', price: 30000, description: 'Ratatouille' },
  { id: 8, name: 'Lasagna del día', category: 'Platos del día', image: '../assets/images/lasagna.png', price: 30000, description: 'Lasagna del día' },
  { id: 9, name: 'Pechuga a la plancha', category: 'Platos de la carta', image: '../assets/images/pechuga.png', price: 25000, description: 'Pechuga a la plancha' },
  { id: 10, name: 'Picada', category: 'Platos de la carta', image: '../assets/images/Picada.png', price: 25000, description: 'Picada' },
  { id: 11, name: 'Hamburguesa infantil', category: 'Menú infantil', image: '../assets/images/hamburguesa.png', price: 20000, description: 'Hamburguesa infantil' },
  { id: 12, name: 'Pizza infantil', category: 'Menú infantil', image: '../assets/images/pizza.png', price: 20000, description: 'Pizza infantil' },
  // Agrega más platos según sea necesario
];

const Menu: React.FC = () => {
  const [CategoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas');
  const router = useRouter();

  const detalle = (item: Plato) => {
    router.push({
      pathname: './screens/detalle', // O la ruta correspondiente
      params: { 
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        description: item.description
      },
    });
    }
  const filteredPlatos = CategoriaSeleccionada === 'Todas'
    ? platos
    : platos.filter(plato => plato.category === CategoriaSeleccionada);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú</Text>
      <View style={styles.categoryContainer}>
        {['Todas', 'Bebidas Frías', 'Bebidas Calientes', 'Sopas', 'Platos del día', 'Platos de la carta', 'Menú infantil'].map(category => (
          <TouchableOpacity key={category} onPress={() => setCategoriaSeleccionada(category)} style={styles.BotonCatergoria}>
            <Text style={[styles.CategoriaTexto, CategoriaSeleccionada === category && styles.CategoriaSeleccionada]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredPlatos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity key={item.id} >
            <PlatoCarta plato={item}/>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f5f5f5',
  },
  title: { 
    fontSize: 30, 
    fontWeight: 'bold', 
    marginBottom: 1, 
    color: '#333',
    alignSelf: 'center'
  },
  categoryContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginBottom: 5, 
    justifyContent: 'center' 
  },
  BotonCatergoria: { 
    paddingVertical: 10, 
    paddingHorizontal: 8, 
    margin: 1, 
    borderRadius: 20, 
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#d3d3d3',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  CategoriaTexto: { 
    fontSize: 16, 
    color: '#333'
  },
  CategoriaSeleccionada: { 
    color: '#007aff', 
    fontWeight: 'bold',
  }
});



export default Menu;
