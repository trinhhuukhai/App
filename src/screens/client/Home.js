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
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { getAllCategory } from '../../redux/reducer/CategoryReducer';
import Spinner from 'react-native-loading-spinner-overlay';
import { getAllProduct, getProductByCategory, getProductSold, seachProduct } from '../../redux/reducer/ProductReducer';
import { colors } from '../../assets';
import { icons } from '../../constants';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';


const Home = () => {


  const [searchText, setSearchText] = useState('')
  const [isLoading, setLoading] = useState(false);

  const isFocused = useIsFocused()


  const [cate1, setCate1] = useState([]);
  const [cate2, setCate2] = useState([]);

  const [showAll, setShowAll] = useState(false);
  const [showAllCat2, setShowAllCat2] = useState(false);

  const displayedCate1 = showAll ? cate1 : cate1.slice(0, 4);
  const displayedCate2 = showAllCat2 ? cate2 : cate2.slice(0, 2);


  const seeAll = () => {
    setLoading(true)
    setShowAll(true);
    setLoading(false)
  };

  const hide = () => {
    setLoading(true)
    setShowAll(false);
    setLoading(false)
  };

  const seeAllCat2 = () => {
    setLoading(true)
    setShowAllCat2(true);
    setLoading(false)
  };

  const hideCat2 = () => {
    setLoading(true)
    setShowAllCat2(false);
    setLoading(false)
  };

  const auth = useSelector((state) => state.auth?.data);
  const userId = auth?.id;

  const route = useRoute();

  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      getData()
    }
  }, [isFocused]);

  const getData = async () => {
    setLoading(true);
    const response = await getAllProduct();

    const data = response.response
    if (response.data === '') {
      setCate1([])
      setCate2([])
      setLoading(false);
    } else {

      let cate1List = [];
      let cate2List = [];
      for (let index = 0; index < data.length; index++) {
        if (data[index].category.name == 'Thời trang nam') {
          cate1List.push(data[index]);
        } else if (data[index].category.name == 'Thời trang nữ') {
          cate2List.push(data[index]);
        }
      }
      setCate1(cate1List);
      setCate2(cate2List);
      setLoading(false);
    }
  };

  const getDataSearch = async () => {
    setLoading(true);
    const response = await seachProduct(searchText);

    const data = response.data
    if (response.data === '') {
      setCate1([])
      setCate2([])
      setLoading(false);
    } else {

      let cate1List = [];
      let cate2List = [];
      for (let index = 0; index < data.length; index++) {
        if (data[index].category.name == 'Thời trang nam') {
          cate1List.push(data[index]);
        } else if (data[index].category.name == 'Thời trang nữ') {
          cate2List.push(data[index]);
        }
      }
      setCate1(cate1List);
      setCate2(cate2List);
      setLoading(false);
    }
  };

  const closeText = () => {
    setSearchText("")
    getData()
  }
  const formattedAmount = (amount) => {
    if (amount) {
      return amount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
    }
    return '';
  };



  const ProductCard = ({ data }) => {
    return (
      <TouchableOpacity

        style={{
          width: '48%',
          marginVertical: 14,
        }}
        onPress={() => navigation.navigate("CTSPCUSTOMER", { "productId": data.id })}
      >
        <View
          style={{
            width: '100%',
            height: 100,
            borderRadius: 10,
            backgroundColor: COLOURS.backgroundLight,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }}>

          <Image
            source={{
              uri: data.productImage
            }}
            style={{
              width: '80%',
              height: '80%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: COLOURS.black,
            fontWeight: '500',
            letterSpacing: 1,
            marginBottom: 2,
          }}>
          {data.name}
        </Text>
        <Text style={{
          fontWeight: '500',
          letterSpacing: 1,
        }}>Đã bán: {data.sold}</Text>
        <Text style={{
          fontWeight: '500',
          letterSpacing: 1,
        }}>{formattedAmount(data.outputPrice)}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
      }}>

      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />


      <View
        style={{
          padding: 16,
        }}>
        <Text
          style={{
            fontSize: 26,
            color: COLOURS.black,
            fontWeight: '500',
            letterSpacing: 1,
            marginBottom: 10,
          }}>
          K - Shop &amp; Style
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: COLOURS.black,
            fontWeight: '500',
            letterSpacing: 1,
            lineHeight: 24,
          }}>
          Thời trang giới trẻ. Mặc vào là chất
        </Text>
      </View>
      <View style={{ marginHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            // backgroundColor: 'red',
            padding: 10,
            position: 'absolute',
            zIndex: 3

          }}
          onPress={() => getDataSearch()}
        >
          <Image
            tintColor='black' //mau logo
            source={icons.icon_search}
            style={{
              width: 15,
              height: 15,
              alignSelf: 'center',

              // top: -7,
              // left: 10,

              // bottom:0
            }}
          />
        </TouchableOpacity>

        <TextInput
          onChangeText={(text) => {
            setSearchText(text)
          }}
          value={searchText}
          autoCorrect={false}
          style={{
            borderBottomWidth: 1,
            height: 46,
            flex: 1,
            marginEnd: 5,
            opacity: 0.4,
            padding: 10,
            paddingStart: 30,
            color: 'black',
            fontWeight: '500',
            letterSpacing: 1,
            borderColor: colors.primary,
            marginLeft: 5
          }}

          placeholder='Tìm kiếm sản phẩm...'
        />

        {
          searchText != "" ?
            <TouchableOpacity style={{
              padding: 10
            }}
              onPress={() => closeText()}
            >
              <Icon name="close" size={20} />
            </TouchableOpacity>
            :
            null
        }


      </View>
      <Spinner color='#00ff00' size={"large"} visible={isLoading} />

      <ScrollView showsVerticalScrollIndicator={false}>

        <View
          style={{
            padding: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
                Thời trang nam
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                  opacity: 0.5,
                  marginLeft: 10,
                }}>
                ({cate1.length})
              </Text>
            </View>
            {
              showAll == false ?
                <TouchableOpacity onPress={() => seeAll()}>
                  <Text style={{
                    fontSize: 14, color: COLOURS.blue, fontWeight: '500',
                    letterSpacing: 1,
                  }}>Xem tất cả</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => hide()}>
                  <Text style={{
                    fontSize: 14, color: COLOURS.blue, fontWeight: '500',
                    letterSpacing: 1,
                  }}>Ẩn</Text>
                </TouchableOpacity>
            }

          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {displayedCate1.map(data => {
              return <ProductCard data={data} key={data.id} />;
            })}
          </View>
        </View>

        <View
          style={{
            padding: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
                Thời trang nữ
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                  opacity: 0.5,
                  marginLeft: 10,
                }}>
                ({cate2.length})
              </Text>
            </View>
            {
              showAllCat2 == false ?
                <TouchableOpacity onPress={() => seeAllCat2()}>
                  <Text style={{
                    fontSize: 14, color: COLOURS.blue, fontWeight: '500',
                    letterSpacing: 1,
                  }}>Xem tất cả </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => hideCat2()}>
                  <Text style={{
                    fontSize: 14, color: COLOURS.blue, fontWeight: '500',
                    letterSpacing: 1,
                  }}>Ẩn</Text>
                </TouchableOpacity>
            }
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {displayedCate2.map(data => {
              return <ProductCard data={data} key={data.id} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
