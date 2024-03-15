import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { useState } from 'react';

const NewBudget = ({ budgetFunction }) => {


    const [budget, setBudget] = useState(0)


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
        backgroundColor: 'black',
        flex: 1,
        transform: [{ translateY: 50 }]
    },
    secondContainNewBudget: {
        borderRadius: 50,
        marginHorizontal: 10,
        transform: [{ translateY: 50 }],
        padding: 50,
        backgroundColor: '#FABF13',
    },
    buttonAdd: {
        width: 130,
        padding: 4,
        backgroundColor: 'black',
        borderRadius: 20,
    },
    text: {
        textAlign: 'center',

        fontSize: 18,
        color: '#FABF13',
        fontWeight: 'bold'

    },
    textBlack: {
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: 4,
        fontSize: 25,
        color: 'black',
        fontWeight: '900'

    },
    inputRow: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
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