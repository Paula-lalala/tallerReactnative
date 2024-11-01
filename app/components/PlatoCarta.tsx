import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

interface PlatoCarta {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

interface PlatoCartaProps {
  plato: PlatoCarta;
}

const PlatoCarta: React.FC<PlatoCartaProps> = ({ plato }) => {
  const router = useRouter();

  const verDetalle = () => {
    router.push(`/screens/Detalle?id=${plato.id}&name=${plato.name}&image=${plato.image}&price=${plato.price}&description=${plato.description}`);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: plato.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{plato.name}</Text>
        <Text style={styles.price}>${plato.price}</Text>
        <Text style={styles.description}>{plato.description}</Text>
        <Button title="Ver Detalle" onPress={verDetalle} />
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

