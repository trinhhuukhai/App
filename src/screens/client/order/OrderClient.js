import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SwipeListView } from 'react-native-swipe-list-view';
import { deteleProduct, getProduct, getProductByCategory } from '../../../../redux/reducer/ProductReducer';
import { useSelector } from 'react-redux';
import { colors } from '../../../constants';
import { icons } from '../../../constants';
import { getOrderByIdUser } from '../../../redux/reducer/CustomerReducer';
import { COLOURS } from '../../../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { cancelOrder } from '../../../redux/reducer/OrderReducer';


const OrderClient = () => {

    const auth = useSelector((state) => state.auth?.data);
    const userId = auth?.id;

    useEffect(() => {
        getData();
    });

    const [isLoading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [orderItem, setOrderItem] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const [count, setCount] = useState(0)
    const [searchText, setSearchText] = useState('')
    const [status, setStatus] = useState('Huỷ đơn hàng')


    const getData = async () => {
        const response = await getOrderByIdUser(userId);
      
        if (response === '') {
            setLoading(false);
        } else {
            setOrder(response.data);
            setCount(response.count)
            setLoading(false);
        }
    };

    const cancel = (orderId) => {
        cancelOrder(orderId, status)
        getData()
    
      }

    // const viewItem = () =>{
    //     navigation.navigate('Chi tiết đơn hàng')
    // }

    const renderItem = ({ item }) => {
        return (
            <View style={{

                borderBottomColor: 'orange',
                borderBottomWidth: 1,

                padding: 20,
                // marginVertical: 8,
                marginHorizontal: 16,

            }}>

                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Chi tiết đơn hàng', { 'list': item.id })}
                    >
                        <View>
                            <Text style={{
                                color: 'green',
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>Ngày đặt hàng: {item.orderDate}</Text>
                            <Text style={{
                                color: 'black',
                                fontSize: 14,
                                fontWeight: 'bold'
                            }}>Số tiền: {item.total} VND</Text>
                            <Text style={{
                                color: 'black',
                                fontSize: 14,
                                fontWeight: 'bold'
                            }}>{item.status}</Text>
                            <Text style={{
                                color: 'black',
                                fontSize: 14,
                                fontWeight: 'bold'
                            }}>{item.paymentStatus}</Text>

                        </View>
                    </TouchableOpacity>



                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 10
                }}>
                    <TouchableOpacity style={{
                        // height: 30,
                        backgroundColor: colors.success,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 8

                    }}
                        onPress={() => navigation.navigate('Thanh toán',{"order":item})}
                        disabled={item.status == "Huỷ đơn hàng" || item.paymentStatus == "Đã thanh toán" || item.paymentStatus == "Hoàn tiền"}
                    >
                        <Text style={{
                            color: 'white'
                        }}>Thanh toán</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        // height: 30,
                        backgroundColor: colors.primary,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 8
                    }}
                    disabled={item.status == "Huỷ đơn hàng"}
                    onPress={() => cancel(item.id)}
                    >
                        <Text style={{
                            color: 'white'
                        }}>Hủy đơn hàng</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
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


                }}>Danh sách đơn hàng</Text>

            </View>
            <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    tintColor='black' //mau logo
                    source={icons.icon_search}
                    style={{
                        width: 15,
                        height: 15,
                        // backgroundColor:'red',
                        alignSelf: 'center',
                        position: 'absolute',
                        top: 14,
                        left: 10
                    }}
                />
                <TextInput
                    onChangeText={(text) => {
                        setSearchText(text)
                    }}
                    autoCorrect={false}
                    style={{
                        // backgroundColor: colors.inactive,
                        borderWidth: 1,
                        height: 46,
                        flex: 1,
                        marginEnd: 5,
                        borderRadius: 5,
                        opacity: 0.4,
                        padding: 10,
                        paddingStart: 30,
                        color: 'black',
                        fontWeight: 'bold'
                    }}

                    placeholder='Trạng thái đơn hàng, thanh toán, ...'
                />

            </View>

            <View style={{
                backgroundColor: colors.inactive,
                height: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10
            }} />

            <Spinner color='#00ff00' size={"large"} visible={isLoading} />

            <FlatList
                data={order.filter(item => item.status?.toLowerCase().includes(searchText.toLowerCase()) || JSON.stringify(item.status)?.toLowerCase().includes(searchText.toLowerCase()))}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

export default OrderClient

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: 50,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeader: {
        color: 'white',
        fontSize: 16
    },
})