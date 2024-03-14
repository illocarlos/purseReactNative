import { SafeAreaView, StyleSheet } from 'react-native';
import Header from './Components/Headers.jsx'
import NewBudget from './Components/NewBudget.jsx';
const App = () => {
    return (
        <SafeAreaView style={style.contain}>
            <Header />
            <NewBudget />
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