import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [correo, setCorreo] = useState('');
  const [passw, setPassw] = useState('');

  const handleLogin = async () => {
    if (!correo || !passw) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await axios.post('http://3.129.44.232:5000/usuarios/login', {
        correo,
        passw,
      });
      if (response.data.access_token) {
        await AsyncStorage.setItem('token', response.data.access_token);
        navigation.navigate('UserList');
      } else {
        Alert.alert('Error', 'Credenciales inválidas.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Intenta de nuevo.');
    }
  };

  const handleRegister = () => {
    // Navegar a UserFormScreen con isEdit: false para crear un nuevo usuario
    navigation.navigate('UserForm', { isEdit: false });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={passw}
        onChangeText={setPassw}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Entrar" onPress={handleLogin} color="#007bff" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Registrarse"
          onPress={handleRegister}
          color="#28a745" // Color verde para el botón de registrarse
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginBottom: 16, // Espacio entre los botones
  },
});

export default LoginScreen;