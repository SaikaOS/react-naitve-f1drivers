import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import RaceItem from '../components/RaceItem';
import { getDriverDetails, getDriverRaces } from '../redux/driversSlice';

const DriverDetailScreen = () => {
  const route = useRoute();
  const { driverId } = route.params as { driverId: string };
  const dispatch = useAppDispatch();
  
  const {
    selectedDriver = null,
    races = [],
    loading = false,
    error = null
  } = useAppSelector((state) => ({
    selectedDriver: state.drivers.selectedDriver,
    races: state.drivers.races || [], 
    loading: state.drivers.loading,
    error: state.drivers.error
  }));

  useEffect(() => {
    dispatch(getDriverDetails(driverId));
    dispatch(getDriverRaces(driverId));
  }, [driverId, dispatch]);

  if (loading && !selectedDriver) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!selectedDriver) {
    return (
      <View style={styles.container}>
        <Text>Driver data not available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.driverInfo}>
        <Text style={styles.title}>
          {selectedDriver.givenName} {selectedDriver.familyName}
        </Text>
        <Text style={styles.detail}>Nationality: {selectedDriver.nationality}</Text>
        <Text style={styles.detail}>Date of Birth: {selectedDriver.dateOfBirth}</Text>
      </View>

      <Text style={styles.sectionTitle}>Recent Races:</Text>
      
      {Array.isArray(races) && races.length > 0 ? (
        races.map((race) => (
          <RaceItem
            key={`${race.season}-${race.round}`} 
            race={race} 
          />
        ))
      ) : (
        <Text style={styles.noRacesText}>No race data available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  driverInfo: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  noRacesText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  loadingMore: {
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default DriverDetailScreen;