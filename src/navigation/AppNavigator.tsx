import { createStackNavigator } from '@react-navigation/stack';
import DriversScreen from '../screens/DriversScreen';
import DriverDetailScreen from '../screens/DriverDetailScreen';
import RacesScreen from '../screens/RacesScreen';

export type RootStackParamList = {
  Drivers: undefined; 
  DriverDetail: { driverId: string };
  Races: { driverId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Drivers">
      <Stack.Screen name="Drivers" component={DriversScreen} />
      <Stack.Screen name="DriverDetail" component={DriverDetailScreen} />
      <Stack.Screen name="Races" component={RacesScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;