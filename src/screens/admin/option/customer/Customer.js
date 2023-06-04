import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '../../../../assets';
import { SwipeListView } from 'react-native-swipe-list-view';
import { deteleProduct, getProduct, getProductByCategory } from '../../../../redux/reducer/ProductReducer';
import { deleteCustomer, getAllCustomer } from '../../../../redux/reducer/CustomerReducer';
import { icons } from '../../../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from '../../../../database/Database';
import { useSelector } from 'react-redux';
import Icons from 'react-native-vector-icons/AntDesign';

const Customer = () => {

  const [isLoading, setLoading] = useState(false);
  const [customer, setCustomer] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const [searchText, setSearchText] = useState('')

  const auth = useSelector((state) => state.auth?.data);
  const shopId = auth?.shopId;
  const isFocused = useIsFocused()


  useEffect(() => {
    if (isFocused) {
      getData();
    }

  }, [isFocused]);

  const getData = async () => {
    setLoading(true);
    const response = await getAllCustomer(shopId);
    
    if (response == null) {
      setLoading(false);
      setCustomer([])
    } else {
      setCustomer(response.data);
      setLoading(false);
    }
  };

  const deleteCus = (rowMap, rowKey) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn xóa khách hàng này?',
      [
        { text: 'Hủy', onPress: () => console.log('Hủy') },
        { text: 'Xóa', onPress: () => handleDelete(rowKey) },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (rowKey) => {
    const prevIndex = customer.findIndex(item => item.id === rowKey);
    await deleteCustomer(rowKey);

    await getData()
  };

  const editCate = (catId) => {
    // Navigate to the OrderDetail screen with the orderId
    navigation.navigate('EDITTK', { id: catId });
  }

  const addCate = () => {
    // Navigate to the OrderDetail screen with the orderId
    navigation.navigate('ADDTK');
  }

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const renderItem = data => (

    <View style={styles.rowFront}>

      <View>

        <View>
          <Text style={{
            color: 'green',
            fontSize: 18,
            fontWeight: '500',
            letterSpacing: 1,
          }}>{data.item.customerName}</Text>
          <Text style={styles.text}>Số điện thoại: {data.item.phone}</Text>
          <Text style={styles.text}>Email: {data.item.email}</Text>
          <Text style={styles.text}>Địa chỉ: {data.item.address}</Text>

        </View>

      </View>

    </View>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      {/* <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => editCate(data.item.id)}
      >
        <Text style={styles.backTextWhite}>Sửa</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteCus(rowMap, data.item.id)}
      >
        <Icons name="delete" color="red" size={30} />

      </TouchableOpacity>
    </View>
  );
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


        }}>Danh sách khách hàng</Text>

      </View>
      <Spinner color='#00ff00' size={"large"} visible={isLoading} />


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

          placeholder='Tên khách hàng'
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

      {/* <FlatList
        data={customer.filter(item => item.name?.toLowerCase().includes(searchText.toLowerCase()) || JSON.stringify(item.name)?.toLowerCase().includes(searchText.toLowerCase()))}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      /> */}

      <SwipeListView

        data={customer.filter(item => item.customerName?.toLowerCase().includes(searchText.toLowerCase()) || JSON.stringify(item.customerName)?.toLowerCase().includes(searchText.toLowerCase()))}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-70}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />

      {/* <View style={{
        position: 'absolute',
        bottom: 40,
        right: 20,

      }}
      >

        <Icon name={"plus-circle"} style={{
          color: 'green',
          fontSize: 45
        }}
          onPress={() => addCate()}
        />
      </View> */}
    </View>
  )
}

export default Customer

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
  rowFront: {
    // alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomColor: 'orange',
    borderBottomWidth: 1,
    // justifyContent: 'center',
    // height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
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
  text: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1,
  }

})