import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, 
  KeyboardAvoidingView, Platform, ScrollView, TextInput 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FormInput from './components/FormInput';

export default function MenuManagerScreen({ navigation, menuItems, setMenuItems }) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null); 

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('All');

  const courses = ['All', 'Starter', 'Main', 'Dessert'];

  const handleSaveItem = () => {
    if (!dishName || !description || !course || !price) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (isNaN(price)) {
      Alert.alert("Error", "Price must be a valid number.");
      return;
    }

    if (editingId) {
      const updatedItems = menuItems.map(item => 
        item.id === editingId ? { ...item, dishName, description, course, price } : item
      );
      setMenuItems(updatedItems);
      Alert.alert("Success", "Menu item updated successfully!");
      setEditingId(null);
    } else {
      const newItem = { id: Date.now().toString(), dishName, description, course, price };
      setMenuItems([...menuItems, newItem]);
      Alert.alert("Success", "Menu item added successfully!");
    }
    
    setDishName(''); setDescription(''); setCourse(''); setPrice('');
  };

  const handleDelete = (id, name) => {
    Alert.alert("Confirm Delete", `Are you sure you want to delete ${name}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => {
          setMenuItems(menuItems.filter(item => item.id !== id));
      }}
    ]);
  };

  const handleEdit = (item) => {
    setDishName(item.dishName);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price);
    setEditingId(item.id);
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.dishName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCourse === 'All' || item.course.toLowerCase() === filterCourse.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <TouchableOpacity style={styles.statsBtn} onPress={() => navigation.navigate('Statistics')}>
          <Text style={styles.statsBtnText}>View Menu Statistics 📊</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</Text>
        
        <FormInput label="Dish Name" value={dishName} onChangeText={setDishName} placeholder="e.g. Grilled Chicken" />
        <FormInput label="Description" value={description} onChangeText={setDescription} placeholder="Ingredients..." multiline />
        <FormInput label="Course" value={course} onChangeText={setCourse} placeholder="e.g. Starter, Main, Dessert" />
        <FormInput label="Price (R)" value={price} onChangeText={setPrice} placeholder="e.g. 120" keyboardType="numeric" />

        <TouchableOpacity style={styles.addButton} onPress={handleSaveItem}>
          <Text style={styles.addButtonText}>{editingId ? 'Update Item' : 'Add Menu Item'}</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.headerTitle}>Current Menu</Text>
        
        <TextInput 
          style={styles.searchInput}
          placeholder="🔍 Search by dish name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.filterContainer}>
          {courses.map(c => (
            <TouchableOpacity 
              key={c} 
              style={[styles.filterBtn, filterCourse === c && styles.filterBtnActive]}
              onPress={() => setFilterCourse(c)}
            >
              <Text style={[styles.filterText, filterCourse === c && styles.filterTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredItems.length === 0 ? (
          <Text style={styles.emptyMessage}>No menu items found.</Text>
        ) : (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.dishName}</Text>
                  <Text style={styles.cardText}><Text style={{fontWeight: 'bold'}}>{item.course}</Text> | R{item.price}</Text>
                  <Text style={styles.cardDesc}>{item.description}</Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity onPress={() => handleEdit(item)} style={styles.iconBtn}>
                    <Ionicons name="pencil" size={20} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id, item.dishName)} style={styles.iconBtn}>
                    <Ionicons name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f9f9f9', flexGrow: 1 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333', marginTop: 10 },
  addButton: { backgroundColor: '#E91E63', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  addButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#ccc', marginVertical: 25 },
  statsBtn: { backgroundColor: '#333', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  statsBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  searchInput: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  filterBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#e0e0e0' },
  filterBtnActive: { backgroundColor: '#E91E63' },
  filterText: { color: '#333', fontSize: 12, fontWeight: 'bold' },
  filterTextActive: { color: '#fff' },
  emptyMessage: { textAlign: 'center', color: 'gray', fontStyle: 'italic', marginTop: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, flexDirection: 'row', alignItems: 'center', elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#E91E63' },
  cardText: { fontSize: 14, color: '#444', marginTop: 2 },
  cardDesc: { fontSize: 12, color: 'gray', marginTop: 5 },
  actionButtons: { flexDirection: 'column', marginLeft: 10 },
  iconBtn: { padding: 10, marginVertical: 2, backgroundColor: '#f0f0f0', borderRadius: 5 }
});