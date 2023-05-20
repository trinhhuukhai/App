import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { COLOURS } from '../../../database/Database';
import { getPaymentTotal } from '../../../redux/reducer/OrderReducer';

const Analytics = () => {

    const auth = useSelector((state) => state.auth?.data);
    const shopId = auth?.shopId;
    const [isLoading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [invest, setInvest] = useState(0);


    useEffect(() => {
        getTotal();
    }, []);

    const getTotal = async () => {

        setLoading(true);
        const response = await getPaymentTotal(shopId);
        if (response === '') {
            setLoading(false);
        } else {
            let total = 0;
            let von = 0;
            if (Array.isArray(response.data)) {
                response.data.forEach(item => {
                    total += item.total;
                });
            }

            if (Array.isArray(response.data)) {
                response.data.forEach(item => {
                    von += item.invest;
                });
            }

            setTotal(total);
            setInvest(von)
            setLoading(false);
        }
    };

    const screenWidth = Dimensions.get("window").width;

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Rainy Days"] // optional
    };

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


                }}>Thống kê doanh thu</Text>

            </View>
{/* 
            <View style={{
                padding: 10
            }}>
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                />
            </View> */}
            <View style={{
                justifyContent:'center',
                alignContent:'center',
                alignItems:'center',
                marginTop:20
            }}>
                <Text style={{
                    fontWeight:'bold',
                    fontSize:18
                }}>Tổng doanh thu: {total} VND</Text>
                <Text style={{
                    fontWeight:'bold',
                    fontSize:18
                }}>Tiền vốn: {invest} VND</Text>
                <Text style={{
                    fontWeight:'bold',
                    fontSize:18
                }}>Lợi nhuận: {total - invest} VND</Text>
             
            </View>

        </View>
    );
};

export default Analytics;
