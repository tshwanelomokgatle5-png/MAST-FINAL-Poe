import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function FormInput({ label, value, onChangeText, placeholder, keyboardType, multiline }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 },
  multilineInput: { height: 80, textAlignVertical: 'top' }
});