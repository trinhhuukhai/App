import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/action/AuthAction';
import { colors } from '../assets';
// import { MaterialIcons } from 'react-native-vector-icons';

function Login() {


  // useEffect(() => {
  //   checkLoggedInStatus();
  // });

  const navigation = useNavigation();
  const dispatch = useDispatch();



  // const checkLoggedInStatus = async () => {
  //   const getToken = await AsyncStorage.getItem('token')
  //   const role = await AsyncStorage.getItem('roleName')
    
  //   if (!getToken && out == "") {
  //     navigation.navigate('Login');
  //     return;
  //   }
  //   const decodedToken = jwtDecode(getToken);
    
  //   const isTokenExpired = decodedToken.exp < Date.now() / 1000;
  //   if (isTokenExpired) {
  //     navigation.navigate('Login');
  //   } else if (!isTokenExpired && role === 'OWNER') {
  //     navigation.navigate('Home');
  //   } else if (!isTokenExpired  && role === 'CUSTOMER') {
  //     navigation.navigate('Client');
  //   }
  // };



  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);




  const handleLogin = async () => {
    const newUser = {
      username: username,
      password: password,
    };
    setIsLoading(true);
    await loginUser(dispatch, newUser, navigation);
    setIsLoading(false);
  
  };

  const auth = useSelector((state) => state.auth?.data);
  const getOut = useSelector((state) => state.auth?.out);
  const out = getOut?.data
  // const token = auth?.token;
  const role = auth?.roleName;
  const mes = auth?.message

  


  const handleForgotPassword = () => {
    // Implement forgot password functionality here
  }

  const handleRegister = () => {
    // Implement register functionality here
    navigation.navigate('Register')
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <View style={styles.container}>
      <Spinner color='#00ff00' size={"large"} visible={isLoading} />
      <Text style={styles.heading}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.passwordVisibilityButton} onPress={togglePasswordVisibility}>
          {/* <MaterialIcons name="add" size={24} color="black" /> */}

        </TouchableOpacity>
      </View>

      {mes == '' ? <Text>Dăng nhap loi</Text> : <Text>{mes}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordLink}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerLink}>Đăng ký tài khoản</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: colors.primary,
   
    
  },

  passwordInputContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.primary,
 

  },
  passwordVisibilityButton: {
    padding: 10,
  },
  button: {
    backgroundColor: '#0080ff',
    width: '80%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordLink: {
    color: '#0080ff',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  registerLink: {
    color: '#000',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default Login;