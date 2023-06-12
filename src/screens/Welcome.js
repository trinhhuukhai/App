import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { Login } from '../screens';
import jwtDecode from 'jwt-decode';

const Welcome = () => {

  // useEffect(() => {
  //   // check if user is already logged in
  //   checkLoggedInStatus();
  // });

  // const checkLoggedInStatus = async () => {
  //   const token = await AsyncStorage.getItem('auth_token');
  //   if (!token) {
  //     navigation.navigate('Login');
  //     return;
  //   }
  //   const decodedToken = jwtDecode(token);
  //   const isTokenExpired = decodedToken.exp < Date.now() / 1000;
  //   console.log(isTokenExpired)
  //   if (isTokenExpired) {
  //     // handle expired token
  //     navigation.navigate('Login');
  //   } else {
  //     navigation.navigate('Home');
  //   }
  // };

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000); // 2 seconds
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the app</Text>
      <Spinner visible={true} />
    </View>
  );
};

export default Welcome;
