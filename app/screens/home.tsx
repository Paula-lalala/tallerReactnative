import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import MenuItem from '../components/menuItem';

interface HomeProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const menuItems = [
    {
      id: '1',
      title: 'Sopa de Pollo',
      price: 15000,
      description: 'Sopa caliente con pollo y verduras',
      image: 'url_image_here',
    },
    {
      id: '2',
      title: 'Hamburguesa',
      price: 20000,
      description: 'Hamburguesa de carne con queso',
      image: 'url_image_here',
    },
  ];

  const renderItem = ({ item }: { item: { id: string; title: string; price: number; description: string; image: string } }) => (
    <MenuItem
      title={item.title}
      price={item.price}
      description={item.description}
      image={item.image}
      onPress={() => navigation.navigate('Order', { item })}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú del Restaurante</Text>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button title="Ir a Ordenar" onPress={() => navigation.navigate('Order')} />
      <Button title="Ir a Inicio" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Home;
