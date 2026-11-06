import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function StatisticsScreen({ menuItems }) {
  const totalItems = menuItems.length;
  
  const averagePrice = totalItems > 0 
    ? (menuItems.reduce((sum, item) => sum + Number(item.price), 0) / totalItems).toFixed(2)
    : 0;

  const courseCounts = menuItems.reduce((acc, item) => {
    const courseName = item.course.charAt(0).toUpperCase() + item.course.slice(1).toLowerCase();
    acc[courseName] = (acc[courseName] || 0) + 1;
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Menu Overview</Text>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Total Menu Items</Text>
        <Text style={styles.statValue}>{totalItems}</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Average Price</Text>
        <Text style={styles.statValue}>R {averagePrice}</Text>
      </View>

      <Text style={styles.subHeader}>Items per Course</Text>
      
      {Object.keys(courseCounts).length === 0 ? (
        <Text style={styles.emptyText}>No items added yet to calculate stats.</Text>
      ) : (
        Object.entries(courseCounts).map(([course, count]) => (
          <View key={course} style={styles.courseRow}>
            <Text style={styles.courseName}>{course}s</Text>
            <Text style={styles.courseCount}>{count}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  statCard: { backgroundColor: '#E91E63', padding: 20, borderRadius: 10, marginBottom: 15, alignItems: 'center' },
  statLabel: { color: 'white', fontSize: 16, fontWeight: '600' },
  statValue: { color: 'white', fontSize: 32, fontWeight: 'bold', marginTop: 5 },
  subHeader: { fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 10, marginBottom: 15 },
  courseRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 10 },
  courseName: { fontSize: 16, color: '#333' },
  courseCount: { fontSize: 16, fontWeight: 'bold', color: '#E91E63' },
  emptyText: { textAlign: 'center', color: 'gray', fontStyle: 'italic' }
});