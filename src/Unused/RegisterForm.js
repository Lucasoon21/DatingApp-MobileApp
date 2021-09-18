
import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as yup from 'yup';
import FormInput from '../control/FormInput';


const validationSchema = yup.object({
    //email: yup.string().trim().min(3,'Nieprawidlowy mail').required('email jest wymagany')
    email: yup.string().email(3, 'Nieprawidlowy mail').required('email jest wymagany'),
    password: yup.string().trim().min(6, 'Haslo jest za krotkie').required('haslo jest wymagane'),
    confirmPassword: yup.string().equals([yup.ref('password'), null], 'Hasla sa rozne')

})

let schema = yup.object().shape({
    email: yup.string().email('Nieprawidlowy mail').required('email jest wymagany'),
    password: yup.string().trim().min(6, 'Haslo jest za krotkie').required('haslo jest wymagane'),
    confirmPassword: yup.string().equals([yup.ref('password'), null], 'Hasla sa rozne'),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });




const RegisterForm = () => {



    return (
        <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validateOnMount={true}
            onSubmit={values => console.log(values)}
            validationSchema={schema}
        >
            {({ handleSubmit, handleChange, handleBlur, errors }) => (
                <>

                    <TextInput
                        label="E-mail"
                        placeholder="Wpisz e-mail..."
                        style={styles.input}
                        onChangeText={handleChange('email')}
                        value={values.email}
                    />
                    <Text style={{ color: 'red',backgroundColor: 'blue' }}>
                        {errors.email}
                    </Text>

                    <TextInput
                        mode="outlined"
                        label="Hasło"
                        placeholder="Wpisz hasło..."
                        style={styles.input}
                        secureTextEntry
                        right={<TextInput.Icon name="eye" />}
                        onChangeText={handleChange('password')}
                        value={values.password}

                    />
                    <Text style={{ color: 'red' }}>
                        {errors.password}
                    </Text>
                    <TextInput
                        mode="outlined"
                        label="Potwierdz hasło"
                        placeholder="Wpisz hasło..."
                        style={styles.input}
                        secureTextEntry
                        right={<TextInput.Icon name="eye" />}
                        onChangeText={handleChange('confirmPassword')}
                        value={values.confirmPassword}


                    />
                    <Text style={{ color: 'red' }}>
                        {errors.confirmPassword}
                    </Text>
                    <Button
                        type="submit"
                        title="submit"
                        onPress={handleSubmit}
                    >
                        wyslijx
                    </Button>

                </>
            )}
        </Formik>
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
