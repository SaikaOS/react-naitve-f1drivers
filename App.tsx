import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        } 
        persistor={persistor}
      >
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;