import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, SafeAreaView, Alert } from 'react-native';
import GlobalStyles from '../Styles/Global';
import { Picker } from '@react-native-picker/picker';
import Category from '../json/Category.json';
import { uid } from 'uid';

const FormularyExpend = ({ setexpendModal, handleExpend, setOneExpend, oneExpend }) => {
    const [nameExpend, setNameExpend] = useState("");
    const [cuantityExpend, setCuantityExpend] = useState("");
    const [categoryExpend, setCategoryExpend] = useState("");
    const [date, setDate] = useState("");
    const [id, setId] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (Object.keys(oneExpend).length > 0) {
            setNameExpend(oneExpend.nameExpend);
            setCuantityExpend(oneExpend.cuantityExpend);
            setCategoryExpend(oneExpend.categoryExpend.name);
            setDate(oneExpend.date);
            setId(oneExpend.id);
            setIsEdit(true);
        } else {
            setNameExpend("");
            setCuantityExpend("");
            setCategoryExpend("");
            setIsEdit(false);
        }
    }, [oneExpend]);

    const handleCategoryChange = (value) => {
        setCategoryExpend(value);
    };

    const handleSubmit = () => {



        if (!nameExpend || !cuantityExpend || !categoryExpend) {
            return Alert.alert(
                "Error",
                "Please fill all the fields",
                ["ok"]
            );
        }
        if (Object.keys(oneExpend).length > 0) {
            const newExpend = {
                id: isEdit ? id : uid(16),
                date: isEdit ? date : Date.now(),
                nameExpend,
                cuantityExpend,
                categoryExpend: { name: categoryExpend },
                isEdit: true
            };
            handleExpend(newExpend);
        } else {
            const newExpend = {
                id: isEdit ? id : uid(16),
                date: isEdit ? date : Date.now(),
                nameExpend,
                cuantityExpend,
                categoryExpend: { name: categoryExpend },
                isEdit: false
            };
            handleExpend(newExpend);
        }




        setNameExpend("");
        setCuantityExpend("");
        setCategoryExpend("");
        setIsEdit(false);
    };

    return (
        <SafeAreaView style={styles.containForm}>
            <Pressable
                style={styles.btnCancel}
                onPress={() => {
                    setexpendModal(false);
                    setOneExpend({});
                }}
            >
                <Text style={styles.textClose}>Close</Text>
            </Pressable>

            <View>
                <Text style={[styles.form_h1, styles.containFormInput]}>
                    {Object.keys(oneExpend).length > 0 ? 'Edit Expend' : 'Add Expend'}
                </Text>
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
                        selectedValue={categoryExpend}
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
                    <Text style={styles.submitTextExpend}>
                        {Object.keys(oneExpend).length > 0 ?
                            'Save Expend' : 'Create Expend'
                        }
                    </Text>
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
