import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home';
import Order from './screens/order';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen 
          name="Menu" 
          component={Menu} 
          options={{ title: 'Menú' }} 
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Order" component={Order} />
      </Stack.Navigator>
  );
};

const Menu: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Ir a Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Ir a Order" onPress={() => navigation.navigate('Order')} />
      <Button title="Ir a History" onPress={() => navigation.navigate('History')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;







