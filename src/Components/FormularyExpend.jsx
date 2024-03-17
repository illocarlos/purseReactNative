import React from 'react'
import { Pressable, SafeAreaView, Text } from 'react-native'

const FormularyExpend = ({ setexpendModal }) => {
    return (
        <SafeAreaView>

            <Pressable
                onPress={() => {
                    setexpendModal(false)
                }}
            >

                <Text>close</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default FormularyExpend