import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, TouchableHighlight, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '../../../../assets';
import { SwipeListView } from 'react-native-swipe-list-view';
import { icons } from '../../../../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deteleCategory, getAllCategory } from '../../../../redux/reducer/CategoryReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from '../../../../database/Database';

function Category() {
  const [isLoading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const response = await getAllCategory();

    if (response.data === '') {
      setLoading(false);
    } else {
      setCategory(response);
      setLoading(false);
    }
  };



  //education
  const deleteCat = (rowMap, rowKey) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn xóa danh mục này?',
      [
        { text: 'Hủy', onPress: () => console.log('Hủy') },
        { text: 'Xóa', onPress: () => handleDelete(rowKey) },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (rowKey) => {
    const prevIndex = category.findIndex(item => item.id === rowKey);
    await deteleCategory(rowKey);

    getData()
  };

  const viewProduct = (catId) => {
    // Navigate to the OrderDetail screen with the orderId
    navigation.navigate('Sản Phẩm Danh Mục', { id: catId });
  }

  const editCate = (catId) => {
    // Navigate to the OrderDetail screen with the orderId
    navigation.navigate('Sửa Danh Mục', { id: catId });
  }

  const addCate = () => {
    // Navigate to the OrderDetail screen with the orderId
    navigation.navigate('Thêm Danh Mục');
  }

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const renderItemEducation = data => (
    <View>
      <TouchableHighlight
        onPress={() => { viewProduct(data.item.id) }}
        style={styles.rowFront}
        underlayColor={colors.primary}
      >
        <View>

          <Text style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold'
          }}> {data.item.name}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
  // const renderHiddenItemEducation = (data, rowMap) => (
  //   <View style={styles.rowBack}>
  //     <TouchableOpacity
  //       style={[styles.backRightBtn, styles.backRightBtnRight]}
  //       onPress={() => deleteRowEdu(rowMap, data.item.id)}
  //     >
  //       <Image
  //         source={icons.icon_bin}
  //         style={{
  //           width: 30,
  //           height: 30,
  //         }}
  //       />

  //     </TouchableOpacity>

  //     <TouchableOpacity
  //       style={[styles.backRightBtn, styles.backRightBtnRight]}
  //       onPress={() => deleteRowEdu(rowMap, data.item.id)}
  //     >
  //       <Image
  //         source={icons.icon_calendar_info}
  //         style={{
  //           width: 30,
  //           height: 30,
  //         }}
  //       />

  //     </TouchableOpacity>

  //   </View>

  // );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => editCate(data.item.id)}
      >
        <Text style={styles.backTextWhite}>Sửa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteCat(rowMap, data.item.id)}
      >
        <Text style={styles.backTextWhite}>Xóa</Text>
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


        }}>Danh mục sản phẩm</Text>

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

          placeholder='Tên danh mục'
        />

      </View>

      <View style={{
        backgroundColor: colors.inactive,
        height: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
      }} />
      {/* <View style={styles.line} /> */}



      {/* <FlatList
        style={{
          marginTop: 5
        }}
        // data = {listCat}
        data={category}
        numColumns={2}
        keyExtractor={item => item.id}

        renderItem={({ item, index }) => <View style={{
          flex: 0.5,
          marginTop: 5,
          marginLeft: index % 2 == 0 ? 10 : 0,
          marginRight: 10,
          marginBottom: 5,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'gray',

        }}>
          <TouchableOpacity onPress={() => {
            viewProduct(item.id)
          }}>
            <View style={{
              flexDirection: 'row',
              marginHorizontal: 5,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>

              <Text style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold'
              }}> {item.name}</Text>

            </View>
          </TouchableOpacity>


        </View>}
      /> */}

      <SwipeListView

        data={category.filter(item => item.name?.toLowerCase().includes(searchText.toLowerCase()) || JSON.stringify(item.name)?.toLowerCase().includes(searchText.toLowerCase()))}
        renderItem={renderItemEducation}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-150}
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
          onPress={() => addCate()}
        />
      </View>



    </View>
  )
}

export default Category

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
    backgroundColor: 'red'
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
})