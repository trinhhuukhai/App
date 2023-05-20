import { View, Text, TextInput, TouchableOpacity,Alert } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../../../assets'
import { addCategory } from '../../../../redux/reducer/CategoryReducer'
import { useNavigation } from '@react-navigation/native'
import { getAllCategory } from '../../../../redux/reducer/ProductReducer'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from '../../../../database/Database'
const AddCategory = () => {

    const [name, setName] = useState("")
    const navigation = useNavigation()

    const handldePost = () => {
        const newCat = {
            name: name,
        }
        addCategory(newCat)

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


                }}>Thêm mới danh mục</Text>

            </View>

            <View style={{
                padding: 20
            }}>
                <TextInput
                    onChangeText={text => {
                        setName(text);
                    }}
                    style={{
                        // backgroundColor:'red',
                        height: 40,
                        marginTop: 10,
                        borderBottomWidth: 1,
                        // color: 'red',
                        // marginBottom: 30
                    }}
                    placeholder="Tên danh mục"
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

export default AddCategory