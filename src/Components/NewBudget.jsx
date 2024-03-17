import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import GlobalStyles from '../Styles/Global.js';

const NewBudget = ({ budgetFunction, budget, setBudget }) => {




    return (
        <View style={style.containNewBudget}>
            <View style={style.secondContainNewBudget} >
                <Text style={style.textBlack}>define budget</Text>
                <View style={style.inputRow} >
                    <TextInput
                        value={budget.toString()}
                        onChangeText={setBudget}
                        keyboardType="numeric"
                        placeholder="add your budget here"
                        style={style.input}
                        placeholderTextColor={'black'}
                    />
                    <Pressable
                        onPress={() => {
                            budgetFunction(budget)

                        }}
                        style={style.buttonAdd}>
                        <Text style={style.text}>
                            add Budget
                        </Text>
                    </Pressable>


                </View>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    containNewBudget: {
        flex: 1,
        transform: [{ translateY: 50 }],
        ...GlobalStyles.backgroundSecundary
    },
    secondContainNewBudget: {
        borderRadius: 50,
        marginHorizontal: 10,
        transform: [{ translateY: 50 }],
        padding: 50,
        ...GlobalStyles.backgroundPrimary
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