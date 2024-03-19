import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import GlobalStyles from '../Styles/Global';
import { formateDolar } from '../helpers/formateDolar';


export const ExpendDetails = ({ expend }) => {

    const { nameExpend, cuantityExpend, categoryExpend, id } = expend;
    console.log('desde detalleesss', expend)
    return (
        <View style={styles.contain}>
            <Text>{nameExpend}</Text>
            {categoryExpend &&
                <Image
                    style={{ width: 100, height: 100 }}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    contain: {
        marginVertical: 20,
        ...GlobalStyles.rowJA
    },
    image: {
        width: 100, // ajusta el ancho según tu preferencia
        height: 100, // ajusta la altura según tu preferencia
    }
});
