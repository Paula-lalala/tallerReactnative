import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Historial: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Pedidos</Text>
      {
        
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});

export default Historial;
