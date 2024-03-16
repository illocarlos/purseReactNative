import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import Header from './Components/Headers.jsx';
import NewBudget from './Components/NewBudget.jsx';
import ControlBudget from './Components/ControlBudget.jsx';

const App = () => {
    const [isValidateBudget, setIsValidateBudget] = useState(false)



    const budgetFunction = (budget) => {
        if (Number(budget)) {
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
                <NewBudget budgetFunction={budgetFunction} />
            ) : (
                <ControlBudget
                    setIsValidateBudget={setIsValidateBudget} />
            )}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    contain: {
        backgroundColor: '#FABF13',
        flex: 1
    }
})

export default App