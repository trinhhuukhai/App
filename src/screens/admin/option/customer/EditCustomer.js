import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { colors } from '../../../../assets';
import { images } from '../../../../constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOURS } from '../../../../database/Database';
import { icons } from '../../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { editUser, getUserById } from '../../../../redux/reducer/AuthReducer';


const EditCustomer = () => {

    const [loading, setLoading] = useState(false);
    // const [name, setName] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        // debugger
        const response = await getUserById(id)
        
        if (response.data === '') {
            setLoading(false);
        } else {
            setName(response.data.name);
            setAddress(response.data.address);
            setPhone(response.data.phone);
            setLoading(false);
        }
    };

    const z = () => {
        const newCat = {
            name: name,
            address: address,
            phone: phone,
        }

        editUser(id, newCat)
        


    }

    const viewCate = () => {
        // Navigate to the OrderDetail screen with the orderId
        navigation.navigate('Danh Mục');
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


                }}>Thay đổi thông tin</Text>

            </View>

            <View style={{
                padding: 20
            }}>
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
                    value={name}
                    placeholder="Họ tên"
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
                    value={address}
                    placeholder="Địa chỉ"
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
                    value={phone}
                    placeholder="Số điện thoại"
                />
            </View>


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
                }}>Lưu</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EditCustomer