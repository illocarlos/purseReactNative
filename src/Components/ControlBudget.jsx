import React, { useEffect, useState } from 'react';
import { Pressable, Text, View, StyleSheet, Alert } from 'react-native';
import GlobalStyles from '../Styles/Global.js';
import { Circle } from 'react-native-progress';
import { formateDolar } from '../helpers/formateDolar.js';

const ControlBudget = ({
    budget,
    expends,
    reset
}) => {

    const [aviable, setAviable] = useState(0);
    const [expend, setExpend] = useState(0);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        // Operación para reflejar el gasto 
        const totalExpends = expends.reduce((acc, curr) => acc + parseFloat(curr.cuantityExpend), 0);        // Operación para reflejar lo disponible
        const totalAviable = budget - totalExpends;
        setAviable(totalAviable);
        setExpend(totalExpends);

        // Calcula el porcentaje del gasto
        const calculatedPercentage = ((totalExpends / budget) * 100).toFixed(2); // Redondea a 2 decimales
        setPercentage(parseInt(calculatedPercentage));

    }, [expends, budget]);


    return (
        <View style={styles.contain}>
            <Pressable
                onLongPress={() => {
                    reset()
                }}
            >
                <Text style={styles.textButton}>Reset</Text>
            </Pressable>

            <View style={styles.containPercentage}>
                <Circle
                    borderWidth={0}
                    progress={expend / budget}
                    color='rgba(250, 191, 19, 0.2)'
                    size={300}
                    indeterminate={false}
                    thickness={50}
                    borderCapStyle="round"
                    unfilledColor='#7413FA'
                    animated
                />
                <View style={styles.containPercentageint}>
                    <Text style={styles.NumberPercentage}>{percentage}%</Text>
                    <Text style={styles.textPercentage} >Used balance</Text>
                </View>
            </View>

            <Text style={styles.textButton}>
                budget: {formateDolar(budget)}
            </Text>
            <Text style={styles.textButton}>
                available: {formateDolar(aviable)}
            </Text>
            <Text style={styles.textButton}>
                expenditure: {formateDolar(expend)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    contain: {
        height: 500,
        alignItems: 'center',
        ...GlobalStyles.backgroundSecundary,
    },
    textButton: {
        ...GlobalStyles.TextApp,
        ...GlobalStyles.colorPrimary,
    },
    containPercentage: {
        marginVertical: 10,
        position: 'relative',
    },

    containPercentageint: {
        position: 'absolute',
        width: '90%',
        top: '42%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
    NumberPercentage: {
        ...GlobalStyles.colorPrimary,
        textAlign: 'center',
        fontSize: 50,
        fontWeight: '800',
    },
    textPercentage: {
        ...GlobalStyles.colorPrimary,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '800',
    }
});

export default ControlBudget;
