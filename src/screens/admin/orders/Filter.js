import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
const Filter = () => {
    const navigation = useNavigation();
    useEffect(() => {


        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity>
                    <Text>CHon</Text>
                </TouchableOpacity>
            ),
        });
    }, []);

    const [checked, setChecked] = useState('first');

    return (
        <View style={{
            flex: 1
        }}>
            <View style={{  alignItems: 'center' }}>
                <Text style={{ flex: 1 }}>Theo Tuan</Text>
                <RadioButton
                    value="first"
                    status={checked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('first')}

                    color='red'
                />
            </View>

            <RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('second')}
            />
        </View>
    );
};

export default Filter