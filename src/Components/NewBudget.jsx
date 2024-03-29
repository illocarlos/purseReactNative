import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import GlobalStyles from '../Styles/Global.js';

const NewBudget = ({ budgetFunction, budget, setBudget }) => {




    return (
        <View style={styles.containNewBudget}>
            <View style={styles.secondContainNewBudget} >
                <Text style={styles.textBlack}>define budget</Text>
                <View style={styles.inputRow} >
                    <TextInput
                        value={budget.toString()}
                        onChangeText={setBudget}
                        keyboardType="numeric"
                        placeholder="add your budget here"
                        style={styles.input}
                        placeholderTextColor={'black'}
                    />
                    <Pressable
                        onPress={() => {
                            budgetFunction(budget)

                        }}
                        style={styles.buttonAdd}>
                        <Text style={styles.text}>
                            add Budget
                        </Text>
                    </Pressable>


                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    containNewBudget: {
        flex: 1,
        height: 1000,
        transform: [{ translateY: 50 }],
        ...GlobalStyles.backgroundSecundary,

    },
    secondContainNewBudget: {
        borderRadius: 50,
        marginHorizontal: 10,
        transform: [{ translateY: 50 }],
        padding: 50,
        ...GlobalStyles.backgroundPrimary,
    },
    buttonAdd: {
        width: 130,
        padding: 4,
        borderRadius: 20,
        ...GlobalStyles.backgroundSecundary
    },
    text: {
        textAlign: 'center',
        marginTop: 3,
        fontSize: 18,
        ...GlobalStyles.colorPrimary,
        fontWeight: 'bold'

    },
    textBlack: {
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: 4,
        fontSize: 25,
        fontWeight: '900',
        ...GlobalStyles.colorSecundary
    },
    inputRow: {
        marginTop: 20,
        ...GlobalStyles.rowJB
    },
    input: {
        width: 160,
        paddingBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'black',

    }
})

export default NewBudget