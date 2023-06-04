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
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '../../assets';

const Payment = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { payment } = route.params;
    const total = payment.data.total
    const wallet = payment.data.user.wallet.balance;
    const orderId = payment.data.id;
    const [message, setMsg] = useState()


    const handldePost = async () => {
        const newPay = {
            orderId: orderId,
        }
        const response = await paymentOrder(newPay)
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
        return '';
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
                <Text
                    style={{
                        fontSize: 14,
                        color: COLOURS.black,
                        fontWeight: '400',
                    }}>

                </Text>

            </View>

            {message == "Payment success" ?
                <View style={{
                    padding: 20, marginBottom: 10,
                    alignItems: 'center',

                }}>

                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>Thanh toán thành công</Text>

                </View>

                :
                <View style={{
                    padding: 20
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
                                onPress={() => navigation.navigate("Nạp tiền")}
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