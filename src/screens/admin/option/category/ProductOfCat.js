import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '../../../../assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getProductByCategory } from '../../../../redux/reducer/ProductReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from '../../../../database/Database';
const ProductOfCat = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const { id } = route.params;
    getData(id);
  }, []);

  const getData = async (id) => {
    setLoading(true);
    const response = await getProductByCategory(id);
    // debugger
    if (response.data === '') {
      setLoading(false);
    } else {
      setProduct(response.data);
      setLoading(false);
    }
  };

  const ViewProduct = (id) => {
    // do something with id
    navigation.navigate('ProductDetail', { id });
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 0.5,
          marginTop: 5,
          marginLeft: index % 2 == 0 ? 10 : 0,
          marginRight: 10,
          marginBottom: 5,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'gray',
        }}
      >
        <TouchableOpacity onPress={() => ViewProduct(item.id)}>
          <View
            style={{
              marginHorizontal: 5,
              height: 50,
              padding: 5,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {item.name}
            </Text>
            {item.inventory <= 0 ? (
              <TouchableOpacity
                onPress={() => {
                  // do something to update the number of products
                }}
                style={{
                  backgroundColor: 'orange',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 5,
                }}
              >
                <Text style={{ color: 'white' }}>Update number of products</Text>
              </TouchableOpacity>
            ) : (
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                Ton kho: {item.inventory}
              </Text>
            )}
          </View>
        </TouchableOpacity>
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


        }}>Danh sách sản phẩm</Text>

      </View>
      <Spinner color="#00ff00" size="large" visible={loading} />
      <FlatList
        style={{
          marginTop: 5
        }}
        data={product}

        keyExtractor={item => item.id}

        renderItem={({ item, index }) => <View style={{

          borderBottomColor: 'orange',
          borderBottomWidth: 1,

          padding: 20,
          // marginVertical: 8,
          marginHorizontal: 16,

        }}>

          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', { 'list': item.orderItemList })}
            >
              {/* <View>
      <Text style={{
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold'
      }}>Ngày đặt hàng: {item.orderDate}</Text>
      <Text style={{
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'
      }}>Số tiền: {item.billInvoice} VND</Text>
      <Text style={{
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'
      }}>{item.status}</Text>
      <Text style={{
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'
      }}>{item.paymentStatus}</Text>


    </View> */}
              <View>

                <Text style={{
                  color: 'green',
                  fontSize: 18,
                  fontWeight: 'bold'
                }}>{item.name}</Text>
                <Text style={{

                  fontSize: 16,
                  fontWeight: 'bold'
                }}>Giá nhập: {item.inputPrice} VND</Text>

              </View>
              <Text style={{

                fontSize: 16,
                fontWeight: 'bold'
              }}>Giá bán: {item.outputPrice} VND</Text>
              <Text style={{

                fontSize: 16,
                fontWeight: 'bold'
              }}>Số lượng: {item.inventory} chiếc</Text>
              <Text style={{

                fontSize: 16,
                fontWeight: 'bold'
              }}>Đã bán: {item.sold} chiếc</Text>
            </TouchableOpacity>



          </View>


        </View>}
      />

    </View>
  );
};

export default ProductOfCat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    color: 'white',
    fontSize: 16,
  },
});
