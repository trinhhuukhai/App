import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '../../../../assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import { editCategory, getCategoryId } from '../../../../redux/reducer/CategoryReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from '../../../../database/Database';
import { editReviewPro, getReviewById } from '../../../../redux/reducer/ReviewReducer';
const EditReview = () => {

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("")
    const [productId, setProductId] = useState("")
    const [userId, setUserId] = useState("")

    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const isFocused = useIsFocused()



    useEffect(() => {
        if (isFocused) {
            getData(id);
        }

    }, [isFocused]);

    const getData = async (id) => {
        setLoading(true);
        const response = await getReviewById(id);
        
        if (response.data === '') {

            setLoading(false);
            setContent("");
            setUserId("")
            setProductId("")
        } else {
            setContent(response.data.content);
            setUserId(response.data.user.id)
            setProductId(response.data.product.id)
            setLoading(false);
        }
    };

    const handleEdit = async () => {
        setLoading(true)
        const newReview = {
          content,
          productId,
          userId
        };
    
        await editReviewPro(id, newReview)
        setLoading(false)
        navigation.goBack()

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

            </View>


            <TouchableOpacity

                onPress={() => {
                    handleEdit()
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