import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid,
    StyleSheet,
    FlatList
} from 'react-native';
import { COLOURS } from '../../../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { getOrderItemByOId } from '../../../redux/reducer/OrderReducer';
import moment from 'moment';


const OrderItemList = () => {
    const [isLoading, setLoading] = useState(false);
    const [orderItem, setOrderItem] = useState([])
    const navigation = useNavigation()
    const route = useRoute()
    const { list } = route.params;

    const [total, setTotal] = useState(0)
    const [tax, setTax] = useState(0)
    const isFocused = useIsFocused()

    const formattedAmount = (amount) => {
        if (amount) {
            return amount.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
            });
        }
        return '';
    };

    const formattedDate = (originalDate) => moment(originalDate).format('DD-MM-YYYY');


    // const product = list.product

    useEffect(() => {
        if (isFocused) {
            getData();
        }

    }, [isFocused]);

    const getData = async () => {
        const response = await getOrderItemByOId(list);

        if (response === '') {
            setOrderItem(null)
            setTax(0)
            setTotal(0)
            setLoading(false);
        } else {
            setOrderItem(response.data);
            let total = 0;

            if (Array.isArray(response.data)) {
                response.data.forEach(item => {
                    total += item.total;
                });
            }


            setTotal(total)
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View
                key={item.id}
                onPress={() => navigation.navigate('ProductInfo')}
                style={{
                    // width: '100%',
                    height: 140,
                    marginVertical: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20
                }}>
                <View
                    style={{
                        width: '30%',
                        height: 110,
                        padding: 14,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLOURS.backgroundLight,
                        borderRadius: 10,
                        marginRight: 22,
                    }}>
                    <Image style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'cover',

                    }}
                        source={{
                            uri: item.product.productImage
                        }}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        height: '100%',
                        // justifyContent: 'space-around',
                    }}>
                    <View style={{}}>
                        <Text
                            style={{
                                fontSize: 14,
                                maxWidth: '100%',
                                color: COLOURS.black,
                                fontWeight: '600',
                                letterSpacing: 1,
                            }}>
                            {item.product.name}
                        </Text>
                        <View
                            style={{
                                marginTop: 10,
                                // flexDirection: 'row',
                                // alignItems: 'center',
                                opacity: 0.6,
                            }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                    maxWidth: '85%',
                                    marginRight: 4,
                                }}>
                                Giá: {formattedAmount(item.price)}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                    maxWidth: '85%',
                                    marginRight: 4,
                                }}>
                                Size: {item.size}
                            </Text>

                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                    maxWidth: '85%',
                                    marginRight: 4,
                                }}>
                                Trạng thái: {item.status}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                    maxWidth: '85%',
                                    marginRight: 4,
                                }}>
                                {item.paymentStatus}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                    maxWidth: '85%',

                                    marginRight: 4,

                                }}>
                                Số lượng: {item.quantity}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '400',
                                    maxWidth: '85%',
                                    marginRight: 4,
                                    fontWeight: 'bold'
                                }}>
                                Tổng tiền: {formattedAmount(item.total)}
                            </Text>
                        </View>
                    </View>
                    {/* <View
                        style={{
                            // flexDirection: 'row',
                            // justifyContent: 'space-between',
                            // alignItems: 'center',
                            marginTop: 10
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>


                            <Text>Số lượng: {item.quantity}</Text>



                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>


                            <Text>Tổng tiền: {item.total} VND</Text>



                        </View>

                    </View> */}
                </View>
            </View>
        );
    };

    return (
        <View>
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
                        fontSize: 16,
                        color: COLOURS.black,
                        fontWeight: '500',
                        letterSpacing: 1,


                    }}>Chi tiết đơn hàng</Text>

                </View>
                <View style={{
                    borderWidth: 1,
                    // borderBottomColor:'',
                    width: '80%',
                    marginTop: 20,

                    alignSelf: 'center'
                }} />
                <Spinner color='#00ff00' size={"large"} visible={isLoading} />

                <FlatList
                    data={orderItem}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />

                <View
                    style={{
                        paddingHorizontal: 16,
                        // marginTop: 40,
                        marginBottom: 20,
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: COLOURS.black,
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginBottom: 20,
                        }}>Thông tin đơn hàng
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 8,
                        }}>
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '500',
                                letterSpacing: 1,
                                maxWidth: '80%',
                                color: COLOURS.black,
                                opacity: 0.5,
                            }}>
                            Giá trị đơn hàng
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '500',
                                letterSpacing: 1,
                                color: COLOURS.black,
                                opacity: 0.8,
                            }}>
                            {formattedAmount(total)}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 22,
                        }}>
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '500',
                                letterSpacing: 1,
                                maxWidth: '80%',
                                color: COLOURS.black,
                                opacity: 0.5,
                            }}>
                            Ship
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '500',
                                letterSpacing: 1,
                                color: COLOURS.black,
                                opacity: 0.8,
                            }}>
                            Free ship
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '500',
                                letterSpacing: 1,
                                maxWidth: '80%',
                                color: COLOURS.black,
                                opacity: 0.5,
                            }}>
                            Tổng tiền
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: '500',
                                letterSpacing: 1,
                                color: COLOURS.black,
                            }}>
                            {formattedAmount(total)}
                        </Text>
                    </View>
                </View>




            </View>

        </View>
    )
}

export default OrderItemList

const styles = StyleSheet.create({})