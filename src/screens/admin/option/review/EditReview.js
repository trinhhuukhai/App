import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '../../../../assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import { editCategory, getCategoryId } from '../../../../redux/reducer/CategoryReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from '../../../../database/Database';
import { getReviewById } from '../../../../redux/reducer/ReviewReducer';
const EditReview = () => {

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("")
    const [start, setStar] = useState("")

    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    useEffect(() => {

        getData(id);
    }, []);

    const getData = async (id) => {
        setLoading(true);
        const response = await getReviewById(id);
        
        if (response.data === '') {
            setLoading(false);
        } else {
            setContent(response.data.content);
            setStar(response.data.rating);
            setLoading(false);
        }
    };

    const handldePost = () => {
        const newCat = {
            name: name,
        }

        editCategory(id, newCat)


    }

    const viewCate = () => {
        // Navigate to the OrderDetail screen with the orderId
        navigation.navigate('Danh Mục');
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


                }}>Sửa đánh giá</Text>

            </View>

            <View style={{
                padding: 20
            }}>
                <TextInput
                    onChangeText={text => {
                        setContent(text);
                    }}
                    style={{
                        // backgroundColor:'red',
                        height: 40,
                        marginTop: 10,
                        borderBottomWidth: 1,
                        // color: 'red',
                        // marginBottom: 30
                    }}
                    value={content}
                    placeholder="Nội dung"
                />
                <TextInput
                    onChangeText={text => {
                        setStar(text);
                    }}
                    style={{
                        // backgroundColor:'red',
                        height: 40,
                        marginTop: 10,
                        borderBottomWidth: 1,
                        // color: 'red',
                        // marginBottom: 30
                    }}
                    value={start}
                    keyboardType='numeric'
                    placeholder="Sao"

                />

            </View>


            <TouchableOpacity

                onPress={() => {

                    handldePost()
                    Alert.alert("thanh cong")
                    navigation.goBack()
                }}
                style={{
                    backgroundColor: colors.primary,

                    width: '60%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderRadius: 15
                }}>
                <Text style={{
                    padding: 10,
                    color: 'white',
                    fontSize: 14
                }}>Lưu</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EditReview