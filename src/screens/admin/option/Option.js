import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { logout } from '../../../redux/action/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from '../../../database/Database';

const Option = () => {

    const navigation = useNavigation()

    const viewCate = () => {
        navigation.navigate("DM");
    }

    const viewPro = () => {
        navigation.navigate("SP");
    }

    const viewCus = () => {
        navigation.navigate("KH");
    }
    const viewAccount = () => {
        navigation.navigate("TKOPTION");
    }

    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth?.data);
    const token = auth.token

    const handleLogout = () => {

        logout(dispatch, token)

        navigation.navigate('Login');
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
                    marginLeft: 90,
                    fontSize: 18,
                    color: COLOURS.black,
                    fontWeight: '500',
                    letterSpacing: 1,


                }}>Tùy chọn</Text>

            </View>
            {/* <View style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                marginHorizontal: 10
            }}>
                <TouchableOpacity
                    onPress={() => { viewCate() }}
                >
                    <Text style={{
                        marginLeft: 20,

                    }}>Danh mục</Text>
                </TouchableOpacity>

            </View> */}

            <View style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                marginHorizontal: 10
            }}>
                <TouchableOpacity onPress={() => { viewPro() }}>
                    <Text style={{
                        marginLeft: 20,
                        fontWeight: '500',
                        letterSpacing: 1,

                    }}>Sản Phẩm</Text>
                </TouchableOpacity>

            </View>

            <View style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                marginHorizontal: 10
            }}>
                <TouchableOpacity onPress={() => { viewCus() }}>
                    <Text style={{
                        marginLeft: 20,
                        fontWeight: '500',
                        letterSpacing: 1,

                    }}>Danh sách khách hàng</Text>
                </TouchableOpacity>

            </View>
            <View style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                marginHorizontal: 10
            }}>
                <TouchableOpacity onPress={() => { viewAccount() }}>
                    <Text style={{
                        marginLeft: 20,
                        fontWeight: '500',
                        letterSpacing: 1,

                    }}>Thông tin cá nhân</Text>
                </TouchableOpacity>

            </View>



            <View style={{
                padding: 10,

                marginHorizontal: 10,
                marginTop: 30
            }}>
                <TouchableOpacity
                    onPress={() =>
                        handleLogout()
                    }
                >
                    <Text style={{
                        marginLeft: 20,
                        color: 'orange',
                        fontWeight: '500',
                        letterSpacing: 1,
                    }}>Đăng xuất</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default Option