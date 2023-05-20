import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/AntDesign';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import { Category, Contact, MyCart, Filter, Home, Login, Orders, Register, Welcome, ProductInfo, Product, HomeScreen, Analytics, Option, ProductOfCat, AddCategory, EditCategory, AddProduct, EditProduct, Customer, Account, Payment, OrderClient, AccountClient, OrderItemList, PaymentOrder, EditAccount, ChangePassword, Details, AddCustomer, EditCustomer, ProductDetail, AddReview, EditReview } from '../screens';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackOrder = createNativeStackNavigator();
function DH() {
  return (
    <StackOrder.Navigator screenOptions={{ headerShown: false }}>
      <StackOrder.Screen name={"Đơn Hàng"} component={Orders} />
      <StackOrder.Screen name={"Details"} component={Details} />
    </StackOrder.Navigator>)
}

const StackOption = createNativeStackNavigator();
function TuyChon() {
  return (
    <StackOption.Navigator screenOptions={{ headerShown: false }}>
      <StackOption.Screen name={"Tùy Chọn"} component={Option} />
      <StackOption.Screen name={"Danh Mục"} component={Cate} />
      <StackOption.Screen name={"Sản Phẩm"} component={Prod} />
      <StackOption.Screen name={"Khách Hàng"} component={Customers} />
      <StackOption.Screen name={"Tài Khoản"} component={Account} />
    </StackOption.Navigator>)
}


const Stackcat = createNativeStackNavigator();
function Cate() {
  return (
    <Stackcat.Navigator screenOptions={{ headerShown: false }}>
      <Stackcat.Screen name={"Danh Mục"} component={Category} />
      <Stackcat.Screen name={"Thêm Danh Mục"} component={AddCategory} />
      <Stackcat.Screen name={"Sản Phẩm Danh Mục"} component={ProductOfCat} />
      <Stackcat.Screen name={"Sửa Danh Mục"} component={EditCategory} />
    </Stackcat.Navigator>)
}

const Stackpro = createNativeStackNavigator();
function Prod() {
  return (
    <Stackpro.Navigator screenOptions={{ headerShown: false }}>
      <Stackpro.Screen name={"Sản Phẩm"} component={Product} />
      <Stackpro.Screen name={"Thêm Sản Phẩm"} component={AddProduct} />
      <Stackpro.Screen name={"Sửa Sản Phẩm"} component={EditProduct} />
      <Stackpro.Screen name={"Chi tiết sản phẩm"} component={ProductDetail} />
      <Stackpro.Screen name={"Thêm đánh giá"} component={AddReview} />
      <Stackpro.Screen name={"Sửa đánh giá"} component={EditReview} />

    </Stackpro.Navigator>)
}




const Stackaccount = createNativeStackNavigator();
function Customers() {
  return (
    <Stackaccount.Navigator screenOptions={{ headerShown: false }}>
      <Stackaccount.Screen name={"Tài khoản khách hàng"} component={Customer} />
      <Stackaccount.Screen name={"Thêm tài khoản"} component={AddCustomer} />
      <Stackaccount.Screen name={"Sửa tài khoản"} component={EditCustomer} />
    </Stackaccount.Navigator>)
}

const StackCart = createNativeStackNavigator();
function HomeClient() {
  return (
    <StackCart.Navigator screenOptions={{ headerShown: false }}>
      <StackCart.Screen name={"Trang chủ"} component={Home} />
      <StackCart.Screen name={"Giỏ Hàng"} component={MyCart} />
      <StackCart.Screen name={"Thanh toán"} component={Payment} />
      <StackCart.Screen name={"Chi tiết sản phẩm"} component={ProductInfo} />
    </StackCart.Navigator>)
}

const StackOrderClient = createNativeStackNavigator();
function OrderC() {
  return (
    <StackOrderClient.Navigator screenOptions={{ headerShown: false }}>
      <StackOrderClient.Screen name={"Đơn hàng"} component={OrderClient} />
      <StackOrderClient.Screen name={"Chi tiết đơn hàng"} component={OrderItemList} />
      <StackOrderClient.Screen name={"Thanh toán"} component={PaymentOrder} />
    </StackOrderClient.Navigator>)
}

const StackAccountC = createNativeStackNavigator();
function AccountC() {
  return (
    <StackAccountC.Navigator screenOptions={{ headerShown: false }}>
      <StackAccountC.Screen name={"Tài Khoản"} component={AccountClient} />
      <StackAccountC.Screen name={"Chỉnh sửa tài khoản"} component={EditAccount} />
      <StackAccountC.Screen name={"Đổi mật khẩu"} component={ChangePassword} />
    </StackAccountC.Navigator>)
}

const HomeTabNavigator = () => {

  // const navigation = useNavigation()
  // const auth = useSelector((state) => state.auth?.data);
  // const token = auth?.token;
  // const role = auth?.roleName;
  // // debugger

  // console.log(token)
  // let date = new Date()



  // useEffect(() => {
  //   if (!auth || !token || role != "ADMIN") {
  //     navigation.navigate("/Login")
  //   }
  //   if (auth) {
  //     const decodedToken = jwtDecode(auth?.token)
  //     if (decodedToken.exp < date.getTime() / 1000) {
  //       navigation.navigate("/Login")
  //     }
  //   }
  // }, [])



  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Trang chủ"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Sản Phẩm"
        component={CP}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-bag" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Đơn hàng"
        component={DH}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-bag" color={color} size={size} />
          ),
        }}
      /><Tab.Screen
        name="Thống kê"
        component={Analytics}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icons name="barchart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen

        name="Tùy Chọn"
        component={TuyChon}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Iconss name="menu" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const ClientTabNavigator = () => {
  // const navigation = useNavigation()
  // const auth = useSelector((state) => state.auth?.data);
  // const token = auth?.token;
  // const role = auth?.roleName;
  // // debugger

  // console.log(token)
  // let date = new Date()



  // useEffect(() => {
  //   if (!auth || !token || role != "USER") {
  //     navigation.navigate("/Login")
  //   }
  //   if (auth) {
  //     const decodedToken = jwtDecode(auth?.token)
  //     if (decodedToken.exp < date.getTime() / 1000) {
  //       navigation.navigate("/Login")
  //     }
  //   }
  // }, [])
  return (
    <Tab.Navigator>
      {/* <Tab.Screen
        name="Trang chủ"
        component={Contact}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Trang chủ"
        component={HomeClient}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Đơn hàng"
        component={OrderC}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tài Khoản"
        component={AccountC}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Iconss name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainStackNavigator = () => {




  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: true }} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={HomeTabNavigator} />
      <Stack.Screen name="Client" component={ClientTabNavigator} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
