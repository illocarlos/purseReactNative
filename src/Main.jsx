import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Alert, Text, Pressable, View, Modal } from 'react-native';
import Header from './Components/Headers.jsx';
import NewBudget from './Components/NewBudget.jsx';
import ControlBudget from './Components/ControlBudget.jsx';
import GlobalStyles from './Styles/Global.js';
import FormularyExpend from './Components/FormularyExpend.jsx'
const App = () => {
    const [isValidateBudget, setIsValidateBudget] = useState(false)
    const [expendModal, setexpendModal] = useState(false)
    const [budget, setBudget] = useState(0)
    const [expends, setExpends] = useState([])


    const budgetFunction = (budget) => {
        if (Number(budget) && Number(budget) > 0) {
            Alert.alert(
                `the budget is ${budget}$  `,
                'is correct?',
                [{ text: 'cancel', onPress: () => { } },
                {
                    text: 'add budget', onPress: () => {
                        parseInt(budget)
                        setIsValidateBudget(true)

                    }
                }]
            )



        } else {
            return Alert.alert('budget no validate, add a budget ')
        }

    }



    return (
        <SafeAreaView style={styles.contain}>
            <Header />
            {!isValidateBudget ? (
                <NewBudget
                    budget={budget}
                    setBudget={setBudget}
                    budgetFunction={budgetFunction} />
            ) : (


                <ControlBudget
                    expends={expends}
                    budget={budget}
                    setIsValidateBudget={setIsValidateBudget} />

            )}




            {expendModal && (

                <Modal
                    animationType='slide'
                >
                    <FormularyExpend
                        setexpendModal={setexpendModal} />
                </Modal>
            )}

            {isValidateBudget &&
                (
                    <View style={styles.displayButtom}>
                        <Pressable
                            onPress={() => {
                                setexpendModal(!expendModal)
                            }}
                        >
                            <View style={styles.buttonAddExpend}>
                                <Text style={styles.text}>+</Text>
                            </View>
                        </Pressable>
                    </View>


                )}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        ...GlobalStyles.backgroundPrimary,
    },
    text: {
        fontSize: 47,
        ...GlobalStyles.colorPrimary,

    },
    buttonAddExpend: {
        marginTop: 5,
        marginRight: 30,
        width: 60,
        height: 60,
        borderRadius: 100,
        ...GlobalStyles.backgroundSecundary,
        ...GlobalStyles.rowJC,
    },
    displayButtom: {
        ...GlobalStyles.rowJE,
    }

})

export default App