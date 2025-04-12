import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import UserListScreen from './screens/UserListScreen';
import UserFormScreen from './screens/UserFormScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
        <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'Lista de Usuarios' }} />
        <Stack.Screen name="UserForm" component={UserFormScreen} options={{ title: 'Usuario' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}