import React, { useEffect, useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import GlobalStyles from '../Styles/Global.js';
import { Circle } from 'react-native-progress';
import { formateDolar } from '../helpers/formateDolar.js';

const ControlBudget = ({ setIsValidateBudget, budget, expends }) => {
    const [aviable, setAviable] = useState(0);
    const [expend, setExpend] = useState(0);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        // Operación para reflejar el gasto 
        const totalExpends = expends.reduce((acc, curr) => acc + parseInt(curr.cuantityExpend), 0);
        // Operación para reflejar lo disponible
        const totalAviable = budget - totalExpends;
        setAviable(totalAviable);
        setExpend(totalExpends);

        // Calcula el porcentaje del gasto
        const calculatedPercentage = (totalExpends / budget) * 100;
        setPercentage(parseInt(calculatedPercentage));

    }, [expends, budget]);

    return (
        <View style={styles.contain}>
            <Pressable
                onPress={() => setIsValidateBudget(false)}
            >
                <Text style={styles.textButton}>close</Text>
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
                <Text style={styles.textPercentage}>{percentage}%</Text>
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
    textPercentage: {
        position: 'absolute',
        top: '47%',
        left: '25%',
        transform: [{ translateX: 5 }, { translateY: -25 }],
        ...GlobalStyles.colorPrimary,
        fontSize: 50,
        fontWeight: '800',
    }
});

export default ControlBudget;
