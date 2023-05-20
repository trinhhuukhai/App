import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  ToastAndroid,
} from 'react-native';
import { COLOURS, Items } from '../../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getProductById } from '../../redux/reducer/ProductReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { addToCart, getCartByUser } from '../../redux/reducer/CartReducer';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { getReviewByProduct } from '../../redux/reducer/ReviewReducer';
import { TextInput } from 'react-native-paper';


const ProductInfo = () => {

  const route = useRoute();
  const navigation = useNavigation()
  const { id } = route.params;

  const [count, setCount] = useState(0)
  const [isLoading, setLoading] = useState(true);


  const auth = useSelector((state) => state.auth?.data);
  const userId = auth?.id;

  const [product, setProduct] = useState();
  const [imageList, setImageList] = useState([]);
  const [review, setReview] = useState([]);

  const width = Dimensions.get('window').width;

  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);

  useEffect(() => {
    getData()
    getReview()
  }, []);



  //get product data by productID

  // const getDataFromDB = async () => {
  //   for (let index = 0; index < Items.length; index++) {
  //     if (Items[index].id == id) {
  //       await setProduct(Items[index]);
  //       return;
  //     }
  //   }
  // };

  const getData = async () => {
    const response = await getProductById(id);

    if (response === '') {
      setLoading(false);
    } else {
      setProduct(response.data);
      setImageList(response.data.productImageList)
      setLoading(false);
    }
  };


  useEffect(() => {
    getAllCat();
  }, [count]);

  const getAllCat = async () => {
    setLoading(true);
    const response = await getCartByUser(userId);
    if (response.data === '') {
      setLoading(false);
    } else {
      setCount(response.count); // Set count based on cart items array length
      setLoading(false);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  const getReview = async () => {
    setLoading(true);

    const response = await getReviewByProduct(product.id);

    if (response.data === '') {
      setLoading(false);
    } else {
      setReview(response.data); // Set count based on cart items array length
      setLoading(false);
    }
  };

  const handlePost = async () => {
    const newCat = {
      userId: userId,
      productId: product.id
    }

    await addToCart(newCat); // Wait for addToCart to complete

    setLoading(true)
    getAllCat();
  }

  //product horizontal scroll product card
  const renderProduct = ({ item, index }) => {
    return (
      <View
        style={{
          width: width,
          height: 240,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{
            uri: 'http://192.168.43.199:8443/api/v1/getFile/f8249c906e8d4aacb946b91a5c43dda2.png'
          }}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };

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

          >
            <View>
              <Text style={{
                color: 'green',
                fontSize: 18,
                fontWeight: 'bold'
              }}>{item.user.name}</Text>
              <Text style={{
                color: 'black',
                fontSize: 14,
                fontWeight: 'bold'
              }}>{item.content}</Text>


            </View>
          </TouchableOpacity>



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
      <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />
      <ScrollView>
        <View
          style={{
            width: '100%',
            backgroundColor: COLOURS.backgroundLight,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 4,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 16,
              paddingLeft: 16,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLOURS.white,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <Spinner color='#00ff00' size={"large"} visible={isLoading} />

          <FlatList
            data={imageList ? imageList : null}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false },
            )}
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              marginTop: 32,
            }}>
            {imageList
              ? imageList.map((data, index) => {
                let opacity = position.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [0.2, 1, 0.2],
                  extrapolate: 'clamp',
                });
                return (
                  <Animated.View
                    key={index}
                    style={{
                      width: '16%',
                      height: 2.4,
                      backgroundColor: COLOURS.black,
                      opacity,
                      marginHorizontal: 4,
                      borderRadius: 100,
                    }}></Animated.View>
                );
              })
              : null}
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 4,
          }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>


            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 14,
              }}>
              <Entypo
                name="shopping-cart"
                style={{
                  fontSize: 18,
                  color: COLOURS.blue,
                  marginRight: 6,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.black,
                }}>
                Shopping
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 14,
              }}>

              <MaterialCommunityIcons
                name="cart"
                style={{
                  fontSize: 18,
                  color: 'red',
                  padding: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundLight,
                }}
              />
              <Text style={{
                position: 'absolute',
                right: 3,
                color: 'black'
              }}>{count}</Text>

            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              // marginVertical: 4,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                letterSpacing: 0.5,
                marginVertical: 4,
                color: COLOURS.black,
                maxWidth: '84%',
              }}>
              {product?.name}
            </Text>

          </View>


          <View
            style={{
              // paddingHorizontal: 16,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                maxWidth: '85%',
                color: COLOURS.black,
                marginBottom: 4,
              }}>
              {product?.outputPrice} VND
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.black,
                fontWeight: '400',
                letterSpacing: 1,
                opacity: 0.5,
                lineHeight: 20,
                maxWidth: '85%',
                maxHeight: 44,
                marginBottom: 18,
              }}>
              {product?.description}
            </Text>
          </View>
          <View>
            <Text>Đánh giá</Text>
            <View style={{
              height: 1,
              backgroundColor: 'black',
              marginVertical: 10
            }} />
          </View>

          <View>
            <TextInput
              placeholder='Thêm đánh giá...'
            />
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="send"
                style={{
                  fontSize: 22,
                  position:'absolute',
                  bottom:15,
                  right:20
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{
            marginBottom: 60
          }}>
            <FlatList
              data={review}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>


        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => handlePost()}

          style={{
            width: '86%',
            height: 50,
            backgroundColor: COLOURS.blue,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: COLOURS.white,
              textTransform: 'uppercase',
            }}>
            {product ? 'Thêm vào giỏ hàng' : 'Not Avialable'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductInfo;
