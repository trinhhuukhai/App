import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  StyleSheet
} from 'react-native';
import { COLOURS, Items } from '../../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAllCategory } from '../../redux/reducer/CategoryReducer';
import Spinner from 'react-native-loading-spinner-overlay';
import { getAllProduct, getProductByCategory, getProductSold } from '../../redux/reducer/ProductReducer';
import { colors } from '../../assets';
import { icons } from '../../constants';
import { addToCart, getCartByUser } from '../../redux/reducer/CartReducer';
import { useSelector } from 'react-redux';

const Home = () => {


  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchText, setSearchText] = useState('')
  const [count, setCount] = useState(0)
  const [isLoading, setLoading] = useState(false);
  const [catIndex, setCatIndex] = useState(0)
  const [data, setData] = useState([]);
  const [selectedButton, setSelectedButton] = useState('all');

  const auth = useSelector((state) => state.auth?.data);
  const userId = auth?.id;

  const route = useRoute();
  // const { count1 } = route.params;
  // debugger
  //get called on screen loads
  const navigation = useNavigation();



  const getData = async () => {
    setLoading(true);
    const response = await getAllProduct();

    if (response.data === '') {
      setLoading(false);
    } else {
      setProduct(response.response);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataCat();
    getData()
  }, []);

  const getDataCat = async () => {
    setLoading(true);
    const response = await getAllCategory();

    if (response.data === '') {
      setLoading(false);
    } else {
      setCategory(response);

      setLoading(false);
    }
  };

  const getSold = async () => {
    setLoading(true);
    const response = await getProductSold();
    if (response.data === '') {
      setLoading(false);
    } else {
      setProduct(response);
      setSelectedButton('sold');
      setCatIndex(0)
      setLoading(false);
    }
  };

  const viewProduct = async (id) => {
    setLoading(true);
    const response = await getProductByCategory(id);

    if (response.data === '') {
      setLoading(false);
      setProduct([])
    } else {
      setProduct(response.data);
      setLoading(false);
    }
  };
  const handlePost = async (proID) => {
    const newCat = {
      userId: userId,
      productId: proID
    }

    await addToCart(newCat); // Wait for addToCart to complete

    setLoading(true)
    getAllCat();
  }


  useEffect(() => {
    getAllCat();
  },[]);

  const getAllCat = async () => {
    // setLoading(false);
    const response = await getCartByUser(userId);

    if (response.data === '') {
      setLoading(false);
    } else {
      setCount(response.count); // Set count based on cart items array length
      setData(response)
      setLoading(false);
    }
  };



  const viewPro = () => {
    setLoading(true);
    getData()
    setCatIndex(0)
    setSelectedButton('all');
    setLoading(false);

  };

  const viewCart = () => {
    navigation.navigate("Giỏ Hàng")
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
      }}>
      <Spinner color='#00ff00' size={"large"} visible={isLoading} />

      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 6,
        }}>
        <TouchableOpacity>
          {/* <Entypo
            name="shopping-bag"
            style={{
              fontSize: 18,
              color: COLOURS.backgroundMedium,
              padding: 12,
              borderRadius: 10,
              backgroundColor: COLOURS.backgroundLight,
            }}
          /> */}
          <View
            style={{
              // marginBottom: 5,
              // padding: 16,
            }}>
            <Text
              style={{
                fontSize: 26,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 10,
              }}>
              K Shop
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.black,
                fontWeight: '400',
                letterSpacing: 1,
                lineHeight: 24,
              }}>
              Thời trang giới trẻ. Mặc vào là chất
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => viewCart()}>
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
        </TouchableOpacity>
      </View>



      <View style={{
        backgroundColor: 'black',
        height: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
      }} />
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
      <ScrollView>
        <View style={{
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <TouchableOpacity style={{
            // borderColor: 'red',
            borderWidth: 1,
            marginRight: 10,
            padding: 10,
            borderRadius: 20,
            alignItems: 'center',
            borderColor: selectedButton == 'all' ? 'green' : 'red',


          }}
            onPress={viewPro}

          >
            <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Tất cả sản phẩm</Text>

          </TouchableOpacity>
          <TouchableOpacity style={{

            borderColor: selectedButton == 'sold' ? 'green' : 'red',
            borderWidth: 1,
            marginRight: 10,
            padding: 10,
            borderRadius: 20,
            alignItems: 'center'

          }}
            onPress={() => getSold()}
          >
            <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Sản phẩm bán chạy</Text>

          </TouchableOpacity>

        </View>
        <View>
          <FlatList
            horizontal={true}
            keyExtractor={(item) => item.id.toString()}
            data={category}
            renderItem={({ item }) => {
              return <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Spinner color='#00ff00' size={"large"} visible={isLoading} />

                <TouchableOpacity style={{
                  width: 200,
                  borderColor: catIndex == item.id ? 'green' : 'red',
                  borderWidth: 1,
                  marginRight: 10,
                  padding: 5,
                  borderRadius: 20,
                  alignItems: 'center'

                }}
                  key={item.id}
                  // activeOpacity={0.8}

                  onPress={() => {
                    viewProduct(item.id),
                      setCatIndex(item.id)
                    setSelectedButton('')
                  }}
                >
                  <Text style={
                    [styles.cateText,
                    catIndex == item.id && styles.catSelected,]

                  }>{item.name}</Text>

                </TouchableOpacity>

              </View>
            }}
          >



          </FlatList>
        </View>


        <View style={{
          backgroundColor: colors.inactive,
          height: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10
        }} />
        <View
          style={{
            padding: 12,
          }}>
          <Spinner color="#00ff00" size="large" visible={isLoading} />

          <FlatList
            data={product?.filter(item => item.name?.toLowerCase().includes(searchText.toLowerCase()) || JSON.stringify(item.name)?.toLowerCase().includes(searchText.toLowerCase()))}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}

            renderItem={({ item, index }) => <TouchableOpacity style={{
              flex: 0.5,
              marginTop: 5,
              marginLeft: index % 2 == 0 ? 10 : 0,
              marginRight: 10,
              marginBottom: 5,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'gray',
              backgroundColor: COLOURS.backgroundLight,

              padding: 5


            }}
              onPress={() => navigation.navigate("Chi tiết sản phẩm", { "id": item.id })}
            >

              <View style={{
                alignItems: 'center',
                marginVertical: 20
              }}>

                <Image style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'cover',
                }}
                  source={{
                    uri: 'http://192.168.43.199:8443/api/v1/getFile/f8249c906e8d4aacb946b91a5c43dda2.png'
                  }}
                />
              </View>
              <Text numberOfLines={1} ellipsizeMode="tail" style={{
                fontWeight: 'bold',
                fontSize: 16,

                // alignSelf:'center',
              }}>{item.name}</Text>
              <Text style={{
                // fontSize: 16,

              }}>Đã bán: {item.sold}</Text>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10
              }}>

                <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold'
                }}>{item.outputPrice}</Text>


                <TouchableOpacity style={{
                  height: 25,
                  width: 25,
                  backgroundColor: COLOURS.green,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                  onPress={() => handlePost(item.id)}
                >
                  <Text style={{
                    fontSize: 16,
                    color: COLOURS.white,
                    fontWeight: 'bold'
                  }}>+</Text>
                </TouchableOpacity>


              </View>
            </TouchableOpacity>}
          ></FlatList>

        </View>
      </ScrollView>


    </View>
  )
};

const styles = StyleSheet.create({
  cateText: {
    color: 'black', fontSize: 14, fontWeight: 'bold',
  },
  catSelected: {
    borderColor: 'green',
  }


});
export default Home;
