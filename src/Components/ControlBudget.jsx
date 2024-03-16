import React from 'react'
import { Pressable, Text, View } from 'react-native'


const ControlBudget = ({ setIsValidateBudget }) => {
    return (
        <View>
            <Pressable
                onPress={() => {
                    setIsValidateBudget(false)
                }}
            >
                <Text>
                    cerrar
                </Text>
            </Pressable>
            <Text> desde contorl</Text>
        </View>
    )
}
export default ControlBudget


