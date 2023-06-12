import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../assets';
import { SelectList } from 'react-native-dropdown-select-list'
import { COLOURS } from '../database/Database';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/action/AuthAction';
import Icons from 'react-native-vector-icons/Entypo';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [selectedOption, setSelectedOption] = useState('');

  const [error, setError] = useState('');

  const options = [
    { key: '1', value: 'Bán hàng' },
    { key: '0', value: 'Mua hàng' },
  ];

  const handleOptionChange = (option) => {
    setSelectedOption(option.value);
    setSelectedOption(option);
  };



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handldePost = () => {
    if (
      username === '' ||
      password === '' ||
      name === '' ||
      phone === '' ||
      email === '' ||
      address === '' ||
      selectedOption === ''
    ) {
      setError('Nhập đầy đủ thông tin.');
    } else if (username.length < 6 || username.length > 10) {
      setError('Tên đăng nhập phải có từ 6 đến 10 ký tự.');
    } else if (password.length < 6 || password.length > 10) {
      setError('Mật khẩu phải có từ 6 đến 10 ký tự.');
    } else if (phone.length < 10 || phone.length > 11) {
      setError('Số điện thoại phải có từ 10 đến 11 số.');
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Email không hợp lệ.');
    } else if (/\s/.test(username)) {
      setError('Tên đăng nhập không được chứa khoảng trắng.');
    }
    else if (/\s/.test(password)) {
      setError('Mật khẩu không được chứa khoảng trắng.');
    } 
    else if (/\s/.test(phone)) {
      setError('Số điện thoại không được chứa khoảng trắng.');
    } 
    else if (/\s/.test(email)) {
      setError('Email không được chứa khoảng trắng.');
    }  else {
      const newCat = {
        username,
        password,
        name,
        phone,
        email,
        address,
        role: selectedOption
      };
      registerUser(dispatch, newCat, navigation);
      Alert.alert("Đăng ký thành công");
    }
  };




  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Đăng ký tài khoản</Text>

      <View style={styles.inputContainer}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.passwordVisibilityButton} onPress={togglePasswordVisibility}>
            <Icons name={showPassword ? 'eye-with-line' : 'eye'} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Họ tên"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType='numeric'
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ"
          value={address}
          onChangeText={setAddress}
        />
        <SelectList
          data={options}
          setSelected={handleOptionChange}
          onChange={item => setSelectedOption(item.value)}
          selectedItem={selectedOption}
          placeholder="Vai trò"
          style={styles.selectList}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, username === '' || password === '' || name === '' || phone === '' || email === '' || address === '' || selectedOption === '' ? styles.disabledButton : null]}
          disabled={username === '' || password === '' || name === '' || phone === '' || email === '' || address === '' || selectedOption === ''}
          onPress={() => { handldePost() }}
        >
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Bạn đã có tài khoản? Đăng nhập.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    alignSelf: 'center',
    color: COLOURS.black,
    fontWeight: '500',
    letterSpacing: 1,
  },
  inputContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: colors.primary,
    fontWeight: '500',
    letterSpacing: 1,
  },
  passwordInputContainer: {
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
    borderColor: colors.primary,
    fontWeight: '500',
    letterSpacing: 1,
  },
  passwordVisibilityButton: {
    padding: 10,
  },
  selectList: {
    width: '80%',
    fontWeight: '500',
    letterSpacing: 1,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    letterSpacing: 1,
  },
  loginLink: {
    color: '#0080ff',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontWeight: '500',
    letterSpacing: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontWeight: '500',
    letterSpacing: 1,
    marginTop: 5
  },
});
