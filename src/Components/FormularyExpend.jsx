import { useState } from 'react'
import { Pressable, SafeAreaView, Text, View, StyleSheet, TextInput } from 'react-native'
import GlobalStyles from '../Styles/Global'
import { Picker } from '@react-native-picker/picker'
import Category from '../json/Category.json'
const FormularyExpend = ({ setexpendModal, handleExpend }) => {


    const [nameExpend, setNameExpend] = useState("")
    const [cuantityExpend, setCuantityExpend] = useState("")
    const [categoryExpend, setCategoryExpend] = useState("")


    return (
        <SafeAreaView style={styles.containForm}  >
            {/* boton de cierre de formulario  */}
            <Pressable
                style={styles.btnCancel}
                onPress={() => {
                    setexpendModal(false)
                }}
            >
                <Text style={styles.textClose}>close</Text>
            </Pressable>

            {/* formulario para crear gastos */}
            <View  >

                <Text style={[styles.form_h1, styles.containFormInput]}>Add Expend</Text>


                <View style={[styles.containFormInput, styles.containFormInput]}>

                    <Text style={styles.textForm}>Name Expend</Text>

                    <TextInput
                        value={nameExpend}
                        onChangeText={setNameExpend}
                        style={styles.containTextInputForm}
                        placeholder='add expend example food'
                    />


                </View>
                <View style={[styles.containFormInput, styles.containFormInput]}>

                    <Text style={styles.textForm}>Cuantity</Text>
                    <TextInput
                        value={cuantityExpend}
                        onChangeText={setCuantityExpend}
                        style={styles.containTextInputForm}
                        keyboardType='numeric'
                        placeholder='add cuantity example 400'
                    />
                </View>
                <View>

                    {/* realizamos un selector multiple generamos un JSON del que traemos la info y la elevamos si tenemos que introducir mas
                    categorias solamente la creamos en el json y atumaticamente con el foreach recorremos el json */}
                    <Text style={styles.textForm}>Category expend</Text>
                    <Picker
                        selectedValue={categoryExpend}
                        onValueChange={(value) => {
                            setCategoryExpend(value)
                        }} >
                        <Picker.Item label='-- select category --' value="" />
                        {
                            Category.map((category) => (

                                <Picker.Item label={category.name} value={category.name} />

                            ))

                        }
                    </Picker>
                </View>

                <Pressable
                    style={styles.submitbtnExpend}
                    onPress={() => {
                        handleExpend({

                            nameExpend,
                            cuantityExpend,
                            categoryExpend
                        })
                    }}
                >
                    <Text style={styles.submitTextExpend}>Create Expend</Text>
                </Pressable>

            </View>
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    form_h1: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    containForm: {
        ...GlobalStyles.backgroundPrimary,
        flex: 1,
    },
    textForm: {
        textAlign: 'center',
        ...GlobalStyles.TextApp
    },
    containFormInput: {
        marginTop: 20,
    },
    containTextInputForm: {
        width: 2300,
        fontSize: 20,
        marginHorizontal: 100,

    },
    submitbtnExpend: {
        marginVertical: 10,
        height: 50,
        ...GlobalStyles.backgroundSecundary,
        alignItems: 'center',
        ...GlobalStyles.rowJC
    },
    submitTextExpend: {
        fontSize: 30,
        ...GlobalStyles.colorPrimary
    },
    btnCancel: {
        ...GlobalStyles.btnClose
    },
    textClose: {
        ...GlobalStyles.textClose
    }

})
export default FormularyExpend