import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../../../assets'
import { addCategory } from '../../../../redux/reducer/CategoryReducer'
import { useNavigation } from '@react-navigation/native'
import { getAllCategory } from '../../../../redux/reducer/ProductReducer'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from '../../../../database/Database'
const AddCustomer = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [role, setRole] = useState(0)
    const [confimPass, setConfirmPass] = useState("")
    const navigation = useNavigation()

    const handldePost = () => {
        const newCat = {
            username: username,
            password:password,
            name:name,
            phone:phone,
            email:email,
            address:address,
            role:role
        }
        addCategory(newCat)

    }


    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLOURS.white,
                position: 'relative',
            }}>

            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    paddingTop: 16,
                    paddingHorizontal: 16,
                    marginBottom: 15,
                    // justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons
                        name="chevron-left"
                        style={{
                            fontSize: 18,
                            color: COLOURS.backgroundDark,
                            padding: 12,
                            backgroundColor: COLOURS.backgroundLight,
                            borderRadius: 12,
                        }}
                    />
                </TouchableOpacity>
                <Text style={{
                    marginLeft: 50,
                    fontSize: 18,
                    color: COLOURS.black,
                    fontWeight: '500',
                    letterSpacing: 1,


                }}>Thêm tài khoản mới</Text>

            </View>

            <ScrollView>
                <View style={{
                    padding: 20
                }}>
                    <TextInput
                        onChangeText={text => {
                            setUsername(text);
                        }}
                        style={{
                            // backgroundColor:'red',
                            height: 40,
                            marginTop: 10,
                            borderBottomWidth: 1,
                            // color: 'red',
                            // marginBottom: 30
                        }}
                        placeholder="Tên đăng nhập"
                    />
                    <TextInput
                        onChangeText={text => {
                            setPassword(text);
                        }}
                        style={{
                            // backgroundColor:'red',
                            height: 40,
                            marginTop: 10,
                            borderBottomWidth: 1,
                            // color: 'red',
                            // marginBottom: 30
                        }}
                        placeholder="Mật khẩu"
                        secureTextEntry={true}

                    />
                    <TextInput
                        onChangeText={text => {
                            setConfirmPass(text);
                        }}
                        style={{
                            // backgroundColor:'red',
                            height: 40,
                            marginTop: 10,
                            borderBottomWidth: 1,
                            // color: 'red',
                            // marginBottom: 30
                        }}
                        placeholder="Nhập lại mật khẩu"
                        secureTextEntry={true}
                    />
                    <TextInput
                        onChangeText={text => {
                            setName(text);
                        }}
                        style={{
                            // backgroundColor:'red',
                            height: 40,
                            marginTop: 10,
                            borderBottomWidth: 1,
                            // color: 'red',
                            // marginBottom: 30
                        }}
                        placeholder="Họ tên"
                    />
                    <TextInput
                        onChangeText={text => {
                            setPhone(text);
                        }}
                        style={{
                            // backgroundColor:'red',
                            height: 40,
                            marginTop: 10,
                            borderBottomWidth: 1,
                            // color: 'red',
                            // marginBottom: 30
                        }}
                        placeholder="Số điện thoại"
                    />

                    <TextInput
                        onChangeText={text => {
                            setEmail(text);
                        }}
                        style={{
                            // backgroundColor:'red',
                            height: 40,
                            marginTop: 10,
                            borderBottomWidth: 1,
                            // color: 'red',
                            // marginBottom: 30
                        }}
                        placeholder="Email"
                    />
                    <TextInput
                        onChangeText={text => {
                            setAddress(text);
                        }}
                        style={{
                            // backgroundColor:'red',
                            height: 40,
                            marginTop: 10,
                            borderBottomWidth: 1,
                            // color: 'red',
                            // marginBottom: 30
                        }}
                        placeholder="Địa chỉ"
                    />

                </View>
            </ScrollView>

            <View style={{
                marginBottom:50
            }}>
                <TouchableOpacity

                    onPress={() => {

                        handldePost()
                        Alert.alert("thanh cong")
                        navigation.goBack()
                    }}
                    style={{
                        backgroundColor: colors.primary,

                        width: '60%',
                        alignSelf: 'center',
                        alignItems: 'center',
                        borderRadius: 15
                    }}>
                    <Text style={{
                        padding: 10,
                        color: 'white',
                        fontSize: 14
                    }}>Thêm mới</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default AddCustomer