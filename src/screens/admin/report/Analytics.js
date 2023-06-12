import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { COLOURS } from '../../../database/Database';
import { getPaymentTotal } from '../../../redux/reducer/OrderReducer';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const Analytics = () => {
  const auth = useSelector((state) => state.auth?.data);
  const shopId = auth?.shopId;
  const [isLoading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [invest, setInvest] = useState(0);
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  const isFocused = useIsFocused();


  useEffect(() => {
    if (isFocused) {
      getTotal();
    }
  }, [isFocused]);

  const getTotal = async () => {
    setLoading(true);
    const response = await getPaymentTotal(shopId);
    if (response.data === "") {
      setData(0);
      setTotal(0);
      setInvest(0);
      setLoading(false);
    } else {
      setData(response.data)
      let total = 0;
      let von = 0;
      if (Array.isArray(response.data)) {
        response.data.forEach(item => {
          total += item.total;
          von += item.invest;
        });
      }
      setTotal(total)
      setInvest(von)
      setLoading(false);
    }
  };

  const formattedAmount = (amount) => {
    if (amount || amount === 0) {
      return amount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
    }
    return '0 đ';
  };


  const formattedDate = (originalDate) => moment(originalDate).format('DD-MM-YYYY');


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOURS.white,
        position: 'relative',
      }}
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingTop: 16,
          paddingHorizontal: 16,
          marginBottom: 15,
          alignItems: 'center',
        }}
      >
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
        <Text
          style={{
            marginLeft: 50,
            fontSize: 18,
            color: COLOURS.black,
            fontWeight: '500',
            letterSpacing: 1,
          }}
        >
          Thống kê doanh thu
        </Text>
      </View>
      <Spinner color='#00ff00' size={"large"} visible={isLoading} />


      <ScrollView>
        <View style={{ padding: 10 }}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Ngày</Text>
              <Text style={styles.tableHeader}>Doanh thu</Text>
              <Text style={styles.tableHeader}>Vốn</Text>
              <Text style={styles.tableHeader}>Lợi nhuận</Text>
            </View>
            {Array.isArray(data) &&
              data.map((item) => (
                <View style={styles.tableRow} key={item.orderDate}>
                  <Text style={styles.tableCell}>{formattedDate(item.orderDate)}</Text>
                  <Text style={styles.tableCell}>{formattedAmount(item.total)}</Text>
                  <Text style={styles.tableCell}>{formattedAmount(item.invest)}</Text>
                  <Text style={styles.tableCell}>{formattedAmount(item.total - item.invest)}</Text>
                </View>
              ))}

          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text style={styles.summaryText}>
            Tổng doanh thu: {formattedAmount(total)}
          </Text>
          <Text style={styles.summaryText}>
            Tiền vốn: {formattedAmount(invest)}
          </Text>
          <Text style={styles.summaryText}>
            Lợi nhuận: {formattedAmount(total - invest)}
          </Text>
        </View>



      </ScrollView>
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({

  summaryText: {
    fontSize: 18,
    color: COLOURS.black,
    fontWeight: '500',
    letterSpacing: 1,
  },
  table: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    // padding: 5,
  },
  tableRow: {
    flex: 1,
    flexDirection: 'row',
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#00BFFF',
    borderWidth: 1,
    borderColor: 'black',
  },
  tableCell: {
    flex: 1,
    padding: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
});
