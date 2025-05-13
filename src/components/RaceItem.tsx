import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RaceItem = ({ race }: any) => {
  if (!race) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.raceName}>
        {race.raceName || 'Unknown race'}
      </Text>
      <Text style={styles.detail}>
        Circuit: {race.Circuit?.circuitName || 'Unknown circuit'}
      </Text>
      <Text style={styles.detail}>
        Date: {race.date ? new Date(race.date).toLocaleDateString() : 'Date not available'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  raceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
});

export default RaceItem;