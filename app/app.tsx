import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './screens/Menu';
import { CarritoProvider } from './contexts/Carrito';
import detalle from './screens/detalle';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <CarritoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Menu">
          <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menú del Restaurante' }} />
          <Stack.Screen name="detalle" component={detalle} options={{ title: 'Menú del Restaurante' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CarritoProvider>

  );
};
export default App;