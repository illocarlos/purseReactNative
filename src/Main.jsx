import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, Alert, Text, Pressable, View, Modal, ScrollView } from 'react-native';

// componentes
import Header from './Components/Headers.jsx';
import NewBudget from './Components/NewBudget.jsx';
import ControlBudget from './Components/ControlBudget.jsx';
import GlobalStyles from './Styles/Global.js';
import FormularyExpend from './Components/FormularyExpend.jsx'
import ExpendList from './Components/ExpendList.jsx';
import Filter from './Components/Filter.jsx';



const App = () => {
    const [isValidateBudget, setIsValidateBudget] = useState(false)
    const [budget, setBudget] = useState(0)
    // aabrir y cerrar for
    const [expendModal, setexpendModal] = useState(false)
    //  los gastos
    const [expends, setExpends] = useState([])
    // edit
    const [oneExpend, setOneExpend] = useState({})

    // filtros 
    const [filter, setFilter] = useState("")
    const [filterExpend, setFilterExpend] = useState([])


    useEffect(() => {
        const getBudget = async () => {
            try {
                const BudgetStorage = await AsyncStorage.getItem('budget_storage') ?? 0

                if (BudgetStorage > 0) {
                    setBudget(BudgetStorage)
                    setIsValidateBudget(true)
                }


            } catch (error) {
                console.log(error)
            }
        }

        getBudget()
    }, [])


    useEffect(() => {

        if (isValidateBudget) {

            const saveBudgetStorage = async () => {

                try {
                    await AsyncStorage.setItem('budget_storage', budget)

                } catch (error) {
                    console.log(error)
                }
            }
            saveBudgetStorage()
        }

    }, [isValidateBudget])




    // GASTOS
    useEffect(() => {
        const getExpendStorage = async () => {

            try {
                const expendStorage = await AsyncStorage.getItem('expends_storage') ?? []
                setExpends(expendStorage ? JSON.parse(expendStorage) : [])
            } catch (error) {
                console.log(error)
            }

        }
        getExpendStorage()

    }, [expends])

    useEffect(() => {
        const saveExpendStorage = async () => {

            try {
                await AsyncStorage.setItem('expends_storage', JSON.stringify(expends))
            } catch (error) {
                console.log(error)
            }

        }
        saveExpendStorage()

    }, [expends])






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
            console.log('editandooooo', expend.categoryExpend.name)
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

            <View style={styles.containPost}>
                <ScrollView style={styles.containsecond}>
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
                            <Filter
                                expends={expends}
                                setFilterExpend={setFilterExpend}
                                filter={filter}
                                setfilter={setFilter}
                            />
                            <ExpendList
                                filter={filter}
                                expends={expends}
                                filterExpend={filterExpend}
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
                </ScrollView>
            </View>
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