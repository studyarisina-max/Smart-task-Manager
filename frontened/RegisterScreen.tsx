import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import CustomInput from '../components/CustomInput';
import API from '../services/api';

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Basic validation
    if (!name || !email || !password) {
      return Alert.alert('Error', 'Please fill all fields');
    }

    setLoading(true);
    try {
      // Connects to your Render Backend
      await API.post('/auth/register', { name, email, password });
      
      setLoading(false);
      Alert.alert('Success', 'Account created! Now please login.');
      navigation.navigate('Login');
    } catch (error: any) {
      setLoading(false);
      // Grabs the error message from the server or shows a generic one
      const msg = error.response?.data?.message || "Check your internet connection";
      Alert.alert('Registration Failed', msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      
      <CustomInput label="Name" value={name} onChangeText={setName} />
      <CustomInput label="Email" value={email} onChangeText={setEmail} />
      <CustomInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity 
        style={[styles.button, loading && { backgroundColor: '#ccc' }]} 
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { marginTop: 15, textAlign: 'center', color: '#007bff' }
});

export default RegisterScreen;