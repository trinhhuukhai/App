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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLOURS } from '../../../database/Database';
import { colors } from '../../../assets';


const PaymentOrder = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { order } = route.params;
    const total = order.billInvoice
    const wallet =  order.user.wallet.balance
    const [message, setMsg] = useState()

    
   


    // const handldePost = async () => {
    //     const newPay = {
    //         orderId: orderId,
    //     }
    //     const response = await paymentOrder(newPay)
    //     setMsg(response.message)
        
       

    // }


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
                    justifyContent: 'space-around',
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
                    marginRight:30


                }}>Thanh toán đơn hàng</Text>

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
                        <Text style={styles.text}>Tổng tiền đơn hàng: {total} VND</Text>
                        <Text style={styles.text}>Số dư trong ví: {wallet} VND</Text>
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
                            // onPress={() => handldePost()}
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

export default PaymentOrder

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    },
})