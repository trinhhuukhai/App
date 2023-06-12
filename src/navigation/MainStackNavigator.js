import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/AntDesign';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import { Category, Contact, MyCart, Filter, Home, Login, Orders, Register, Welcome, ProductInfo, Product, HomeScreen, Analytics, Option, ProductOfCat, AddCategory, EditCategory, AddProduct, EditProduct, Customer, Account, Payment, OrderClient, AccountClient, OrderItemList, PaymentOrder, EditAccount, ChangePassword, Details, AddCustomer, EditCustomer, ProductDetail, AddReview, EditReview, TopupCoin, EditAcc, ChangePass, ForgotPass, ChangePassForgot } from '../screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackOrder = createNativeStackNavigator();
function DH() {
  return (
    <StackOrder.Navigator screenOptions={{ headerShown: false }}>
      <StackOrder.Screen name={"DH"} component={Orders} />
      <StackOrder.Screen name={"CTDH"} component={Details} />
    </StackOrder.Navigator>
  );
}

const StackOption = createNativeStackNavigator();
function TuyChon() {
  return (
    <StackOption.Navigator screenOptions={{ headerShown: false }}>
      <StackOption.Screen name={"TC"} component={Option} />
      <StackOption.Screen name={"SP"} component={Prod} />
      <StackOption.Screen name={"KH"} component={Customers} />
      <StackOption.Screen name={"TKOPTION"} component={TKOWNER} />
    </StackOption.Navigator>
  );
}

const StackTKO = createNativeStackNavigator();
function TKOWNER() {
  return (
    <StackTKO.Navigator screenOptions={{ headerShown: false }}>
      <StackTKO.Screen name={"TKOWNER"} component={Account} />
      <StackTKO.Screen name={"EDITTKOWNER"} component={EditAcc} />
      <StackTKO.Screen name={"CHANGEPASSOWNER"} component={ChangePass} />
    </StackTKO.Navigator>
  );
}


const Stackpro = createNativeStackNavigator();
function Prod() {
  return (
    <Stackpro.Navigator screenOptions={{ headerShown: false }}>
      <Stackpro.Screen name={"SPh"} component={Product} />
      <Stackpro.Screen name={"THEMSP"} component={AddProduct} />
      <Stackpro.Screen name={"SUASP"} component={EditProduct} />
      <Stackpro.Screen name={"CTSP"} component={ProductDetail} />
      <Stackpro.Screen name={"THEMDG"} component={AddReview} />
      <Stackpro.Screen name={"SUADG"} component={EditReview} />
    </Stackpro.Navigator>
  );
}

const Stackaccount = createNativeStackNavigator();
function Customers() {
  return (
    <Stackaccount.Navigator screenOptions={{ headerShown: false }}>
      <Stackaccount.Screen name={"TKCUSTOMER"} component={Customer} />
      <Stackaccount.Screen name={"ADDTK"} component={AddCustomer} />
      <Stackaccount.Screen name={"EDITTK"} component={EditCustomer} />
    </Stackaccount.Navigator>
  );
}

const StackHome = createNativeStackNavigator();
function HomeClient() {
  return (
    <StackHome.Navigator screenOptions={{ headerShown: false }}>
      <StackHome.Screen name={"SPCUSTOMER"} component={Home} />
      <StackHome.Screen name={"CTSPCUSTOMER"} component={ProductInfo} />
      <StackHome.Screen name={"GH"} component={MyCart} />
      <StackHome.Screen name={"Pay"} component={Payment} />
      <StackHome.Screen name={"NT"} component={TopupCoin} />
    </StackHome.Navigator>
  );
}

const StackCart = createNativeStackNavigator();
function Cart() {
  return (
    <StackCart.Navigator screenOptions={{ headerShown: false }}>
      <StackCart.Screen name={"GH"} component={MyCart} />
      <StackCart.Screen name={"Pay"} component={Payment} />
      <StackCart.Screen name={"NT"} component={TopupCoin} />
    </StackCart.Navigator>
  );
}



const StackOrderClient = createNativeStackNavigator();
function OrderC() {
  return (
    <StackOrderClient.Navigator screenOptions={{ headerShown: false }}>
      <StackOrderClient.Screen name={"DHCLIENT"} component={OrderClient} />
      <StackOrderClient.Screen name={"CTDHCLIENT"} component={OrderItemList} />
      <StackOrderClient.Screen name={"TTCLIENT"} component={PaymentOrder} />
      <StackOrderClient.Screen name={"NT"} component={TopupCoin} />
    </StackOrderClient.Navigator>
  );
}

const StackAccountC = createNativeStackNavigator();
function AccountC() {
  return (
    <StackAccountC.Navigator screenOptions={{ headerShown: false }}>
      <StackAccountC.Screen name={"TKClient"} component={AccountClient} />
      <StackAccountC.Screen name={"Chỉnh sửa tài khoản"} component={EditAccount} />
      <StackAccountC.Screen name={"Đổi mật khẩu"} component={ChangePassword} />
      <StackAccountC.Screen name={"Nạp tiền"} component={TopupCoin} />
    </StackAccountC.Navigator>
  );
}

const HomeTabNavigator = () => {
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

      <Tab.Screen
        name="Đơn hàng"
        component={DH}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
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
  return (
    <Tab.Navigator>
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
        name="Giỏ hàng"
        component={Cart}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" color={color} size={size} />
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
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={HomeTabNavigator} />
      <Stack.Screen name="Client" component={ClientTabNavigator} />
      <Stack.Screen name="Quên mật khẩu" component={ForgotPass} />
      <Stack.Screen name="Cập nhập mật khẩu" component={ChangePassForgot} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
