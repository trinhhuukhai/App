import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './MainStackNavigator';
import { Provider } from 'react-redux';


import store from '../redux/store';


const App = () => {
  return (

    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>


  );
};

export default App;