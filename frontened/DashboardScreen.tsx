import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import API from '../services/api';

const DashboardScreen = ({ navigation }: any) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', fetchTasks);
    return focusHandler;
  }, [navigation]);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
    await API.put(`/tasks/${id}`, { status: nextStatus });
    fetchTasks();
  };

  const deleteTask = (id: string) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      { text: "Delete", onPress: async () => { await API.delete(`/tasks/${id}`); fetchTasks(); }}
    ]);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <TouchableOpacity onPress={() => toggleStatus(item._id, item.status)}>
                <Text style={{ color: item.status === 'Completed' ? 'green' : '#f39c12' }}>{item.status}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => deleteTask(item._id)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddTask')}>
        <Text style={{ color: '#fff', fontSize: 30 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  header: { fontSize: 28, fontWeight: 'bold', marginTop: 40, marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  taskTitle: { fontSize: 18, fontWeight: '600' },
  fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#007bff', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 }
});

export default DashboardScreen;