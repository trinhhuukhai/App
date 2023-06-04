import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from '../database/Database';
import { colors } from '../assets';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const ForgotPass = () => {
    const navigation = useNavigation()
    const [checkGetToken, setCheckGetToken] = useState(false)
    const [email, setEmail] = useState("")
    const [mess, setMess] = useState("")
    const [newPass, setNewpass] = useState('');
    const [comfirm, setConfirm] = useState('');
    const [token, setToken] = useState('');
    const [isLoading, setLoading] = useState(false);


    const getToken = async () => {
        try {
            setLoading(true);

            const response = await axios.post(`http://192.168.43.199:8443/api/v1/forgot-password?email=${email}`);

            if (response.data.data == "error") {
                setCheckGetToken(false)
                setMess(response.data.message)
                setLoading(false);

            } else {
                setCheckGetToken(true)
                setMess(response.data.message)
                setLoading(false);


            }
        } catch (error) {
            console.log(error);
            setLoading(false);

            return null;
        }
    }


    const ChangePass = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`http://192.168.43.199:8443/api/v1/reset-password?token=${token}&password=${newPass}`);

            await Alert.alert("Thành công", response.data)
            await navigation.goBack()
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            return null;
        }
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
                    marginLeft: 70,
                    fontSize: 18,
                    color: COLOURS.black,
                    fontWeight: '500',
                    letterSpacing: 1,


                }}>Quên mật khẩu</Text>

            </View>

            {checkGetToken == false ?
                <View style={{

                }}>
                    <View style={{
                        padding: 20
                    }}>
                        <TextInput
                            onChangeText={text => {
                                setEmail(text);
                            }}
                            style={{
                                height: 40,
                                marginTop: 10,
                                borderBottomWidth: 1,
                                fontWeight: '500',
                                letterSpacing: 1,
                            }}
                            placeholder="Email đăng ký"
                        />

                    </View>


                    <TouchableOpacity

                        style={{
                            backgroundColor: colors.primary,

                            width: '60%',
                            alignSelf: 'center',
                            alignItems: 'center',
                            borderRadius: 15
                        }}
                        onPress={() => getToken()}
                    >
                        <Text style={{
                            padding: 10,
                            color: 'white',
                            fontSize: 14, fontWeight: '500',
                            letterSpacing: 1,
                        }}>Lấy mã token</Text>
                    </TouchableOpacity>
                    <Spinner color='#00ff00' size={"large"} visible={isLoading} />

                    <Text style={{
                        fontWeight: '500',
                        letterSpacing: 1,
                        alignItems: 'center',
                        alignSelf: 'center',
                        color: 'red',
                        marginTop: 30
                    }}>{mess}</Text>
                </View>
                :

                <View style={{
                    padding: 20
                }}>
                    <Spinner color='#00ff00' size={"large"} visible={isLoading} />

                    <Text style={{
                        fontWeight: '500',
                        letterSpacing: 1,
                        alignItems: 'center',
                        alignSelf: 'center',
                        color: 'red',
                    }}>{mess}</Text>
                    <TextInput
                        onChangeText={text => {
                            setToken(text);
                        }}
                        style={{
                            height: 40,
                            marginTop: 10,
                            borderBottomWidth: 1,
                            fontWeight: '500',
                            letterSpacing: 1,
                        }}

                        placeholder="Mã token"

                    />
                    <TextInput
                        onChangeText={text => {
                            setNewpass(text);
                        }}
                        style={{
                            height: 40,
                            marginTop: 10,
                            borderBottomWidth: 1,
                            fontWeight: '500',
                            letterSpacing: 1,
                        }}

                        placeholder="Mật khẩu mới"
                        secureTextEntry={true}
                    />
                    <TextInput
                        onChangeText={text => {
                            setConfirm(text);
                        }}
                        style={{
                            height: 40,
                            marginTop: 10,
                            borderBottomWidth: 1,
                            fontWeight: '500',
                            letterSpacing: 1,
                        }}
                        secureTextEntry={true}
                        placeholder="Nhập lại mật khẩu"
                    />
                    <TouchableOpacity
                        onPress={() => ChangePass()}
                        style={{
                            backgroundColor: colors.primary,
                            width: '60%',
                            alignSelf: 'center',
                            alignItems: 'center',
                            borderRadius: 15,
                            marginTop: 30,
                            opacity: comfirm !== newPass ? 0.5 : 1, // disable button if confirm is not equal to newPass
                            pointerEvents: comfirm !== newPass ? "none" : "auto" // prevent touch event if confirm is not equal to newPass
                        }}
                        disabled={comfirm !== newPass} // disable button if confirm is not equal to newPass
                    >
                        <Text style={{
                            padding: 10,
                            color: 'white',
                            fontSize: 14,
                            fontWeight: '500',
                            letterSpacing: 1,
                        }}>Lưu</Text>
                    </TouchableOpacity>
                </View>


            }


        </View>
    )
}

export default ForgotPass

const styles = StyleSheet.create({})