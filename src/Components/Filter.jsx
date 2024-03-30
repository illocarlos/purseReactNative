import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Category from '../json/Category.json';
import { Picker } from '@react-native-picker/picker';

const CustomPicker = ({ setfilter, filter, setFilterExpend, expends }) => {
    const [showOptions, setShowOptions] = useState(false);



    useEffect(() => {


        if (filter === "") {
            setFilterExpend([])
        } else {
            const arrayFilter = expends.filter(eachExpend => eachExpend.categoryExpend.name === filter)
            setFilterExpend(arrayFilter)
        }
    }, [filter])


    return (
        <View style={styles.container}>
            <Picker
                selectedValue={filter}
                onValueChange={(value) => {
                    setfilter(value)
                }}
            >
                <Picker.Item
                    style={styles.contaiFilter}
                    label='-- Select category --' value="" />
                {Category.map((category, index) => (
                    <Picker.Item label={category.name} value={category.name} key={index} />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    dropdown: {
        borderWidth: 4,
        borderColor: 'black',
        padding: 10,
        width: 900,
        justifyContent: 'center',
        alignItems: 'center',
    },
    option: {
        fontSize: 15,
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 17,
        fontWeight: '700'
    },
    textTitle: {
        fontSize: 23,
        fontWeight: '700'
    }
});

export default CustomPicker;
