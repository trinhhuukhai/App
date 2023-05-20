import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SwipeListView } from 'react-native-swipe-list-view';
import { deteleProduct, getProduct, getProductByCategory } from '../../../../redux/reducer/ProductReducer';
import { useSelector } from 'react-redux';
import { colors } from '../../../constants';
import { icons } from '../../../constants';
import { COLOURS } from '../../../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { confirmOrderStatus, getAllOrder } from '../../../redux/reducer/OrderReducer';


const Orders = () => {

  const auth = useSelector((state) => state.auth?.data);
  const shopId = auth?.shopId;
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const [isLoading, setLoading] = useState(true);

  const navigation = useNavigation();
  const route = useRoute();
  const [searchText, setSearchText] = useState('')

  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);


  const getData = async () => {
    const response = await getAllOrder(shopId);

    if (response === '') {
      setLoading(false);
    } else {
      setOrder(response.data);

      setLoading(false);
    }
  };

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
    setSelectedFilter(null);
  };

  const selectFilter = (filter) => {
    setSelectedFilter(filter);
    setFilterVisible(false);
    getOrderByIdS(filter); // Filter the orders based on the selected status ID
  };


  // const viewItem = () =>{
  //     navigation.navigate('Chi tiết đơn hàng')
  // }


  const confirmOrder = (orderId) => {
    const newStatus = {
      status: "Đã xác nhận",
    }

    confirmOrderStatus(orderId, newStatus)
    getData()

  }

  const renderItem = ({ item }) => {
    return (
      <View style={{

        borderBottomColor: 'orange',
        borderBottomWidth: 1,

        padding: 20,
        // marginVertical: 8,
        marginHorizontal: 16,

      }}>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { 'list': item })}
          >
            <View>

              <Text style={{
                color: 'green',
                fontSize: 18,
                fontWeight: 'bold'
              }}>{item.order.user.name}</Text>
              <Text>{item.order.user.address}</Text>
              <Text>{item.order.user.phone}</Text>
              <Text>{item.status}</Text>
              <Text>{item.paymentStatus}</Text>
              <Text>Tổng tiền: {item.total} VND</Text>
              <Text>{item.orderDate}</Text>
            </View>
          </TouchableOpacity>



        </View>
        <View style={{
          marginTop: 10
        }}>
          {item.status == "Đang xử lý" ?
            <TouchableOpacity style={{
              // height: 30,
              backgroundColor: colors.success,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 8

            }}

              onPress={() => confirmOrder(item.id)}
            >

              <Text style={{
                color: 'white',
                fontWeight: 'bold'
              }}>Xác nhận</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={{
              // height: 30,
              backgroundColor: colors.success,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 8

            }}
              disabled={item.paymentStatus == 'Hoàn tiền' || item.paymentStatus =="Chưa thanh toán" || item.status == "Đã xác nhận" ? true : false}
             
            >
              {item.paymentStatus == 'Hoàn tiền' || item.status == "Đã xác nhận" || item.paymentStatus =="Chưa thanh toán" ? 
              <Text></Text>
              :
              <Text style={{
                color: 'white',
                fontWeight: 'bold'
              }}>Hoàn tiền</Text>
              }
              


            </TouchableOpacity>
          }




        </View>

      </View>
    );
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


        }}>Danh sách đơn hàng</Text>

      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',

        // alignContent:'center',
        // alignItems:'center'
      }}>
        <View style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: 'row',
          width: '80%'
        }}>
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

            placeholder='Trạng thái đơn hàng, thanh toán, ...'
          />

        </View>

        <View style={{

          alignSelf: 'center'
        }}>
          <TouchableOpacity onPress={toggleFilter}>
            <Icons name='filter-outline' size={46} style={{ marginRight: 20 }} />
          </TouchableOpacity>
        </View>
      </View>


      <View style={{
        backgroundColor: colors.inactive,
        height: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
      }} />

      {filterVisible && (
        <View style={styles.filterOptions}>
          <TouchableOpacity
            onPress={() => {
              selectFilter('0')

            }}
            style={[
              styles.filterOption,
              selectedFilter === '1' && styles.filterOptionSelected,
            ]}
          >
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectFilter('1')}
            style={[
              styles.filterOption,
              selectedFilter === '2' && styles.filterOptionSelected,
            ]}
          >
            <Text>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectFilter('2')}
            style={[
              styles.filterOption,
              selectedFilter === '3' && styles.filterOptionSelected,
            ]}
          >
            <Text>Deliving</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectFilter('3')}
            style={[
              styles.filterOption,
              selectedFilter === '4' && styles.filterOptionSelected,
            ]}
          >
            <Text>Delived</Text>
          </TouchableOpacity>
        </View>
      )}

      <Spinner color='#00ff00' size={"large"} visible={isLoading} />

      <FlatList
        data={order.filter(item => item.status?.toLowerCase().includes(searchText.toLowerCase()) || JSON.stringify(item.status)?.toLowerCase().includes(searchText.toLowerCase()))}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

export default Orders

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
  filterIcon: {
    // position: 'absolute',
    // top: 20,
    // right: 20,
  },
  filterOptions: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: '30%',
    right: 20,
    // bottom:0,
    zIndex: 1,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  filterOption: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  filterOptionSelected: {
    backgroundColor: '#ccc',
  },
  selectedFilter: {
    backgroundColor: '#ccc',
    padding: 10,
    marginTop: 20,
  },
  selectedFilterText: {
    fontWeight: 'bold',
  },
})