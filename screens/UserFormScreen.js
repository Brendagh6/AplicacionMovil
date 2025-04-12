import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserFormScreen = ({ route, navigation }) => {
  const { usuario, isEdit } = route.params || {};
  const [form, setForm] = useState({
    nombre: isEdit ? usuario.nombre : '',
    correo: isEdit ? usuario.correo : '',
    passw: isEdit ? usuario.passw : '',
  });
  const [errores, setErrores] = useState({
    nombre: '',
    correo: '',
  });

  const handleChange = (name, value) => {
    if (name === 'nombre' && /[^a-zA-Z\s]/.test(value)) {
      setErrores(prev => ({ ...prev, nombre: 'Solo se permiten letras y espacios' }));
    } else {
      setErrores(prev => ({ ...prev, nombre: '' }));
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (Object.values(errores).some(error => error)) {
      Alert.alert('Error', 'Corrige los errores antes de continuar.');
      return;
    }

    if (!form.nombre || !form.correo || !form.passw) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (isEdit) {
        await axios.put(`http://3.129.44.232:5000/usuarios/${usuario.id_usuario}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Alert.alert('Éxito', 'Usuario actualizado.');
      } else {
        await axios.post('http://3.129.44.232:5000/usuarios/', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Alert.alert('Éxito', 'Usuario creado.');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      Alert.alert('Error', `No se pudo ${isEdit ? 'actualizar' : 'crear'} el usuario.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEdit ? 'Editar Usuario' : 'Crear Usuario'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={form.nombre}
        onChangeText={(value) => handleChange('nombre', value)}
      />
      {errores.nombre ? <Text style={styles.errorText}>{errores.nombre}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={form.correo}
        onChangeText={(value) => handleChange('correo', value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={form.passw}
        onChangeText={(value) => handleChange('passw', value)}
        secureTextEntry
      />
      <Button
        title={isEdit ? 'Actualizar' : 'Crear'}
        onPress={handleSubmit}
        color="#007bff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  errorText: {
    color: '#dc3545',
    marginBottom: 16,
  },
});

export default UserFormScreen;