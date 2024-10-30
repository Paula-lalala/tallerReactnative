import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface PlatoCarta {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

interface PlatoCartaProps {
  Plato: PlatoCarta;
}

const PlatoCarta: React.FC<PlatoCartaProps> = ({ Plato }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: Plato.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{Plato.name}</Text>
        <Text style={styles.price}>${Plato.price}</Text>
        <Text style={styles.description}>{Plato.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 16, marginVertical: 8, backgroundColor: '#f9f9f9', borderRadius: 8 },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 16 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: 'green', marginVertical: 4 },
  description: { fontSize: 14, color: '#555' }
});

export default PlatoCarta;
