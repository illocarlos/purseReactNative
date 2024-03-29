import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import GlobalStyles from '../Styles/Global.js';
import { ExpendDetails } from './ExpendDetails.jsx';
const ExpendList = ({ expends, setexpendModal, setOneExpend }) => {
    return (
        <View >
            <Text style={styles.texth1}>expend</Text>
            {expends.length === 0 ?
                <Text style={styles.texth2}> No expend</Text>
                :
                expends.map(expend => (

                    <ExpendDetails
                        key={expend.id}
                        expend={expend}
                        setexpendModal={setexpendModal}
                        setOneExpend={setOneExpend}
                    />
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({

    texth1: {
        textAlign: 'center',
        ...GlobalStyles.TextApp

    },
    texth2: {
        marginTop: 100,
        textAlign: 'center',
    }
})
export default ExpendList