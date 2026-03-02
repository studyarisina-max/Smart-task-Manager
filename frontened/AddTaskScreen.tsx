import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import CustomInput from '../components/CustomInput';
import API from '../services/api';

const AddTaskScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    // Basic Validation: Don't allow empty titles
    if (!title.trim()) {
      return Alert.alert('Validation Error', 'Please enter a task title');
    }

    setLoading(true);
    try {
      // Sending the data to your Node.js backend
      await API.post('/tasks', { 
        title: title.trim(), 
        description: description.trim() 
      });

      Alert.alert('Success', 'Task created successfully!');
      navigation.goBack(); // This takes the user back to the Dashboard
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', 'Could not save the task. Check your server connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Task</Text>
      
      <View style={styles.form}>
        <CustomInput 
          label="Task Title" 
          value={title} 
          onChangeText={setTitle} 
          placeholder="e.g. Study for Bank Exams" 
        />

        <CustomInput 
          label="Description (Optional)" 
          value={description} 
          onChangeText={setDescription} 
          placeholder="e.g. Focus on Quantitative Aptitude section" 
        />

        <TouchableOpacity 
          style={[styles.saveButton, loading && { backgroundColor: '#ccc' }]} 
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save Task</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20 
  },
  header: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginTop: 40, 
    marginBottom: 20,
    color: '#333'
  },
  form: { 
    marginTop: 10 
  },
  saveButton: { 
    backgroundColor: '#28a745', 
    padding: 18, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 20 
  },
  saveButtonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  cancelButton: { 
    marginTop: 15, 
    padding: 10, 
    alignItems: 'center' 
  },
  cancelButtonText: { 
    color: '#6c757d', 
    fontSize: 16 
  }
});

export default AddTaskScreen;