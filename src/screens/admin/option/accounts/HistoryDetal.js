import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { getOrderById } from '../../../../redux/reducer/OrderReducer';
import Spinner from 'react-native-loading-spinner-overlay';
import { useRoute } from '@react-navigation/native';
import { convertMoney } from '../../../../untilies/Validations';
import { getOrderByIdUser } from '../../../../redux/reducer/CustomerReducer';


const HistoryDetal = () => {
  const route = useRoute();
  const [orderItem, setOrderItem] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { id } = route.params;
    fetchOrder(id);
  }, []);

  const fetchOrder = async (id) => {
    setLoading(true);
    const response = await getOrderByIdUser(id);
    // debugger
    setOrderItem(response);
    setLoading(false);
  };

  const renderItem = ({ item }) => {

    return (

      <View style={{
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      }}>
        <View>

          <Text>Tên khách hàng: {item.name}</Text>
          <Text>Ngày đặt hàng: {item.orderDate} VND</Text>
          <Text>Địa chỉ: {item.shippingAddress}</Text>
          <Text>Trạng thái đơn hàng: {item.status}</Text>
          <Text>Tổng số tiền: {convertMoney(item.total)} VND</Text>
        </View>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Spinner color='#00ff00' size={"large"} visible={loading} />
      <Text style={styles.title}>Lịch sử đơn hàng</Text>
      <FlatList
        data={orderItem}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    marginBottom: 20
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default HistoryDetal;
