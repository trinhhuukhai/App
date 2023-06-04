import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TouchableHighlight, Alert, TextInput } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '../../../../assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SwipeListView } from 'react-native-swipe-list-view';
import { icons } from '../../../../constants';
import { deteleProduct, getProduct, getProductByCategory, getProductByShop } from '../../../../redux/reducer/ProductReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from '../../../../database/Database';
import { useSelector } from 'react-redux';
import Icons from 'react-native-vector-icons/AntDesign';

const Product = () => {
  const [isLoading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
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
    const response = await getProductByShop(shopId);

    if (response.data === '') {
      setLoading(false);
    } else {
      setProduct(response.data);
      setLoading(false);
    }
  };



  const deletePro = (rowMap, rowKey) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn xóa sản phẩm này?',
      [
        { text: 'Hủy', onPress: () => console.log('Hủy') },
        { text: 'Xóa', onPress: () => handleDelete(rowKey) },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (rowKey) => {
    const prevIndex = product.findIndex(item => item.id === rowKey);
    await deteleProduct(rowKey);

    getData()
  };

  const formattedAmount = (amount) => {
    if (amount) {
      return amount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
    }
    return '';
  };

  const editPro = (proId) => {
    // Navigate to the OrderDetail screen with the orderId
    navigation.navigate('SUASP', { id: proId });

  }

  const viewProductDetail = (proId) => {
    // Navigate to the OrderDetail screen with the orderId
    navigation.navigate('CTSP', { "proId": proId });

  }

  const addPro = () => {
    // Navigate to the OrderDetail screen with the orderId
    navigation.navigate('THEMSP');
  }

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const renderItem = data => (
    <TouchableOpacity style={{
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: 'orange',
      borderBottomWidth: 1,
      zIndex: 10,
      backgroundColor: 'white',
      opacity: 10,
      // width:"90%"

    }}
      onPress={() => viewProductDetail(data.item.id)}
    >
      <View style={{
        backgroundColor: 'white'
      }}>
        <Image style={{
          width: 100,
          height: 100,
          resizeMode: 'cover',
          borderRadius: 20,
          marginLeft: 10
          // marginRight: 10
        }}
          source={{
            uri: data.item.productImage
          }}
        />
      </View>
      <View>
        <View
          style={styles.rowFront}
          underlayColor={colors.primary}
        >

          <View>
            <Text
              numberOfLines={1} ellipsizeMode="tail"
              style={{
                color: 'green',
                fontSize: 18,
                fontWeight: '500',
                letterSpacing: 1,
              }}>{data.item.name}</Text>
            <Text style={{
              color: 'black',
              fontSize: 14,
              fontWeight: '500',
              letterSpacing: 1,
            }}>Số lượng: {data.item.inventory} chiếc</Text>
            <Text style={{
              color: 'black',
              fontSize: 14,
              fontWeight: '500',
              letterSpacing: 1,
            }}>Đã bán: {data.item.sold} chiếc</Text>
            <Text style={{
              color: 'black',
              fontSize: 14,
              fontWeight: '500',
              letterSpacing: 1,
            }}>
              Size: {Array.isArray(data.item.sizes) && data.item.sizes.map((i, index) => (
                <React.Fragment key={i.sizeName}>
                  {index !== 0 && ', '}
                  {i.sizeName}
                </React.Fragment>
              ))}
            </Text>

            <Text style={{
              color: 'black',
              fontSize: 14,
              fontWeight: '500',
              letterSpacing: 1,
            }}>Giá nhập: {formattedAmount(data.item.inputPrice)}</Text>
            <Text style={{
              color: 'black',
              fontSize: 14,
              fontWeight: '500',
              letterSpacing: 1,
            }}>Giá bán: {formattedAmount(data.item.outputPrice)}</Text>
          </View>
        </View>
      </View>

    </TouchableOpacity>
  );

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
          editPro(data.item.id)
          closeRow(rowMap, data.item.id);
        }}
      >
        <Icons name="edit" color="blue" size={30} />

      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          deletePro(rowMap, data.item.id)
          closeRow(rowMap, data.item.id);
        }}
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


        }}>Danh sách sản phẩm</Text>

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

          placeholder='Tên sản phẩm'
        />

      </View>

      <View style={{
        backgroundColor: colors.inactive,
        height: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
      }} />

      <SwipeListView

        data={product?.filter(item => item.name?.toLowerCase().includes(searchText.toLowerCase()) || JSON.stringify(item.name)?.toLowerCase().includes(searchText.toLowerCase()))}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-250}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
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
          onPress={() => addPro()}
        />
      </View>



    </View>
  )
}

export default Product

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
  inputView: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageInput: {
    width: 15,
    height: 15,
    alignSelf: 'center',
    position: 'absolute',
    top: 14,
    left: 10
  },
  textInput: {
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
  },
  // line: {
  //   backgroundColor: colors.inactive,
  //   height: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 10,
  // },
  lineItem: {
    backgroundColor: colors.primary,
    height: 1,
    marginTop: 10,
    alignSelf: 'center',
    width: "80%"
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  img: {
    color: colors.primary,
    fontSize: 20,
    marginRight: 10
  },
  img_dollar: {
    color: 'green',
    fontSize: 20,
    marginRight: 10
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  },


  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    // alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',

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
    top: "50%",
    width: 75,
    height: '20%'


  },
  backRightBtnRight: {
    // backgroundColor: 'colors.primary',
    right: 0,
    // backgroundColor: 'red'
  },
  backRightBtnLeft: {
    // backgroundColor: 'blue',
    right: 75,
    borderRightWidth: 1,
    // height:'20%'
  },
})
