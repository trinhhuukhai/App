import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { colors } from '../../../constants';
import images from '../../../constants';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../../redux/reducer/AuthReducer';
import { icons } from '../../../constants';
import { COLOURS } from '../../../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { logout } from '../../../redux/action/AuthAction';
import { getWalletById } from '../../../redux/reducer/CustomerReducer';

const AccountClient = () => {

    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState([])
    const dispatch = useDispatch()
    const [wallet, setWallet] = useState(0)
    const auth = useSelector((state) => state.auth?.data);
    const token = auth.token
    const navigation = useNavigation()
    const userId = auth?.id;
    const walletId = auth?.walletId
    const isFocused = useIsFocused()



    useEffect(() => {
        if (isFocused) {
            getData();
            getWallet()
        }

    }, [isFocused]);

    const getData = async () => {
        setLoading(true);
        const response = await getUserById(userId);
        if (response.data === '') {
            setLoading(false);
        } else {
            setUser(response.data)
            setLoading(false);
        }
    };


    // useEffect(() => {
    //     getWallet()
    // }, [isFocused]);

    const getWallet = async () => {
        const response = await getWalletById(walletId,token);
        
        setLoading(true);
        if (response.data === '') {
            setLoading(false);
        } else {
            setWallet(response.data.balance)
            setLoading(false);
        }
    };

    const editUser = () => {
        navigation.navigate('Chỉnh sửa tài khoản', { 'id': user.id })
    }

    const ChangePass = () => {
        navigation.navigate('Đổi mật khẩu', { 'id': user.id })
    }

    const Wallet = () => {
        navigation.navigate('Nạp tiền', { 'walletId': walletId })
    }

    const handleLogout = () => {
      
        logout(dispatch, token)

        navigation.navigate('Login');
    };

    const formattedAmount = (amount) => {
        if (amount) {
            return amount.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
            });
        }
        return '0 đ';
    };

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: COLOURS.white,
                position: 'relative',
            }}>
            <Spinner color='#00ff00' size={"large"} visible={isLoading} />
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


                }}>Thông tin tài khoản</Text>

            </View>
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
                                    fontSize: 20,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                    color: "green"
                                }}>
                                {user.name}
                            </Text>
                            <Text style={styles.text}>Địa chỉ: {user.address}</Text>

                            <Text style={styles.text}>Số điện thoại: {user.phone}</Text>
                            <Text style={styles.text}>Email: {user.email}</Text>
                            <Text style={styles.text}>Ví: {formattedAmount(wallet)}</Text>
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
                // padding: 10,
                // borderBottomWidth: 1,
                // borderBottomColor: 'black',
                // marginHorizontal: 10,
                marginTop: 30
            }}>
                <TouchableOpacity
                    onPress={() =>
                        Wallet()
                    }
                >
                    <Text style={{
                        marginLeft: 20,
                        color: 'orange',
                        fontWeight: '500',
                        letterSpacing: 1,
                    }}>Nạp tiền vào ví</Text>
                </TouchableOpacity>

            </View>
            <View style={{
                // padding: 10,
                // borderBottomWidth: 1,
                // borderBottomColor: 'black',
                // marginHorizontal: 10,
                marginTop: 30
            }}>
                <TouchableOpacity
                    onPress={() =>
                        ChangePass()
                    }
                >
                    <Text style={{
                        marginLeft: 20,
                        color: 'orange',
                        fontWeight: '500',
                        letterSpacing: 1,
                    }}>Đổi mật khẩu</Text>
                </TouchableOpacity>

            </View>

            <View style={{
                // padding: 10,
                // borderBottomWidth: 1,
                // borderBottomColor: 'black',
                // marginHorizontal: 10,
                marginTop: 30
            }}>
                <TouchableOpacity
                    onPress={() =>
                        handleLogout()
                    }
                >
                    <Text style={{
                        marginLeft: 20,
                        color: 'orange',
                        fontWeight: '500',
                        letterSpacing: 1,
                    }}>Đăng xuất</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default AccountClient

const styles = StyleSheet.create({
    text: {
        fontWeight: '500',
        letterSpacing: 1,
        marginStart: 10,
        fontSize: 16,
    }
})