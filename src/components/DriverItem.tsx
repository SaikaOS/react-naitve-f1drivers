import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';


type DriverItemNavigationProp = StackNavigationProp<RootStackParamList, 'DriverDetail'>;

const DriverItem = ({ driver, onPress }: any) => {

  const navigation = useNavigation<DriverItemNavigationProp>();

  const handlePress = () => {
    navigation.navigate('DriverDetail', { 
      driverId: driver.driverId 
    });
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.name}>
          {driver.givenName} {driver.familyName}
        </Text>
        <Text style={styles.info}>Nationality: {driver.nationality}</Text>
        <Text style={styles.info}>DOB: {driver.dateOfBirth}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
});

export default DriverItem;