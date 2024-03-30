import React, { useState, useEffect } from 'react';
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
    const [isValidateBudget, setIsValidateBudget] = useState(false);
    // cracion budget
    const [budget, setBudget] = useState(0)

    // abrir cerrar modal
    const [expendModal, setexpendModal] = useState(false);

    // filter
    // donde se veran los filtros 
    const [filter, setFilter] = useState("");
    // array de los gastos filtrados
    const [filterExpend, setFilterExpend] = useState([]);

    // objeto para editar los gastos
    const [oneExpend, setOneExpend] = useState({});
    // aqui introducimos los gastos
    const [expends, setExpends] = useState([]);

    useEffect(() => {
        const getBudget = async () => {
            try {
                const BudgetStorage = await AsyncStorage.getItem('budget_storage');
                if (BudgetStorage !== null && parseFloat(BudgetStorage) > 0) {
                    setBudget(parseFloat(BudgetStorage));
                    setIsValidateBudget(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getBudget();
    }, []);

    useEffect(() => {
        const saveBudgetStorage = async () => {
            try {
                await AsyncStorage.setItem('budget_storage', budget.toString());
            } catch (error) {
                console.log(error);
            }
        }

        if (isValidateBudget) {
            saveBudgetStorage();
        }
    }, [budget, isValidateBudget]);

    useEffect(() => {
        const getExpendStorage = async () => {
            try {
                const expendStorage = await AsyncStorage.getItem('expends_storage') ?? '[]';
                setExpends(JSON.parse(expendStorage));
            } catch (error) {
                console.log(error);
            }
        }
        getExpendStorage();
    }, []);

    useEffect(() => {
        const saveExpendStorage = async () => {
            try {
                await AsyncStorage.setItem('expends_storage', JSON.stringify(expends));
            } catch (error) {
                console.log(error);
            }
        }
        saveExpendStorage();
    }, [expends]);

    const budgetFunction = (budget) => {
        if (Number(budget) && Number(budget) > 0) {
            Alert.alert(
                `The budget is ${budget}$`,
                'Is correct?',
                [
                    { text: 'Cancel', onPress: () => { } },
                    { text: 'Add budget', onPress: () => { setBudget(parseInt(budget)); setIsValidateBudget(true); } }
                ]
            );
        } else {
            Alert.alert('Budget not valid, add a budget');
        }
    }

    const handleExpend = (expend) => {
        if ([expend.cuantityExpend, expend.nameExpend, expend.categoryExpend.name].includes('')) {
            Alert.alert("Error", "Fill in all fields", ["Ok"]);
            return;
        }

        if (expend.isEdit) {
            const editExpend = expends.map(eachExpend => eachExpend.id === expend.id ? expend : eachExpend);
            setExpends(editExpend);
        } else {
            setExpends([...expends, expend]);
        }
        setexpendModal(!expendModal);
    }

    const deletedExpend = (id) => {
        Alert.alert(
            'Do you want to delete this expense?',
            'Is correct?',
            [
                { text: 'Cancel', onPress: () => { } },
                { text: 'Delete', onPress: () => { deleted(id); } }
            ]
        );
    }

    const deleted = (id) => {

        const deletedExpend = expends.filter(eachExpend => eachExpend.id !== id);
        setExpends(deletedExpend);
        setFilterExpend(deletedExpend)

        setexpendModal(!expendModal);
        setOneExpend({});
    }


    const reset = () => {

        Alert.alert(
            'Do you want reset this planificator?',
            'Is correct?',
            [
                { text: 'Cancel', onPress: () => { } },
                {
                    text: 'Delete', onPress: async () => {
                        try {
                            await AsyncStorage.clear()

                            setIsValidateBudget(false)
                            setBudget(0)
                            setExpends([])
                        } catch (error) {
                            console.log(error)
                        }

                    }
                }
            ]
        );



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
                            setFilterExpend={setFilterExpend}
                            reset={reset}
                        />


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