import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, SafeAreaView } from 'react-native';
import GlobalStyles from '../Styles/Global';
import { Picker } from '@react-native-picker/picker';
import Category from '../json/Category.json';
import { uid } from 'uid';

const FormularyExpend = ({ setexpendModal, handleExpend }) => {
    const [nameExpend, setNameExpend] = useState("");
    const [cuantityExpend, setCuantityExpend] = useState("");
    const [categoryExpend, setCategoryExpend] = useState(""); // Estado para la categoría completa

    const handleCategoryChange = (value) => {
        const selectedCategory = Category.find(category => category.name === value);
        setCategoryExpend(selectedCategory);
    };

    const handleSubmit = () => {
        if (!nameExpend || !cuantityExpend || !categoryExpend) {
            console.log("Please fill all the fields.");
            return;
        }

        handleExpend({
            id: uid(16),
            nameExpend,
            cuantityExpend,
            categoryExpend,
        });

        // Limpiar los campos después de agregar el gasto
        setNameExpend("");
        setCuantityExpend("");
        setCategoryExpend(null);
    };

    return (
        <SafeAreaView style={styles.containForm}>
            <Pressable
                style={styles.btnCancel}
                onPress={() => setexpendModal(false)}
            >
                <Text style={styles.textClose}>Close</Text>
            </Pressable>

            <View>
                <Text style={[styles.form_h1, styles.containFormInput]}>Add Expend</Text>

                <View style={[styles.containFormInput, styles.containFormInput]}>
                    <Text style={styles.textForm}>Name Expend</Text>
                    <TextInput
                        value={nameExpend}
                        onChangeText={setNameExpend}
                        style={styles.containTextInputForm}
                        placeholder='Add expend example food'
                    />
                </View>

                <View style={[styles.containFormInput, styles.containFormInput]}>
                    <Text style={styles.textForm}>Cuantity</Text>
                    <TextInput
                        value={cuantityExpend}
                        onChangeText={setCuantityExpend}
                        style={styles.containTextInputForm}
                        keyboardType='numeric'
                        placeholder='Add cuantity example 400'
                    />
                </View>

                <View>
                    <Text style={styles.textForm}>Category expend</Text>
                    <Picker
                        selectedValue={categoryExpend ? categoryExpend.name : ''}
                        onValueChange={handleCategoryChange}
                    >
                        <Picker.Item label='-- Select category --' value="" />
                        {Category.map((category, index) => (
                            <Picker.Item label={category.name} value={category.name} key={index} />
                        ))}
                    </Picker>
                </View>

                <Pressable
                    style={styles.submitbtnExpend}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitTextExpend}>Create Expend</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

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
        width: 230,
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
});

export default FormularyExpend;
