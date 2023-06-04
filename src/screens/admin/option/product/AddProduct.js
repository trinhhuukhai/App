import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, Button, TouchableOpacity, StyleSheet, ToastAndroid, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { COLOURS } from '../../../../database/Database';
import { getAllCategory } from '../../../../redux/reducer/CategoryReducer';
import { colors } from '../../../../constants';
import axios from 'axios';
import { addProduct } from '../../../../redux/reducer/ProductReducer';


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
  const [sizes, setSizes] = useState([]); // State to store selected sizes

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
      maxHeight: 500,
      rotation: 0, // Set rotation to 0 to fix image rotation issue
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg('Cancel');
      } else if (response.errorCode === 'permission') {
        setToastMsg('Permission');
      } else if (response.errorCode === 'others') {
        setToastMsg(response.errorMessage);
      } else if (response.assets[0].fileSize > 2097152) {
        Alert.alert('Maximum', 'File size should not exceed 2MB');
      } else {
        try {
          setProductImage(response.assets[0].base64);
        } catch (error) {
          console.error('Error setting product image:', error);
        }
      }
    });
  };



  const handleSizeChange = (value) => {
    const selectedSizes = [...sizes];
    const index = selectedSizes.indexOf(value);
    if (index !== -1) {
      selectedSizes.splice(index, 1); // Remove size from array if already selected
    } else {
      selectedSizes.push(value); // Add size to array if not selected
    }
    setSizes(selectedSizes);
  };

  // useEffect(() => {
  //   console.log(sizes); // Log the updated "sizes" array whenever it changes
  // }, [sizes]);



  const handleSubmit = async () => {
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
      uri: productImage,
      type: 'image/jpeg',
      name: 'product.jpg',
    });
    formData.append('sizes', JSON.stringify(sizes));

    try {
      await addProduct(formData);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error, display an alert, show a toast message, etc.
    }
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
            setColor(text);
          }}
          style={styles.input}
          placeholder="Màu sắc"
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
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Kích thước</Text>
          <View style={styles.checkboxGroup}>
            <TouchableOpacity
              style={[styles.checkbox, sizes.includes('S') && styles.checkedCheckbox]}
              onPress={() => handleSizeChange('S')}
            >
              <Text style={styles.checkboxText}>S</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.checkbox, sizes.includes('M') && styles.checkedCheckbox]}
              onPress={() => handleSizeChange('M')}
            >
              <Text style={styles.checkboxText}>M</Text>
            </TouchableOpacity>
            {/* Add more size checkboxes as needed */}
          </View>
        </View>
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
    backgroundColor: colors.white,
    position: 'relative',
  },
  inputContainer: {
    backgroundColor: colors.white,
    // borderRadius: 10,
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
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
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

  checkboxContainer: {
  },
  checkboxLabel: {
    marginBottom: 10,
  },
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: 'green',
  },
  checkboxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default AddProduct;