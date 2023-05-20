import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '../../../../assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import { editCategory, getAllCategory, getCategoryId } from '../../../../redux/reducer/CategoryReducer';
import { SelectList } from 'react-native-dropdown-select-list';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { editProduct, getProductId } from '../../../../redux/reducer/ProductReducer';
import { COLOURS } from '../../../../database/Database';
const EditProduct = () => {

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [catId, setCat] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [in_price, setInPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [inventory, setInventory] = useState('');
  const [out_price, setOutPrice] = useState('');
  const [productImage, setProductImage] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  useEffect(() => {
    getData(id);
  }, []);

  const getData = async (id) => {
    setLoading(true);
    const response = await getProductId(id);
    
    if (response.data === '') {
      setLoading(false);
    } else {
      setName(response.data.name);
      setBrand(response.data.brand);
      setDescription(response.data.description);
      setColor(response.data.color);
      setInPrice(response.data.inputPrice);
      setOutPrice(response.data.outputPrice);
      setInventory(response.data.inventory);
      setCat(response.data.category.id)
      setProductImage(response.data.productImage)
      setLoading(false);
    }
  };

  useEffect(() => {
    getCat();
  }, []);

  const getCat = async () => {
    setLoading(true);
    const response = await getAllCategory();
    if (response === '') {
      setLoading(false);
    } else {
      let cat = response.map((item) => ({
        key: item.id,
        value: item.name,
      }));
      setCategory(cat);
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('catId', catId);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('in_price', in_price);
    formData.append('brand', brand);
    formData.append('color', color);
    formData.append('inventory', inventory);
    formData.append('out_price', out_price);
    formData.append('productImage', {
      uri: productImage.uri,
      type: productImage.type,
      name: productImage.fileName,
    });

    editProduct(formData)
    navigation.goBack();

  };

  const viewCate = () => {
    // Navigate to the OrderDetail screen with the orderId
    navigation.navigate('Danh Mục');
  }

  return (
    <ScrollView style={styles.container}>


      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingTop: 16,
          paddingHorizontal: 16,
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


        }}>Sửa thông tin sản phẩm</Text>

      </View>
      <View style={styles.inputContainer}>
        <SelectList
          setSelected={setCat}
          boxStyles={{ marginTop: 20 }}
          data={category}
          placeholder={'Chọn danh mục'}
          value={catId}
        />
        <TextInput
          onChangeText={(text) => {
            setName(text);
          }}
          style={styles.input}
          placeholder="Tên sản phẩm"
          value={name
          }
        />
        <TextInput
          onChangeText={(text) => {
            setDescription(text);
          }}
          style={styles.input}
          placeholder="Thông tin sản phẩm"
          value={description}
        />
        <TextInput
          onChangeText={(text) => {
            setBrand(text);
          }}
          style={styles.input}
          placeholder="Hãng"
          value={brand}
        />
        <TextInput
          onChangeText={(text) => {
            setInventory(text);
          }}
          style={styles.input}
          keyboardType='numeric'
          placeholder="Số lượng"
          value={inventory.toString()}
        />
        <TextInput
          onChangeText={(text) => {
            setInPrice(text);
          }}
          style={styles.input}
          placeholder="Giá nhập"
          keyboardType='numeric'
          value={in_price.toString()}
        />
        <TextInput
          onChangeText={(text) => {
            setOutPrice(text);
          }}
          style={styles.input}
          placeholder="Giá bán"
          keyboardType='numeric'
          value={out_price.toString()}
        />
        <View style={styles.imageContainer}>
          {productImage ? (

            <Image source={{ uri: productImage }} style={styles.image} />
          ) : (
            <Button
              title="Chọn hình ảnh sản phẩm"
              onPress={() =>
                handleChoosePhoto()
              }
            />
          )}
        </View>
        <Button
          title="Sửa sản phẩm"
          onPress={() => {
            // handle add product
            handleSubmit()
          }}
          disabled={!catId || !name || !description || !brand || !color || !inventory || !in_price || !out_price || !productImage}
          color={colors.primary}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.white,
    position: 'relative',
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.lightGray,
    borderRadius: 5,
    height: 50,
    padding: 10,
    height: 40,
    borderBottomWidth: 1,
    color: 'red',
    marginTop: 10,
    marginBottom: 20
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default EditProduct;