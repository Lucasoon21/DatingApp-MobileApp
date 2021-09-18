import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const FormInput = props => {
    const { placeholder, label, error } = props;
    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <Text style={{ fontWeight: 'bold' }}>
                    {label}
                </Text>
                {error ? <Text style={{ color: 'red', fontSize: '16px' }}>
                    {error}
                </Text> : null}
            </View>

            <TextInput
                {...props}
                mode="outlined"
                label={label}
                placeholder={placeholder}
                style={styles.input}
                onChangeText={handleChange('email')}
            //1598051730000 onBlur={handleBlur('email')}

            //value={values.email}
            />

        </>
    );
}
const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
    },
    input: {
        maxHeight: 50,
        width: 330,
        marginBottom: 20,
    },
    forgot_password: {
        textAlign: 'right',
        width: 200,
    },
    registerLink: {
        flexDirection: 'row',
        width: 400,
        textAlign: 'right',
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerButton: {
        color: 'blue',
    },
    loginButton: {
        width: 330,
    },
    birthdayInput: {
        width: 100,
        backgroundColor: '#f0f0f0',
        margin: 2,
    },
    birthdayInputYear: {
        width: 130,
        backgroundColor: '#f0f0f0',
    },
    birthdayInputGroup: {
        flexDirection: 'row',
        width: 400,
        textAlign: 'right',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
