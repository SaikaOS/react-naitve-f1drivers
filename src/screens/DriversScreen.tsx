import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getDrivers, setCurrentPage } from '../redux/driversSlice';
import DriverItem from '../components/DriverItem';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

type DriverDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Races'>;

const DriversScreen = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error, currentPage, total } = useAppSelector(state => state.drivers);
  const navigation = useNavigation<DriverDetailScreenNavigationProp>();

  useEffect(() => {
    dispatch(getDrivers(currentPage));
  }, [currentPage, dispatch]);

  const handleNextPage = () => {
    if ((currentPage + 1) * 10 < total) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Formula 1 Drivers</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item) => item.driverId}
          renderItem={({ item }) => (
            <DriverItem driver={item} onPress={() => navigation.navigate('DriverDetail', { driverId: item.driverId })} />
          )}
        />
      )}

<View style={styles.pagination}>
  <TouchableOpacity 
    onPress={handlePrevPage} 
    disabled={currentPage === 0}
    style={currentPage === 0 && styles.disabledButton}
  >
    <Text style={styles.paginationText}>Previous</Text>
  </TouchableOpacity>
  
  <Text style={styles.pageNumber}>
    Page {currentPage + 1} of {Math.ceil(total / 10)}
  </Text>
  
  <TouchableOpacity 
    onPress={handleNextPage} 
    disabled={(currentPage + 1) * 10 >= total}
    style={(currentPage + 1) * 10 >= total && styles.disabledButton}
  >
    <Text style={styles.paginationText}>Next</Text>
  </TouchableOpacity>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  pagination: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  paginationText: { fontSize: 18, color: '#007AFF' },
  pageNumber: { fontSize: 18 },
  error: { color: 'red', fontSize: 18 },
  disabledButton: {
    opacity: 0.5,
  },
});

export default DriversScreen;