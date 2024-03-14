import { Text, View, StyleSheet } from "react-native";

const App = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>
                planificator of expend

            </Text>
        </View>
    );
}
const styles = StyleSheet.create({

    text: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '900',
        color: 'black',
        fontSize: 30,
    }
})

export default App