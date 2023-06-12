import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../../assets';
import { getUserById } from '../../../../redux/reducer/AuthReducer';
import { COLOURS } from '../../../../database/Database';
import { icons } from '../../../../constants';
import Spinner from 'react-native-loading-spinner-overlay';



const Account = () => {

    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState([])
    const auth = useSelector((state) => state.auth?.data);
    const navigation = useNavigation()
    const userId = auth?.id;

    const isFocused = useIsFocused()


    useEffect(() => {
        if (isFocused) {
            getData();
        }

    }, [isFocused]);

    const getData = async () => {
        setLoading(true);
        const response = await getUserById(userId);
        if (response.data === '') {
            setLoading(false);
            setUser([])
        } else {
            setUser(response.data)
            setLoading(false);
        }
    };


    const editUser = () => {
        navigation.navigate('EDITTKOWNER', { 'id': user.id })
    }

    const ChangePass = () => {
        navigation.navigate('CHANGEPASSOWNER', { 'id': user.id })
    }



    return (
        <View
            style={{
                width: '100%',
                height: '100%',
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


                }}>Thông tin tài khoản</Text>

            </View>
            <Spinner color='#00ff00' size={"large"} visible={isLoading} />

            <View
                style={{
                    padding: 10,
                    width: '100%',
                    backgroundColor: 'gray',
                    height: 100,

                    alignItems: 'flex-end'
                }}
            >
            </View>
            <View>
                <View
                    style={{
                        marginHorizontal: 10,
                    }}>
                    <Image
                        source={{
                            uri: 'http://192.168.43.199:8443/api/v1/getFile/f8249c906e8d4aacb946b91a5c43dda2.png'
                        }}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 100,
                            marginTop: -70,
                        }}
                    />


                    <View
                        style={{
                            flexDirection: 'row',
                            // backgroundColor:'red',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <View style={{
                            marginTop: 10
                        }}>
                            <Text
                                style={{
                                    marginStart: 10,
                                    fontSize: 18,
                                    fontWeight: 'bold'
                                }}>
                                {user.name}
                            </Text>
                            <Text style={{
                                marginStart: 10,
                                fontSize: 16, fontWeight: 'bold'
                            }}>Địa chỉ: {user.address}</Text>

                            <Text style={{
                                marginStart: 10,
                                fontSize: 16, fontWeight: 'bold'
                            }}>Số điện thoại: {user.phone}</Text>
                            <Text style={{
                                marginStart: 10,
                                fontSize: 16, fontWeight: 'bold'
                            }}>Email: {user.email}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => editUser()}
                        >
                            <Image
                                source={icons.icon_edit}
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: colors.primary,
                                }}
                            />
                        </TouchableOpacity>
                    </View>



                </View>
            </View>

            <View style={{

                marginTop: 30
            }}>
                <TouchableOpacity
                    onPress={() =>
                        ChangePass()
                    }
                >
                    <Text style={{
                        marginLeft: 20,
                        color: 'orange'
                    }}>Đổi mật khẩu</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Account