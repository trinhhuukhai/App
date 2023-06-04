import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { BarChart } from "react-native-chart-kit";
import { COLOURS } from '../../../database/Database';
import { getPaymentTotal } from '../../../redux/reducer/OrderReducer';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';
import moment from 'moment';
import { ScrollView } from 'react-native-virtualized-view';
const Analytics = () => {
    const auth = useSelector((state) => state.auth?.data);
    const shopId = auth?.shopId;
    const [isLoading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [invest, setInvest] = useState(0);
    const navigation = useNavigation();

    const [data, setData] = useState([]);

    const isFocused = useIsFocused();
    const [dataRow, setDataRow] = useState([])


    const tableHead = ['Ngày', 'Vốn (VND)', 'Doanh thu (VND)', 'Lợi nhuận (VND)']


    useEffect(() => {
        if (isFocused) {
            getTotal();
        }
    }, [isFocused]);

    const getTotal = async () => {
        setLoading(true);
        const response = await getPaymentTotal(shopId);

        if (response.data == "") {
            setData(0);
            setTotal(0);
            setInvest(0);
            setLoading(false);
        } else {
            let total = 0;
            let von = 0;
            if (Array.isArray(response.data)) {
                response.data.forEach(item => {
                    total += item.total;
                    von += item.invest;
                });
            }

            const convertData = response.data.map(item => {
                const orderDate = formattedDate(item.orderDate);
                const invest = formattedAmount(item.invest).toString();
                const total = formattedAmount(item.total).toString();
                const diff = formattedAmount(item.total - item.invest).toString();
                return [orderDate, invest, total, diff];
            });
            setDataRow(convertData)
            dataRow





            const chartData = response.data.map(item => ({
                label: item.orderDate,
                value: item.total,
            }));

            setData(chartData);
            setTotal(total);
            setInvest(von);
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

    const screenWidth = Dimensions.get("window").width;

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


            <ScrollView>
                <View style={{ padding: 10 }}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row
                            data={tableHead}
                            style={styles.head}
                            textStyle={styles.text} // Changed from array to object
                        />
                        <Rows
                            data={dataRow}
                            textStyle={styles.text} // Changed from array to object
                        />
                    </Table>
                </View>

                <View
                    style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <Text style={{
                        fontSize: 18,
                        color: COLOURS.black,
                        fontWeight: '500',
                        letterSpacing: 1,
                    }}>
                        Tổng doanh thu: {formattedAmount(total)}
                    </Text>
                    <Text style={{

                        fontSize: 18,
                        color: COLOURS.black,
                        fontWeight: '500',
                        letterSpacing: 1,
                    }}>
                        Tiền vốn:  {formattedAmount(invest)}
                    </Text>
                    <Text style={{

                        fontSize: 18,
                        color: COLOURS.black,
                        fontWeight: '500',
                        letterSpacing: 1,
                    }}>
                        Lợi nhuận:  {formattedAmount(total - invest)}
                    </Text>
                </View>
            </ScrollView>

        </View>
    );
};

export default Analytics;

const styles = StyleSheet.create({
    head: {
        height: 60,
        backgroundColor: '#f1f8ff',
    },
    text: {
        marginVertical: 6,
        alignSelf: 'center',
    },
});
