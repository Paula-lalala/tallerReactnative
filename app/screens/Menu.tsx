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
  { id: 2, name: 'Café', category: 'Bebidas Calientes', image: '../assets/images/Cafe.png', price: 4000, description: 'Café colombiano' },
  // Agrega más platos según sea necesario
];

const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
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
  const filteredPlatos = selectedCategory === 'Todas'
    ? platos
    : platos.filter(plato => plato.category === selectedCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú</Text>
      <View style={styles.categoryContainer}>
        {['Todas', 'Bebidas Frías', 'Bebidas Calientes', 'Sopas', 'Platos del día', 'Platos de la carta', 'Menú infantil'].map(category => (
          <TouchableOpacity key={category} onPress={() => setSelectedCategory(category)} style={styles.categoryButton}>
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategory]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredPlatos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity key={item.id} onPress={() => detalle(item)}>
            <PlatoCarta Plato={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  categoryButton: { padding: 8, marginRight: 8, borderRadius: 8, backgroundColor: '#ededed' },
  categoryText: { fontSize: 16 },
  selectedCategory: { color: 'blue', fontWeight: 'bold' }
});

export default Menu;
