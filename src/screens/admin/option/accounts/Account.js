import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '../../../../assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SwipeListView } from 'react-native-swipe-list-view';
import { deteleProduct, getProduct, getProductByCategory } from '../../../../redux/reducer/ProductReducer';
import { getAllCustomer } from '../../../../redux/reducer/CustomerReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Account = () => {

  const [isLoading, setLoading] = useState(false);
  const [customer, setCustomer] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  const auth = useSelector((state) => state.auth?.data);
  const token = auth?.token;
  const role = auth?.roleName;
  debugger

  return (
    <View>
      <Text>Account</Text>
    </View>
  )
}

export default Account