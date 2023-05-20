import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../assets';
import { SelectList } from 'react-native-dropdown-select-list'

// import { MaterialIcons } from 'react-native-vector-icons/MaterialIcons';

const Register = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { key: '0', value: 'Bán hàng' },
    { key: '1', value: 'Mua hàng' },
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Đăng ký tài khoản</Text>
      <View style={{
        justifyContent: 'center',
        // alignItems:'center',
        paddingHorizontal: 20

      }}>
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
            {/* <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="black" /> */}
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
          style={{ width: '80%'}}
        />

      </View>
      <View style={{
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
      }}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
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
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center'
  },
  input: {

    height: 50,
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: colors.primary

  },

  passwordInputContainer: {

    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.primary
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
  loginLink: {
    color: '#0080ff',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
