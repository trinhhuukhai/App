import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid,
    StyleSheet,
    Button,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOURS, Items } from '../../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { deteleCart, editCart, getCartByUser, orderFormCart, paymentOrder } from '../../redux/reducer/CartReducer';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '../../assets';
import { getWalletById } from '../../redux/reducer/CustomerReducer';

const Payment = () => {
    const navigation = useNavigation();
    const route = useRoute();
    
    const { payment } = route.params;
    const auth = useSelector((state) => state.auth?.data);
    const token = auth?.token
    const total = payment.total
    const [wallet, setWallet] = useState(0)

    const walletId = payment.user.wallet.id;
    
    const isFocused = useIsFocused()

    const orderId = payment.id;
    const [message, setMsg] = useState()



    const handldePost = async () => {
        const newPay = {
            orderId: orderId,
        }
        const response = await paymentOrder(newPay,token)
        
        setMsg(response.message)

        // navigation.goBack()

    }

    const formattedAmount = (amount) => {
        if (amount) {
            return amount.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
            });
        }
        return '0 đ';
    };

    useEffect(() => {
        if (isFocused) {

            getWallet()
        }
    }, [isFocused]);

    const getWallet = async () => {
        const response = await getWalletById(walletId,token);

        if (response.data === '') {
        } else {
            setWallet(response.data.balance)
        }
    };

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
                    justifyContent: 'space-between',
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
                    // marginLeft: 40,
                    fontSize: 18,
                    color: COLOURS.black,
                    fontWeight: '500',
                    letterSpacing: 1,
                    marginRight: 50


                }}>Thanh toán đơn hàng</Text>



            </View>

            {
                message == "Thanh toán thành công" ?
                    <View style={{
                        padding: 20, marginBottom: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,


                    }}>

                        <Text style={{
                            fontWeight: '500',
                            letterSpacing: 1,
                            fontSize: 16
                        }}>Thanh toán thành công</Text>

                    </View>

                    :
                    <View style={{
                        padding: 20,
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            marginBottom: 10,
                            alignItems: 'center'
                        }}>
                            <Text style={styles.text}>Tổng tiền đơn hàng: {formattedAmount(total)}</Text>
                            <Text style={styles.text}>Số dư trong ví: {formattedAmount(wallet)}</Text>
                        </View>


                        {wallet >= total ? (
                            <TouchableOpacity
                                style={{
                                    // width: '86%',
                                    // height: '90%',


                                    height: 30,
                                    backgroundColor: COLOURS.blue,
                                    borderRadius: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => handldePost()}
                            >
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: '500',
                                        letterSpacing: 1,
                                        color: 'white',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Thanh toán
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <View>
                                <Text style={{
                                    color: 'orange',
                                    marginBottom: 10
                                }}>Số dư không đủ, vui lòng nạp thêm!!!</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('NT', { 'walletId': walletId })}
                                    style={{
                                        // width: '86%',
                                        // height: '90%',
                                        height: 30,
                                        backgroundColor: colors.primary,
                                        borderRadius: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}

                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: '500',
                                            letterSpacing: 1,
                                            color: COLOURS.white,
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        Nạp tiền
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
            }


        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 1,
    },
})