import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getRaces, resetRaces } from '../redux/racesSlice';
import RaceItem from '../components/RaceItem';

const RacesScreen = ({ route }: any) => {
  const { driverId } = route.params;
  const dispatch = useAppDispatch();
  const { list, loading, error, currentPage, total } = useAppSelector(state => state);

  useEffect(() => {
    dispatch(getRaces({ driverId, page: 0 }));

    return () => {
      dispatch(resetRaces());
    };
  }, [driverId]);

  const handleNextPage = () => {
    if ((currentPage + 1) * 5 < total) {
      dispatch(getRaces({ driverId, page: currentPage + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      dispatch(getRaces({ driverId, page: currentPage - 1 }));
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
      <Text style={styles.title}>Race History</Text>

      {loading && list.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item) => item.round}
          renderItem={({ item }) => <RaceItem race={item} />}
          ListEmptyComponent={<Text>No races found</Text>}
        />
      )}

      <View style={styles.pagination}>
        <TouchableOpacity onPress={handlePrevPage} disabled={currentPage === 0}>
          <Text style={styles.paginationText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>
          Page {currentPage + 1} of {Math.ceil(total / 5)}
        </Text>
        <TouchableOpacity onPress={handleNextPage} disabled={(currentPage + 1) * 5 >= total}>
          <Text style={styles.paginationText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  error: { color: 'red', fontSize: 18 },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  paginationText: { fontSize: 18, color: '#007AFF' },
  pageNumber: { fontSize: 18 },
});

export default RacesScreen;