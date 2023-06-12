import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../../assets';
import { COLOURS } from '../../../../database/Database';
import { changePassw } from '../../../../redux/reducer/AuthReducer';

const ChangePass = () => {
    const [loading, setLoading] = useState(false);
    // const [name, setName] = useState('');
    const [newPass, setNewpass] = useState('');
    const [comfirm, setConfirm] = useState('');
  
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
  
    const handldePost = () => {
      const newCat = {
        password: newPass,
      }
  
      changePassw(id, newCat)
  
  
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
            marginLeft: 70,
            fontSize: 18,
            color: COLOURS.black,
            fontWeight: '500',
            letterSpacing: 1,
  
  
          }}>Đổi mật khẩu</Text>
  
        </View>
  
        <View style={{
          padding: 20
        }}>
          <TextInput
            onChangeText={text => {
              setNewpass(text);
            }}
            style={{
              // backgroundColor:'red',
              height: 40,
              marginTop: 10,
              borderBottomWidth: 1,
              // color: 'red',
              // marginBottom: 30
            }}
  
            placeholder="Mật khẩu mới"
            secureTextEntry={true}
          />
          <TextInput
            onChangeText={text => {
              setConfirm(text);
            }}
            style={{
              // backgroundColor:'red',
              height: 40,
              marginTop: 10,
              borderBottomWidth: 1,
              // color: 'red',
              // marginBottom: 30
            }}
            secureTextEntry={true}
            placeholder="Nhập lại mật khẩu"
          />
        </View>
  
  
        <TouchableOpacity
          onPress={() => {
            handldePost()
            Alert.alert("Đổi mạt khẩu thành công")
            navigation.goBack()
          }}
          style={{
            backgroundColor: colors.primary,
            width: '60%',
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: 15,
            opacity: comfirm !== newPass ? 0.5 : 1, // disable button if confirm is not equal to newPass
            pointerEvents: comfirm !== newPass ? "none" : "auto" // prevent touch event if confirm is not equal to newPass
          }}
          disabled={comfirm !== newPass} // disable button if confirm is not equal to newPass
        >
          <Text style={{
            padding: 10,
            color: 'white',
            fontSize: 14
          }}>Lưu</Text>
        </TouchableOpacity>
      </View>
    )
  }

export default ChangePass

const styles = StyleSheet.create({})