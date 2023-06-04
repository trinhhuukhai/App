import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getAllCustomer } from '../../../redux/reducer/CustomerReducer';
import { getAllOrder, getPaymentTotal } from '../../../redux/reducer/OrderReducer';
import { getTotalStatic } from '../../../redux/reducer/StatisReducer';
import { getProduct, getProductByShop } from '../../../redux/reducer/ProductReducer';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '../../../assets';
import { useSelector } from 'react-redux';
import { COLOURS } from '../../../database/Database';


const HomeScreen = () => {

    const [isLoading, setLoading] = useState(false);
    const [cus, setCus] = useState(0);
    const [order, setOrder] = useState();
    const [total, setTotal] = useState(0);
    const [pro, setPro] = useState();
    const navigation = useNavigation();

    const auth = useSelector((state) => state.auth?.data);
    const shopId = auth?.shopId;
    const isFocused = useIsFocused()


    useEffect(() => {
        if (isFocused) {
            getCus();
            getOrder();
            getPro();
            getTotal();
        }

    }, [isFocused]);

    const getCus = async () => {
        setLoading(true);
        const response = await getAllCustomer(shopId);

        if (response === '') {
            setLoading(false);
            setCus(0)
        } else {
            setCus(response.count)
            setLoading(false);
        }
    };
    const getOrder = async () => {
        setLoading(true);
        const response = await getAllOrder(shopId);
        if (response === '') {
            setLoading(false);
        } else {
            setOrder(response.count)
            setLoading(false);
        }
    };
    const getTotal = async () => {

        setLoading(true);
        const response = await getPaymentTotal(shopId);
        
        if (response.data == "") {
            setTotal(0)
            setLoading(false);
        } else {
            let total = 0;

            if (Array.isArray(response.data)) {
                response.data.forEach(item => {
                    total += item.total;
                });
            }

            setTotal(total);
            setLoading(false);
        }
    };
  
    const getPro = async () => {
        setLoading(true);
        const response = await getProductByShop(shopId);

        if (response === '') {
            setLoading(false);
        } else {
            setPro(response.count)
            setLoading(false);
        }
    };

    const formattedAmount = (amount) => {
        if (amount || amount === 0) {
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
                flex: 1,
                backgroundColor: COLOURS.white,
                position: 'relative',
            }}>

            <View
                style={{
                    width: '100%',
                    // flexDirection: 'row',
                    paddingTop: 16,
                    paddingHorizontal: 16,
                    marginBottom: 15,
                    // justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Text style={{
                    // marginLeft: 60,
                    fontSize: 18,
                    color: COLOURS.black,
                    fontWeight: '500',
                    letterSpacing: 1,


                }}>Quản lý bán hàng</Text>

            </View>

            <Spinner color='#00ff00' size={"large"} visible={isLoading} />

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>
                <View style={{
                    backgroundColor: '#f9c2cc',
                    width: 150,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 8,
                    borderRadius: 8
                }}>
                    <Text style={{
                        fontWeight: '500',
                        letterSpacing: 1,
                    }}>Khách hàng: {cus}</Text>
                </View>
                <View style={{
                    backgroundColor: '#f9c2ff',
                    width: 150,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 8,
                    borderRadius: 8

                }}>
                    <Text style={{
                        fontWeight: '500',
                        letterSpacing: 1,
                    }}>Đơn hàng: {order}</Text>
                </View>
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>
                <View style={{
                    backgroundColor: '#f9c5af',
                    width: 150,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 8,
                    borderRadius: 8
                }}>
                    <Text style={{
                        fontWeight: '500',
                        letterSpacing: 1,
                    }}>Doanh thu:</Text>
                    <Text style={{
                        fontWeight: '500',
                        letterSpacing: 1,
                    }}> {formattedAmount(total)} </Text>
                </View>
                <View style={{
                    backgroundColor: '#f9c2af',
                    width: 150,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 8,
                    borderRadius: 8

                }}>
                    <Text style={{
                        fontWeight: '500',
                        letterSpacing: 1,
                    }}>Sản phẩm: {pro}</Text>
                </View>
            </View>


        </View>
    )
}

export default HomeScreen