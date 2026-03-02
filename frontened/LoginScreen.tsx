import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import CustomInput from '../components/CustomInput';
import API from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// STYLES DEFINED AT THE TOP
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#333' },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkText: { marginTop: 20, textAlign: 'center', color: '#007bff' },
});

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Please fill all fields');
    setLoading(true);
    try {
      const response = await API.post('/auth/login', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      navigation.replace('Dashboard');
    } catch (error: any) {
      Alert.alert('Login Failed', error.response?.data?.message || 'Check your credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Task Manager</Text>
      <CustomInput label="Email" value={email} onChangeText={setEmail} placeholder="email@example.com" />
      <CustomInput label="Password" value={password} onChangeText={setPassword} secureTextEntry placeholder="******" />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;