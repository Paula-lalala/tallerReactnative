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
    router.push(`/screens/detalle?id=${plato.id}&name=${plato.name}&image=${plato.image}&price=${plato.price}&description=${plato.description}`);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: plato.image }} style={styles.image} />
      <View style={styles.info} >
        <Text style={styles.name}>{plato.name}</Text>
        <Text style={styles.price}>${plato.price}</Text>
        <Text style={styles.description}>{plato.description}</Text>
        <Button title="Ver Detalle"  onPress={verDetalle}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { 
    flexDirection: 'row', 
    padding: 16, 
    marginVertical: 8, 
    backgroundColor: '#ffffff', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#e0e0e0',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4,
    elevation: 3 
  },
  image: { 
    width: 80, 
    height: 80, 
    borderRadius: 8, 
    marginRight: 16 
  },
  info: { 
    flex: 1, 
    justifyContent: 'center' 
  },
  name: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 4 
  },
  price: { 
    fontSize: 16, 
    color: '#28a745', 
    fontWeight: '500', 
    marginBottom: 4 
  },
  description: { 
    fontSize: 14, 
    color: '#555', 
    marginBottom: 8 
  },
  button: { 
    backgroundColor: '#007aff', 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 16, 
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  buttonText: { 
    color: '#ffffff', 
    fontSize: 14, 
    fontWeight: '600' 
  }
});

export default PlatoCarta;

