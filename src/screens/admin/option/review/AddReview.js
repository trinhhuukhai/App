import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../../../assets'
import { addCategory } from '../../../../redux/reducer/CategoryReducer'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getAllCategory } from '../../../../redux/reducer/ProductReducer'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from '../../../../database/Database'
import { addReview } from '../../../../redux/reducer/ReviewReducer'
import { useSelector } from 'react-redux'
const AddReview = () => {

    const [content, setContent] = useState("")
    const navigation = useNavigation()
    const route = useRoute()
    const { proId } = route.params;
    const auth = useSelector((state) => state.auth?.data);
    const userId = auth?.id;

    const postReview = async () => {
        const newReview = {
          content,
          productId:proId,
          userId
        };
    
        await addReview(newReview);
        navigation.goBack()
      };


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


                }}>Thêm mới đánh giá</Text>

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
                    placeholder="Nội dung"
                />
                {/* <TextInput
                    onChangeText={(text) => {
                        setStar(text);
                    }}
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder="Sao"
                /> */}

            </View>


            <TouchableOpacity

                onPress={() => {

                    postReview()
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

const styles = StyleSheet.create({

    input: {
        backgroundColor: colors.lightGray,

        height: 50,
        padding: 10,
        height: 40,
        borderBottomWidth: 1,
        color: 'red',
        marginTop: 10,
        marginBottom: 20
    },

});

export default AddReview