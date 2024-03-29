import React from 'react';
import { Text, Image, View, StyleSheet, Pressable } from 'react-native';
import GlobalStyles from '../Styles/Global';
import { formateDolar } from '../helpers/formateDolar';
import { formateDate } from '../helpers/formateDate';
const dictionaryIcons = {
    Bills: require('../../assets/img/Bills.png'),
    Food: require('../../assets/img/Food.png'),
    Home: require('../../assets/img/Home.png'),
    Leisure: require('../../assets/img/Leisure.png'),
    Health: require('../../assets/img/Health.png'),
    Suspcriptions: require('../../assets/img/Suspcriptions.png'),
}


export const ExpendDetails = ({ expend, setexpendModal, setOneExpend }) => {

    const { nameExpend, cuantityExpend, categoryExpend, date, id } = expend;



    const handleEditModal = () => {
        setexpendModal(true)
        setOneExpend(expend)
    }

    return (
        <Pressable
            onLongPress={handleEditModal}
            style={styles.contain}>
            <Text style={styles.textExpend1}>{nameExpend}</Text>
            <View>
                <Text style={styles.textExpend1}>{formateDate(date)}</Text>
                <Text style={styles.textExpend1}>{formateDolar(cuantityExpend)}</Text>
            </View>
            {categoryExpend &&
                <Image
                    source={dictionaryIcons[categoryExpend.name]}
                    style={styles.image}
                />
            }
        </Pressable>
    );
};

const styles = StyleSheet.create({
    contain: {
        paddingVertical: 10,
        backgroundColor: 'black',
        marginVertical: 20,
        ...GlobalStyles.rowJA,
        alignItems: 'center'
    },
    image: {
        width: 60, // ajusta el ancho según tu preferencia
        height: 60, // ajusta la altura según tu preferencia
    },
    textExpend1: {
        marginVertical: 3,
        textAlign: 'center',
        fontSize: 20,
        ...GlobalStyles.colorPrimary,

    },
});
