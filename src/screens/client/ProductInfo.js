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
  StyleSheet,
  ToastAndroid,
  Alert
} from 'react-native';
import { COLOURS, Items } from '../../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/AntDesign';

import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { getProductById } from '../../redux/reducer/ProductReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { addToCart, getCartByUser } from '../../redux/reducer/CartReducer';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { addReview, deteleReview, editReviewPro, getReviewByProduct } from '../../redux/reducer/ReviewReducer';
import { TextInput } from 'react-native-paper';
import Icons from 'react-native-vector-icons/AntDesign';
import { colors } from '../../assets';



const ProductInfo = () => {

  const route = useRoute();
  const navigation = useNavigation()
  const { productId } = route.params;

  const [count, setCount] = useState(0)
  const [isLoading, setLoading] = useState(true);

  const isFocused = useIsFocused()

  const auth = useSelector((state) => state.auth?.data);
  const userId = auth?.id;
  const token = auth?.token

  const [product, setProduct] = useState();
  const [imageList, setImageList] = useState([]);
  const [review, setReview] = useState([]);
  const [content, setContent] = useState("")
  const [contentEdit, setContentEdit] = useState("")
  const [sizePro, setSizePro] = useState([]);
  const [sizes, setSizes] = useState("");

  const [selectedReviewId, setSelectedReviewId] = useState(null);


  const [select, setSelect] = useState(false)

  const [edit, setEdit] = useState(false)

  const width = Dimensions.get('window').width;

  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);
  const [error, setError] = useState('');



  useEffect(() => {
    getData()
  }, [navigation]);



  const getData = async () => {
    setLoading(true);
    const response = await getProductById(productId);

    if (response === '') {
      setProduct([])
      setLoading(false);
    } else {
      setProduct(response.data);
      setImageList(response.data.productImageList)
      setSizePro(response.data.sizes)
      setLoading(false);
    }
  };


  useEffect(() => {
    getAllCat();
  }, [count]);

  const getAllCat = async () => {
    setLoading(true);
    const response = await getCartByUser(userId,token);
    if (response.data === '') {
      setCount(0)
      setLoading(false);
    } else {
      setCount(response.count);
      setLoading(false);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  const getReview = async () => {
    setLoading(true);
    const response = await getReviewByProduct(productId);
    if (response.data === '') {
      setReview([])
      setLoading(false);
    } else {
      setReview(response.data);
      setLoading(false);
    }
  };



  const postReview = async () => {
    if (content === '') {
      setError('Không được để trống !!!.');

    } else {
      const newReview = {
        content,
        productId,
        userId
      };

      await addReview(newReview);
      await getReview();
      setContent("");
      setError("")
    }

  };

  const handlePost = async () => {
    if (select == false) {
      Alert.alert('Lỗi', 'Vui lòng chọn size');
      return;
    }

    const newCat = {
      userId: userId,
      productId: productId,
      size: sizes,
    };

    await addToCart(newCat,token);

    setLoading(true);
    getAllCat();
  };

  const editReview = (id) => {
    setEdit(true)

  }

  const editReviewId = (reviewId) => {
    setSelect(reviewId);
  }

  const cancelEdit = () => {
    setEdit(false)
    setSelect(null);
  }

  const handleEdit = async (reviewId) => {
    const newReview = {
      content: contentEdit,
      productId,
      userId
    };

    await editReviewPro(reviewId, newReview);
    await getReview();
    setContentEdit("")
    setEdit(false)
  };

  const handleDelete = async (reviewId) => {
    await deteleReview(reviewId);
    await getReview();
  }

  const comfirmDelete = (id) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn xóa đánh giá này?',
      [
        { text: 'Hủy', onPress: () => console.log('Hủy') },
        { text: 'Xóa', onPress: () => handleDelete(id) },
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

  const renderProduct = ({ item }) => {
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
            uri: item.url
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

  const handleSizeChange = (sizeName) => {
    if (sizes === sizeName) {
      setSizes('');
      setSelect(false)
    } else {
      setSizes(sizeName);
      setSelect(true)
    }
  };


  const renderSize = ({ item }) => {
    const isSelected = item.sizeName === sizes;

    return (
      <View style={{ padding: 5 }}>
        <TouchableOpacity
          style={[
            styles.sizeButton,
            isSelected && styles.selectedSizeButton,
          ]}
          onPress={() => handleSizeChange(item.sizeName)}
        >
          <Text style={[styles.checkboxText, isSelected && styles.textChoose,]}>{item.sizeName}</Text>
        </TouchableOpacity>
      </View>
    );
  };


  const renderItem = ({ item }) => {
    return (
      <View style={{
        borderBottomColor: 'orange',
        borderBottomWidth: 1,
        padding: 20,
        marginHorizontal: 10,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <View>
            <Text style={{
              color: 'green',
              fontSize: 18,
              fontWeight: '500',
              letterSpacing: 1,
            }}>{item.user.name}</Text>
            {
              item.user.id === userId && item.id == select ?
                (
                  edit === false ?
                    <Text style={{
                      color: 'black',
                      fontSize: 14,
                      fontWeight: '500',
                      letterSpacing: 1,
                    }}>{item.content}</Text>
                    :
                    <View>
                      <TextInput
                        onChangeText={text => {
                          setContentEdit(text);
                        }}
                        style={{
                          height: 40,
                          marginTop: 10,
                          backgroundColor: 'white',
                          fontWeight: '500',
                          letterSpacing: 1,
                        }}
                        value={contentEdit}
                        placeholder="Đánh giá"
                      />
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5
                        // width:'50%'
                      }}>
                        <TouchableOpacity onPress={() => handleEdit(item.id)}>
                          <Text style={{
                            fontWeight: '500',
                            letterSpacing: 1,
                          }}>Lưu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => cancelEdit()}>
                          <Text style={{
                            fontWeight: '500',
                            letterSpacing: 1,
                          }}>Hủy</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                )
                :
                <Text style={{
                  color: 'black',
                  fontSize: 14,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>{item.content}</Text>
            }
          </View>

          {
            item.user.id == userId ?
              <View style={{
              }}>
                <TouchableOpacity style={{
                  marginBottom: 10
                }} onPress={() => { editReview(item.user.id), editReviewId(item.id) }}>
                  <Icons name="edit" color="blue" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => comfirmDelete(item.id)}>
                  <Icon name="delete" color="red" size={20} />
                </TouchableOpacity>
              </View>
              :
              null
          }
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
      <Spinner color='#00ff00' size={"large"} visible={isLoading} />

      <FlatList
        keyExtractor={(item) => item.key}
        data={[{ key: 'content' }]}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View>
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
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
                      fontWeight: '500',
                      letterSpacing: 1,
                    }}>
                    Mua sắm
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 14,
                  }}
                  onPress={() => navigation.navigate("GH")}
                >

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
                    top: 3,
                    color: 'black', fontWeight: '500',
                    letterSpacing: 1,
                  }}>{count}</Text>

                </TouchableOpacity>
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
                    fontWeight: '500',
                    letterSpacing: 1,
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
                    letterSpacing: 1,
                    maxWidth: '85%',
                    color: COLOURS.black,
                    marginBottom: 4,
                  }}>
                  {product?.outputPrice && formattedAmount(product?.outputPrice)}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLOURS.black,
                    fontWeight: '500',
                    letterSpacing: 1,
                    opacity: 0.5,
                    lineHeight: 20,
                    maxWidth: '85%',
                    maxHeight: 44,
                  }}>
                  {product?.description}
                </Text>
              </View>
              <View style={{
                flexDirection: 'row',

                alignItems: 'center',
                marginBottom: 18,

              }}>
                <Text style={{
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>Chọn size:</Text>
                <FlatList
                  data={sizePro}
                  renderItem={renderSize}
                  horizontal={true}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>

              <View>
                <Text style={{
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>Đánh giá sản phẩm</Text>
                <View style={{
                  height: 1,
                  backgroundColor: 'black',
                  marginVertical: 10
                }} />
              </View>

              <View style={{
                marginBottom: 10
              }}>
                <TextInput
                  onChangeText={text => {
                    setContent(text);
                  }}
                  value={content}
                  placeholder='Thêm đánh giá...'
                  style={{
                    fontWeight: '500',
                    letterSpacing: 1,
                  }}
                />
                <TouchableOpacity
                  style={{
                    // backgroundColor:'red',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    padding: 16,
                    zIndex: 2
                  }}
                  onPress={() => postReview()}
                >
                  <MaterialCommunityIcons
                    name="send"
                    style={{
                      fontSize: 23,

                    }}
                  />
                </TouchableOpacity>
              </View>
              <Spinner color='#00ff00' size={"large"} visible={isLoading} />
              {error ? <Text style={{
                color: 'red',
                marginBottom: 10,
                fontWeight: '500',
                letterSpacing: 1,
                marginTop: 5
              }}>{error}</Text> : null}

              <View style={{
                marginBottom: 80
              }}>
                <FlatList
                  data={review}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id.toString()}
                />
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
          // top:20
        }}>
        <TouchableOpacity
          onPress={() => handlePost()}
          // disabled={select == false}
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
const styles = StyleSheet.create({
  sizeButton: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
  },
  selectedSizeButton: {
    backgroundColor: colors.primary,

  },
  textChoose: {
    color: 'white', fontWeight: '500',
    letterSpacing: 1,
  },
  checkboxText: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1,
    color: 'black',
  },
});
export default ProductInfo;
