import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from '../../../../database/Database';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import Spinner from 'react-native-loading-spinner-overlay';
import Icons from 'react-native-vector-icons/AntDesign';

import { getProductId } from '../../../../redux/reducer/ProductReducer';

import { deteleReview, getReviewByProduct } from '../../../../redux/reducer/ReviewReducer';
import { colors } from '../../../../assets';
import Start from '../../../../untilies/Start';
const ProductDetail = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { proId } = route.params;
    const [isLoading, setLoading] = useState(false);

    const [product, setProduct] = useState([]);

    const [productImg, setProductImg] = useState([]);
    const [review, setReview] = useState([]);
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

    useEffect(() => {
        if (isFocused) {
            getProduct();
            getReview()
        }

    }, [isFocused]);

    const getProduct = async () => {
        setLoading(true);
        const response = await getProductId(proId);

        if (response.data === '') {
            setProductImg([])
            setLoading(false);
        } else {
            setProduct(response.data);
            setProductImg(response.data.productImageList)
            setLoading(false);
        }
    };

    const getReview = async () => {
        setLoading(true);
        const response = await getReviewByProduct(proId);

        if (response.data === '') {
            setLoading(false);
        } else {
            setReview(response.data);
            setLoading(false);
        }
    };



    const renderItem = ({ item }) => {
        return (
            <View style={{
                marginTop: 5,
                marginRight: 10

            }}>
                <Image style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'cover',
                    borderRadius: 20,
                    // marginLeft: 10

                }}
                    source={{
                        uri: item.url
                    }}
                />

            </View>
        );
    };


    const renderItemReview = data => (
        <View style={{
            borderBottomColor: 'orange',
            borderBottomWidth: 1,
            zIndex: 10,
            backgroundColor: 'white',
            opacity: 10,
        }}>

            <View>
                <View
                    style={styles.rowFront}
                    underlayColor={colors.primary}
                >

                    <View>
                        <Text style={{
                            color: 'green',
                            fontSize: 18,
                            fontWeight: '500',
                            letterSpacing: 1,
                        }}>{data.item.content}</Text>
                        {/* <Start numberOfStar={data.item.rating} /> */}

                    </View>
                </View>
            </View>

        </View>
    );

    const deleteCat = (rowMap, rowKey) => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn xóa đánh gi này?',
            [
                { text: 'Hủy', onPress: () => console.log('Hủy') },
                { text: 'Xóa', onPress: () => handleDelete(rowKey) },
            ],
            { cancelable: false }
        );
    };

    const handleDelete = async (rowKey) => {
        const prevIndex = review.findIndex(item => item.id === rowKey);
        await deteleReview(rowKey);

        await getReview()
    };

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => {
                    closeRow(rowMap, data.item.id);
                    editReview(data.item.id)

                }}
            >
                <Icons name="edit" color="blue" size={20} />

            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => {
                    deleteCat(rowMap, data.item.id)
                }}
            >
                <Icons name="delete" color="red" size={20} />

            </TouchableOpacity>
        </View>
    );

    const addreview = () => {
        navigation.navigate("THEMDG", { proId: proId })
    }
    const editReview = (reviewId) => {
        navigation.navigate('SUADG', { id: reviewId });

    }

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


                }}>Chi tiết sản phẩm</Text>

            </View>
            <Spinner color='#00ff00' size={"large"} visible={isLoading} />

            <View style={{
                padding: 20
            }}>
                <Text style={{

                    fontSize: 16,
                    fontWeight: '500',
                    letterSpacing: 1,
                }}>{product.name}</Text>
                <Text style={styles.text}>Mô tả: {product.description}</Text>
                <Text style={styles.text}>Giá nhập: {formattedAmount(product.inputPrice)}</Text>
                <Text style={styles.text}>Giá bán: {formattedAmount(product.outputPrice)}</Text>
                <Text style={styles.text}>Số lượng: {product.inventory} chiếc</Text>
                <Text style={styles.text}>Đã bán: {product.sold} chiếc</Text>
                <View>
                    <Text style={styles.text}>Hình ảnh sản phẩm</Text>
                    <FlatList
                        horizontal={true}
                        data={productImg}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>


            </View>
            <View style={{
               
                marginHorizontal: 20,
            }}>
                <Text style={{
                    fontWeight: '500',
                    letterSpacing: 1,
                    fontSize: 16,
                }}>Đánh giá sản phẩm</Text>
                <View
                    style={{
                        marginVertical: 10,
                        borderWidth: 1,
                        borderColor: 'black',

                    }}
                />
            </View>
            <View style={{

                marginLeft: 20,
                marginRight: 20
            }}>
                <SwipeListView

                    data={review}
                    renderItem={renderItemReview}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-150}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}

                />
            </View>

            <View style={{
                position: 'absolute',
                bottom: 40,
                right: 20,

            }}
            >

                <Icon name={"plus-circle"} style={{
                    color: 'green',
                    fontSize: 45
                }}
                    onPress={() => addreview()}
                />
            </View>

        </View>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    rowFront: {
        // alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',

        // borderBottomWidth: 1,
        // justifyContent: 'center',
        // height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,


    },
    backRightBtnRight: {
        // backgroundColor: 'colors.primary',
        right: 0,
        // backgroundColor: 'red'
    },
    backRightBtnLeft: {
        // backgroundColor: 'blue',
        right: 75,
    },
    text: {
        fontWeight: '500',
        letterSpacing: 1,
    }
})