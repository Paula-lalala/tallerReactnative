import React from 'react';
import { View, Text, Button } from 'react-native';

const Order: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View>
      <Text>Pantalla de Orden</Text>
      <Button title="Ir a Menú" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
};

export default Order;
