import { Text, View, StyleSheet } from "react-native";
import GlobalStyles from '../Styles/Global.js';

const App = () => {
    return (
        <View >
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
        fontSize: 30,
        ...GlobalStyles.colorSecundary,
    }
})

export default App