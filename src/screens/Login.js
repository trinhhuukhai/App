import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/action/AuthAction';
import Spinner from 'react-native-loading-spinner-overlay';
import Icons from 'react-native-vector-icons/Entypo';
import { COLOURS } from '../database/Database';

function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const newUser = {
      username: username,
      password: password,
    };
    setIsLoading(true);
    if (username === '' || password === '') {
      setError("Nhập đầy đủ thông tin");
    } else {
      setError('');
      await loginUser(dispatch, newUser, navigation);
    }
    setIsLoading(false);
  };

  const auth = useSelector((state) => state.auth?.data);
  const mes = auth?.message;

  const handleForgotPassword = () => {
    navigation.navigate("Quên mật khẩu");
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          <Icons name={showPassword ? "eye-with-line" : "eye"} size={24} color="black" />
        </TouchableOpacity>
      </View>
      {mes && <Text style={styles.errorText}>{mes}</Text>}
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
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
}

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
    borderColor: COLOURS.primary,
    fontWeight: '500',
    letterSpacing: 1,
  },
  passwordInputContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    fontWeight: '500',
    letterSpacing: 1,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: COLOURS.primary,
    fontWeight: '500',
    letterSpacing: 1,
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
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    letterSpacing: 1,
  },
  forgotPasswordLink: {
    marginTop: 10,
    textDecorationLine: 'underline',
    color: COLOURS.black,
    fontWeight: '500',
    letterSpacing: 1,
  },
  registerLink: {
    marginTop: 10,
    textDecorationLine: 'underline',
    color: COLOURS.black,
    fontWeight: '500',
    letterSpacing: 1,
  },
  errorText: {
    color: 'red',
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 3,
  },
});

export default Login;
