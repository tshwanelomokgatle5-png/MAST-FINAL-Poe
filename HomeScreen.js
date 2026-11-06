import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop' }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>THE GOOD CHEF</Text>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=200&auto=format&fit=crop' }} 
          style={styles.chefImage} 
        />
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('MenuManager')}
        >
          <Text style={styles.buttonText}>Manage Menu</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlay: { backgroundColor: 'rgba(0,0,0,0.6)', padding: 30, borderRadius: 20, alignItems: 'center' },
  title: { fontSize: 28, color: 'white', fontWeight: 'bold', marginBottom: 20, letterSpacing: 2 },
  chefImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 30 },
  button: { backgroundColor: '#E91E63', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 10 },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: 'white' }
});