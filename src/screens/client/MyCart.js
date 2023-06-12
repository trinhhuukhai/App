import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  FlatList,
  StyleSheet,
  Alert
} from 'react-native';
import { COLOURS, Items } from '../../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { deteleCart, editCart, getCartByUser, orderFormCart } from '../../redux/reducer/CartReducer';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '../../constants';


const MyCart = () => {

  const auth = useSelector((state) => state.auth?.data);
  const userId = auth?.id;
  const token = auth?.token

  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [isLoading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState('')
  const isFocused = useIsFocused()


  const [payment, setPayment] = useState([])



  useEffect(() => {
    if (isFocused) {
      getAllCat();
    }
  }, [isFocused]);

  const getAllCat = async () => {
    setLoading(true);
    const response = await getCartByUser(userId,token);

    if (response.data === '') {
      setCart(null);
      setTax(0);
      setTotal(0);
      setLoading(false);
    } else {
      setCart(response.data);
      let total = 0;

      if (Array.isArray(response.data)) {
        response.data.forEach(item => {
          total += item.price * item.quantity;
        });
      }

      setTax(total * 0.05);
      setTotal(total);
      setLoading(false);
    }
  };

  const handldePlus = async (id, quantity) => {
    try {
      let newCount = quantity + 1;

      const changeQ = {
        quantity: newCount,
      };

      await editCart(id, changeQ,token);
      setQuantity(newCount); // Update quantity state variable
      await getAllCat();

    } catch (error) {
      console.log(error);
    }
  };

  const changeSize = async (id, sizeName) => {

    const changesize = {
      size: sizeName,
    };

    await editCart(id, changesize,token);
    await getAllCat();

  };

  const handldeMinus = async (id, quantity) => {
    let newCount = quantity - 1;

    const changeQ = {
      quantity: newCount,
    };

    if (newCount === 0) {
      await deteleCart(id,token);
      await getAllCat();
    } else {
      await editCart(id, changeQ,token);
      setQuantity(newCount);
      await getAllCat();
    }

  };

  const navigation = useNavigation();

  const handleOrder = async () => {
    try {
      const newData = {
        userId: userId,
      };

      const response = await orderFormCart(newData, token);
      setPayment(response.data);

      // Navigate to the payment screen
      navigation.navigate('Pay', { "payment": response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteC = async (id) => {
    await deteleCart(id,token)
    await getAllCat()
  }

  const comfirmDelete = (id) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn xóa sản phẩm này?',
      [
        { text: 'Hủy', onPress: () => console.log('Hủy') },
        { text: 'Xóa', onPress: () => deleteC(id) },
      ],
      { cancelable: false }
    );
  };
  const formattedAmount = (amount) => {
    if (amount) {
      return amount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
    }
    return '0 đ';
  };
  const renderItem = ({ item }) => {
    return (
      <View
        key={item.id}

        style={{
          height: 120,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20
        }}>

        <View
          style={{
            width: '30%',
            height: 100,
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOURS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
          }}>
          <Image style={{
            width: 100,
            height: 100,
            resizeMode: 'cover',
          }}
            source={{
              uri: item.product.productImage
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                maxWidth: '100%',
                color: COLOURS.black,
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              {item.product.name}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  letterSpacing: 1,
                  maxWidth: '85%',
                  marginRight: 4,
                  marginBottom: 5
                }}>
                {formattedAmount(item.product.outputPrice)}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 10 }}>Size:</Text>
              {Array.isArray(item.product.sizes) && item.product.sizes.map((i) =>
                <TouchableOpacity style={{
                  padding: 4,
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: 'gray',
                  marginRight: 5,
                  backgroundColor: item.size == i.sizeName ? "green" : 'white',
                }}
                  key={i.id}
                  onPress={() => changeSize(item.id, i.sizeName)}
                >
                  <Text style={{
                    fontWeight: '500',
                    letterSpacing: 1,
                    color: item.size == i.sizeName ? "white" : 'black',
                  }}>{i.sizeName}</Text>
                </TouchableOpacity>
              )}

            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5
            }}>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>

              <TouchableOpacity
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}
                onPress={() => handldeMinus(item.id, item.quantity)}
              >
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </TouchableOpacity>


              <Text style={{
                fontWeight: '500',
                letterSpacing: 1,
              }}>{item.quantity}</Text>

              <TouchableOpacity
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}
                onPress={() => handldePlus(item.id, item.quantity)}
              >
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </TouchableOpacity>


            </View>
            <TouchableOpacity onPress={() => comfirmDelete(item.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
                  backgroundColor: COLOURS.backgroundLight,
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };


  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
      }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[{ key: 'content' }]}
        keyExtractor={(item) => item.key}
        renderItem={() => (
          <View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                paddingTop: 16,
                paddingHorizontal: 16,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => navigation.navigate("SPCUSTOMER")}>
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
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: '400',
                }}>
                Giỏ hàng
              </Text>
              <View></View>
            </View>
            <Text
              style={{
                fontSize: 20,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
                paddingTop: 20,
                paddingLeft: 16,
                marginBottom: 10,
              }}>
              My Cart
            </Text>
            <Spinner color='#00ff00' size={"large"} visible={isLoading} />

            {/* <View style={{ paddingHorizontal: 16 }}>
          {cart ? renderProducts(cart) : null}
        </View> */}

            <FlatList
              data={cart}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />




            <View
              style={{
                paddingHorizontal: 16,
                // marginVertical: 10,
              }}>

              <View
                style={{
                  paddingHorizontal: 16,
                  marginTop: 40,
                  marginBottom: 80,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLOURS.black,
                    fontWeight: '500',
                    letterSpacing: 1,
                    marginBottom: 20,
                  }}>Thông tin đơn hàng
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      letterSpacing: 1,
                      maxWidth: '80%',
                      color: COLOURS.black,
                      opacity: 0.5,
                    }}>
                    Giá trị đơn hàng
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      letterSpacing: 1,
                      color: COLOURS.black,
                      opacity: 0.8,
                    }}>
                    {formattedAmount(total)}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 22,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      letterSpacing: 1,
                      maxWidth: '80%',
                      color: COLOURS.black,
                      opacity: 0.5,
                    }}>
                    Ship
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      letterSpacing: 1,
                      color: COLOURS.black,
                      opacity: 0.8,
                    }}>
                    Free ship
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      letterSpacing: 1,
                      maxWidth: '80%',
                      color: COLOURS.black,
                      opacity: 0.5,
                    }}>
                    Tổng tiền
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '500',
                      letterSpacing: 1,
                      color: COLOURS.black,
                    }}>
                    {formattedAmount(total)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {!cart ? <TouchableOpacity
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: colors.primary,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          disabled={true}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: 'white',
              textTransform: 'uppercase',
            }}
          >
            Giỏ hàng trống
          </Text>
        </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={() =>
              handleOrder()
            }
            style={{
              width: '86%',
              height: '90%',
              backgroundColor: COLOURS.blue,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disabled={cart == null}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                letterSpacing: 1,
                color: COLOURS.white,
                textTransform: 'uppercase',
              }}
            >
              Đặt hàng
            </Text>
          </TouchableOpacity>
        }


      </View>
    </View>
  );
};

export default MyCart;
