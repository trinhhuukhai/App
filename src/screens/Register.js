import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../assets';

import { SelectList } from 'react-native-dropdown-select-list'
import { COLOURS } from '../database/Database';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/action/AuthAction';

import Icons from 'react-native-vector-icons/Entypo';

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");

  const [error, setError] = useState('');


  const options = [
    { key: '1', value: 'Bán hàng' },
    { key: '0', value: 'Mua hàng' },
  ];

  const handleOptionChange = (option) => {
    setSelectedOption(option.value);
    setSelectedOption(option)
  };

  const handleRegister = () => {
    // Implement register functionality here
    if (name && email && password) {
      navigation.navigate('Login'); // Navigate to Login screen
    } else {
      // Show error message
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }



  const handldePost = () => {
    const newCat = {
      username,
      password,
      name,
      phone,
      email,
      address,
      role: selectedOption
    }
    { username == '' || password == '' || name == '' || phone == '' || email == '' || address == '' || selectedOption == "" && setError("Nhập đầy đủ thông tin") }

    registerUser(dispatch, newCat, navigation)

  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Đăng ký tài khoản</Text>

      <View style={{
        justifyContent: 'center',
        // alignItems:'center',
        paddingHorizontal: 20

      }}>
        {username == '' || password == '' || name == '' || phone == '' || email == '' || address == '' || selectedOption == "" ? <Text>{error}</Text> : <Text></Text>}
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

          {
            !showPassword ?
              <TouchableOpacity style={styles.passwordVisibilityButton} onPress={() => togglePasswordVisibility()}>
                <Icons name="eye" size={24} color="black" />

              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.passwordVisibilityButton} onPress={() => togglePasswordVisibility()}>
                <Icons name="eye-with-line" size={24} color="black" />

              </TouchableOpacity>
          }
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
          // boxStyles={style}
          setSelected={handleOptionChange}
          onChange={item => setSelectedOption(item.value)}
          selectedItem={selectedOption}

          placeholder={"Vai trò"}
          style={{
            width: '80%', fontWeight: '500',
            letterSpacing: 1,
          }}
        />

      </View>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
      }}>
        <TouchableOpacity
          style={styles.button}
          disabled={username == '' || password == '' || name == '' || phone == '' || email == '' || address == '' || selectedOption == ""}
          onPress={() => handldePost()}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Bạn đã có tài khoản? Đăng nhập.</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20
    // padding: 20
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  heading: {
    fontSize: 24,

    marginBottom: 20,
    alignSelf: 'center',

    color: COLOURS.black,
    fontWeight: '500',
    letterSpacing: 1,
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
  loginLink: {
    color: '#0080ff',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontWeight: '500',
    letterSpacing: 1,
  },
});
