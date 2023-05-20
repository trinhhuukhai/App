import { View, Text, TextInput, ScrollView, Image, Button, TouchableOpacity, StyleSheet, ToastAndroid, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getAllCategory } from '../../../../redux/reducer/CategoryReducer';
import { colors } from '../../../../constants';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';
import { addProduct } from '../../../../redux/reducer/ProductReducer';
import ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from '../../../../database/Database';

const AddProduct = () => {
  const [isLoading, setLoading] = useState(false);
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


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
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

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
  }



  const handleChoosePhoto = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
      maxWidth: 500,
      maxHeight: 500
    };


    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg({ message: 'Cancel' })

      } else if (response.errorCode === 'permission') {

        setToastMsg('permision')
      } else if (response.errorCode == 'others') {
        setToastMsg(response.errorMessage)
      } else if (response.assets[0].fileSize > 2097152) {
        Alert.alert("maximun", { text: 'OK' })

      } else {
        try {
          setProductImage(response.assets[0].base64)
        } catch (error) {
          console.error('Error setting product image:', error)
        }


      }
    })
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

    addProduct(formData)
    navigation.goBack();

  };

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


        }}>Thêm mới sản phẩm</Text>

      </View>
      <View style={styles.inputContainer}>

        <SelectList
          setSelected={setCat}
          boxStyles={{ marginTop: 20 }}
          data={category}
          placeholder={'Chọn danh mục'}
        />
        <TextInput
          onChangeText={(text) => {
            setName(text);
          }}
          style={styles.input}
          placeholder="Tên sản phẩm"
        />
        <TextInput
          onChangeText={(text) => {
            setDescription(text);
          }}
          style={styles.input}
          placeholder="Thông tin sản phẩm"
        />
        <TextInput
          onChangeText={(text) => {
            setBrand(text);
          }}
          style={styles.input}
          placeholder="Hãng"
        />
        <TextInput
          onChangeText={(text) => {
            setInventory(text);
          }}
          style={styles.input}
          keyboardType='numeric'
          placeholder="Số lượng"
        />
        <TextInput
          onChangeText={(text) => {
            setInPrice(text);
          }}
          style={styles.input}
          placeholder="Giá nhập"
          keyboardType='numeric'
        />
        <TextInput
          onChangeText={(text) => {
            setOutPrice(text);
          }}
          style={styles.input}
          placeholder="Giá bán"
          keyboardType='numeric'
        />
        <View style={styles.imageContainer}>
          {productImage ? (

            <Image source={{ uri: `data:image/png;base64,${productImage}` }} style={styles.image} />
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
          title="Thêm sản phẩm"
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

export default AddProduct;