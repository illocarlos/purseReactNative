import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import GlobalStyles from '../Styles/Global.js';
import { ExpendDetails } from './ExpendDetails.jsx';



const ExpendList = ({ expends,
    setexpendModal,
    setOneExpend,
    filterExpend,
    filter }) => {



    return (
        <View >
            <Text style={styles.texth1}>expend</Text>

            {filter ? filterExpend.map(expend => (
                <ExpendDetails
                    key={expend.id}
                    expend={expend}
                    setexpendModal={setexpendModal}
                    setOneExpend={setOneExpend}
                />
            )) : expends.map(expend => (
                <ExpendDetails
                    key={expend.id}
                    expend={expend}
                    setexpendModal={setexpendModal}
                    setOneExpend={setOneExpend}
                />
            ))
            }
            {expends.length === 0 || filterExpend.length === 0 && (
                <Text style={styles.texth2}> No expend</Text>

            )}
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