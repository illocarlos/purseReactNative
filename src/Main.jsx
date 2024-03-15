import { SafeAreaView, StyleSheet } from 'react-native';
import Header from './Components/Headers.jsx'
import NewBudget from './Components/NewBudget.jsx';
const App = () => {



    const budgetFunction = (budget) => {

        if (Number(budget)) {
            parseInt(budget)
            console.log(budget)
        }

    }
    return (
        <SafeAreaView style={style.contain}>
            <Header />
            <NewBudget
                budgetFunction={budgetFunction}
            />
        </SafeAreaView>
    );
}
const style = StyleSheet.create({
    contain: {
        backgroundColor: '#FABF13',
        flex: 1
    }
})

export default App