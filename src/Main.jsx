import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Alert, Text, Pressable, View, Modal, ScrollView } from 'react-native';
import Header from './Components/Headers.jsx';
import NewBudget from './Components/NewBudget.jsx';
import ControlBudget from './Components/ControlBudget.jsx';
import GlobalStyles from './Styles/Global.js';
import FormularyExpend from './Components/FormularyExpend.jsx'
import ExpendList from './Components/ExpendList.jsx';
const App = () => {
    const [isValidateBudget, setIsValidateBudget] = useState(false)
    const [expendModal, setexpendModal] = useState(false)
    const [budget, setBudget] = useState(0)
    const [expends, setExpends] = useState([])
    const [oneExpend, setOneExpend] = useState({})

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

    // crear y editar gasto
    const handleExpend = expend => {
        // {
        // id:2
        //IMPORTANTE Object.value => este revisa el valor en este caso el lado recehro (2)
        //IMPORTANTE Object.Keys=>este revisa la clave de los objetos el lado izquiero (id)
        if ([expend.cuantityExpend, expend.nameExpend, expend.categoryExpend.name].includes('')) {
            return Alert.alert(
                "Error",
                "rellena todo los campos",
                ["ok"]

            )
        }

        if (expend.isEdit) {
            console.log('editandooooo', expend)
            const editExpend = expends.map(eachExpend => eachExpend.id === expend.id ? expend : eachExpend)
            setExpends(editExpend)
        } else {
            console.log('creando')
            setExpends([...expends, expend])
        }
        setexpendModal(!expendModal)
    }

    // eliminar gasto
    const deletedExpend = (id) => {
        console.log('oeee', id)
        Alert.alert(
            'do you want deleted this expend?',
            'is correct?',
            [{ text: 'cancel', onPress: () => { } },
            {
                text: 'deleted', onPress: () => {
                    deleted(id)
                }
            }]
        )
    }

    // funcio para eliminarlo
    const deleted = (id) => {
        const deletedExpend = expends.filter(eachExpend => eachExpend.id !== id)
        setExpends(deletedExpend)
        setexpendModal(!expendModal)
        setOneExpend({})

    }


    return (
        <SafeAreaView style={styles.contain}>


            <Header />
            <ScrollView style={styles.containsecond}>

                <View style={styles.containPost}>
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

                    {isValidateBudget && (
                        <View style={styles.contain}>

                            <ExpendList
                                expends={expends}
                                setexpendModal={setexpendModal}
                                setOneExpend={setOneExpend}
                            />
                        </View>
                    )}


                    {expendModal && (

                        <Modal
                            animationType='slide'
                        >
                            <FormularyExpend
                                handleExpend={handleExpend}
                                setexpendModal={setexpendModal}
                                setOneExpend={setOneExpend}
                                oneExpend={oneExpend}
                                deletedExpend={deletedExpend}
                            />
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
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        ...GlobalStyles.backgroundPrimary,
    },
    containPost: {
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
    },

    containscroll: {
        flex: 1,
        backgroundColor: 'black'
    }

})

export default App