import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './screens/Menu';
import Detalle from './screens/detalle';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menú del Restaurante' }} />
        <Stack.Screen name="detalle" component={Detalle} options={{ title: 'Detalles del Producto' }} />
      </Stack.Navigator>
  );
};

export default App;
