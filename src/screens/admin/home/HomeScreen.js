import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { getAllCustomer } from '../../../redux/reducer/CustomerReducer';
import { getAllOrder, getPaymentTotal } from '../../../redux/reducer/OrderReducer';
import { getTotalStatic } from '../../../redux/reducer/StatisReducer';
import { getProduct, getProductByShop } from '../../../redux/reducer/ProductReducer';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '../../../assets';
import { useSelector } from 'react-redux';

const HomeScreen = () => {

    const [isLoading, setLoading] = useState(false);
    const [cus, setCus] = useState();
    const [order, setOrder] = useState();
    const [total, setTotal] = useState();
    const [pro, setPro] = useState();
    const navigation = useNavigation();

    const auth = useSelector((state) => state.auth?.data);
    const shopId = auth?.shopId;

    useEffect(() => {
        getCus();
        getOrder();
        getPro();
        getTotal();
    }, []);

    const getCus = async () => {
        setLoading(true);
        const response = await getAllCustomer(shopId);
        
        if (response === '') {
            setLoading(false);
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

        if (response === '') {
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


    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <Spinner color='#00ff00' size={"large"} visible={isLoading} />

            <View style={{
                width: '100%',
                height: 50,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: 16
                }}>K Shop</Text>
            </View>


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
                }}>
                    <Text>Khách hàng: {cus}</Text>
                </View>
                <View style={{
                    backgroundColor: '#f9c2ff',
                    width: 150,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 8,

                }}>
                    <Text>Đơn hàng: {order}</Text>
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
                }}>
                    <Text>Doanh thu:</Text>
                    <Text> {total} VND</Text>
                </View>
                <View style={{
                    backgroundColor: '#f9c2af',
                    width: 150,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 8,

                }}>
                    <Text>Sản phẩm: {pro}</Text>
                </View>
            </View>


        </View>
    )
}

export default HomeScreen