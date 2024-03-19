import React, { useEffect, useState } from 'react'
import { Pressable, Text, View, StyleSheet, Image } from 'react-native'
import GlobalStyles from '../Styles/Global.js';
import { formateDolar } from '../helpers/formateDolar.js';

const ControlBudget = ({ setIsValidateBudget, budget, expends }) => {
    const [aviable, setAviable] = useState(0)
    const [expend, setExpend] = useState(0)

    useEffect(() => {
        //operacion  para relfejar el gasto 
        const totalExpends = expends.reduce((acc, curr) => acc + curr.total, 0);
        //operacion para reflejar lo disponibel
        const totalAviable = budget - totalExpends



        setAviable(totalAviable)
        setExpend(totalExpends)

    }, [])

    return (

        <View style={styles.contain}>
            <Pressable
                onPress={() => {
                    setIsValidateBudget(false)
                }}
            >
                <Text style={styles.textButton}>
                    close
                </Text>
            </Pressable>
            <Image
                source={require('../../assets/img/grafico.jpg')}
            />
            <Text style={styles.textButton}>
                budget:{"  "} {formateDolar(budget)}
            </Text>
            <Text style={styles.textButton}>
                aviliable:{"  "} {formateDolar(aviable)}
            </Text>
            <Text style={styles.textButton}>
                expend: {"  "}{formateDolar(expend)}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    contain: {
        height: 500,
        alignItems: 'center',
        ...GlobalStyles.backgroundSecundary,
    },
    textButton: {

        ...GlobalStyles.TextApp,
        ...GlobalStyles.colorPrimary,
    }
})
export default ControlBudget


