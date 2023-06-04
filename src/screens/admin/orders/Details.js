import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid,
    StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOURS, Items } from '../../../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { deteleCart, editCart, getCartByUser, orderFormCart } from '../../redux/reducer/CartReducer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '../../constants';

const Details = () => {
    const [isLoading, setLoading] = useState(false);
    const navigation = useNavigation()
    const route = useRoute()
    const { list } = route.params;
    // const product = list.product
    const formattedAmount = (amount) => {
        if (amount) {
          return amount.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          });
        }
        return '';
      };

    const renderProducts = (data, index) => {
        return (
            <TouchableOpacity
                key={data.id}
                style={{
                    width: '100%',
                    height: 100,
                    marginVertical: 6,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        width: '30%',
                        height: 100,
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
                            uri: data.product.productImage
                        }}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        height: '100%',
                        justifyContent: 'space-around',
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
                            {data.product.name}
                        </Text>
                        <View
                            style={{
                                marginTop: 4,
                                // flexDirection: 'row',
                                // alignItems: 'center',
                                opacity: 0.6,
                            }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '400',
                                    maxWidth: '85%',
                                    marginRight: 4,
                                }}>
                                Giá: {formattedAmount(data.product.outputPrice)}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '400',
                                    maxWidth: '85%',
                                    marginRight: 4,
                                }}>
                                Số lượng: {data.quantity}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '400',
                                    maxWidth: '85%',
                                    marginRight: 4,
                                }}>
                                Size: {data.size}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '400',
                                    maxWidth: '85%',
                                    marginRight: 4,
                                }}>
                                Tổng tiền: {formattedAmount(data.total)}
                            </Text>

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
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



                <View
                    style={{
                        paddingHorizontal: 16,
                        marginTop: 30,
                        marginBottom: 80,
                    }}>
                    {/* <Text
                        style={{
                            fontSize: 16,
                            color: COLOURS.black,
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginBottom: 20,
                        }}>Thông tin đơn hàng
                    </Text> */}
                    <View style={{ paddingHorizontal: 16, marginBottom: 0 }}>
                        {list ? renderProducts(list) : null}
                    </View>
                    

                </View>
            </View>

        </View>
    )
}

export default Details

const styles = StyleSheet.create({})