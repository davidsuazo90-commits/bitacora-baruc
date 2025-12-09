import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeCover from './screens/HomeCover';
import FormScreen from './screens/FormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeCover" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeCover" component={HomeCover} />
        <Stack.Screen name="Formulario" component={FormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
