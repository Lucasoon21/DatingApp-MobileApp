import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { DatePickerModal } from 'react-native-paper-dates';
import 'intl';
import 'intl/locale-data/jsonp/en';
//import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import { Picker } from '@react-native-picker/picker';
import { NativeRouter, Route, Link, useHistory } from "react-router-native";
import AuthenticationService, { login } from '../../service/AuthenticationService';

const RegisterPanel = (props) => {

    let schema = yup.object().shape({
        email: yup.string().email('Nieprawidlowy email').required('email jest wymagany'),
        password: yup.string().trim().min(6, 'Haslo jest za krotkie').required('haslo jest wymagane'),
        confirmPassword: yup.string().equals([yup.ref('password'), null], 'Hasla sa rozne'),
       // name: yup.string().min(2, 'imię jest za krótkie').max(50, 'Imię jest za długie!').required('imię jest wymagane')
        // dateBirth: yup.date().required('Data urodzenia jest wymagana').nullable(),
        
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const history = useHistory();

    const register = async (values) => {
        console.log("Dane: "+values.email+" "+values.password)
        const response = await AuthenticationService.register(values.email, values.password)
        if(response.status==200 || response.status==202){
            console.log("dane prawidłowe")
            history.push("/RegisterDetail")
        }
        else {
            console.log("Nieprawidłowe dane")
        }
        console.log(response.data)

       // history.push("/Main")

    }

    return (
        <View>
            <Formik
                initialValues={{ email: "", password: "", confirmPassword: ""}}
                //onSubmit={async values => {// history.push("/Main")}}
                onSubmit={values => register(values)}

                validateOnMount={true}
                validationSchema={schema}
            >
                {({ handleSubmit, handleChange, handleBlur, errors, values, touched }) => (
                    <>
                        <TextInput
                            mode="outlined"
                            label="E-mail"
                            placeholder="Wpisz e-mail..."
                            style={styles.input}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            right={<TextInput.Icon name={!errors.email ? "check" : "close"} />}
                        />
                        {(errors.email && touched.email) &&
                            <Text style={{ color: 'red', minHeight: 20, width: 300, }}>
                                {errors.email}
                            </Text>
                        }

                        <TextInput
                            mode="outlined"
                            label="Hasło"
                            placeholder="Wpisz hasło..."
                            style={styles.input}
                            secureTextEntry={!showPassword}
                            right={<TextInput.Icon name={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        {(errors.password && touched.password) &&
                            <Text style={{ color: 'red', minHeight: 20, width: 300, }}>
                                {errors.password}
                            </Text>
                        }

                        <TextInput
                            mode="outlined"
                            label="Potwierdz hasło"
                            placeholder="Wpisz hasło..."
                            style={styles.input}
                            secureTextEntry={!showConfirmPassword}
                            right={<TextInput.Icon name={showConfirmPassword ? "eye-off" : "eye"} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                        />

                        {(errors.confirmPassword && touched.confirmPassword) &&
                            <Text style={{ color: 'red', minHeight: 20, width: 300, }}>
                                {errors.confirmPassword}
                            </Text>
                        }

                        <Button
                            type="submit"
                            title="submit"
                            onPress={handleSubmit}
                            mode="contained"
                        >
                            Wyślij
                        </Button>

                    </>
                )}
            </Formik>
        </View>
    );
};
export default RegisterPanel;


const styles = StyleSheet.create({
    pickerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        maxHeight: 60,
        borderColor: 'silver',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
        backgroundColor: 'rgba(245, 245, 245, 0.9)',
        minHeight: 60,
        marginBottom: 20

    },
    pickerStyle: {
        width: 330,
        height: 50,
        borderColor: 'red',
        borderWidth: 2,
        maxHeight: 50,
    },

    input: {
        maxHeight: 50,
        width: 330,
        marginBottom: 20,
    }
});
/*
                     <Button onPress={showMode} title="Show date picker!" style={styles.loginButton} mode="contained" >
                            {date ? "Wybierz date" : "elo"}
                        </Button>
                        {show && (
                            <DateTimePicker
                                locale={'pl'}
                                testID="dateTimePicker"
                                value={values.dateBirth}
                                mode={"date"}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />

*/



/*
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { DatePickerModal } from 'react-native-paper-dates';
import 'intl';
import 'intl/locale-data/jsonp/en';
//import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import { Picker } from '@react-native-picker/picker';
import { NativeRouter, Route, Link, useHistory } from "react-router-native";
import AuthenticationService, { login } from '../../service/AuthenticationService';

const RegisterPanel = (props) => {

    let schema = yup.object().shape({
        /*email: yup.string().email('Nieprawidlowy email').required('email jest wymagany'),
        password: yup.string().trim().min(6, 'Haslo jest za krotkie').required('haslo jest wymagane'),
        confirmPassword: yup.string().equals([yup.ref('password'), null], 'Hasla sa rozne'),
        name: yup.string().min(2, 'imię jest za krótkie').max(50, 'Imię jest za długie!').required('imię jest wymagane')
        // dateBirth: yup.date().required('Data urodzenia jest wymagana').nullable(),
       
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const onDismissSingle = () => {
        setOpen(false);
    }

    const onConfirmSingle = (params) => {
        setOpen(false);
        setDate(params.date);
    };

    const [pickerValue, setPickerValue] = useState('Kobieta')
    const history = useHistory();

    const register = async (values) => {
        console.log("Dane: "+values.email+" "+values.password)
        const elo = AuthenticationService.register(values.email, values.password)
        console.log(elo)

       // history.push("/Main")

    }

    return (
        <View>
            <Formik
                initialValues={{ email: "", password: "", confirmPassword: "", name: "" }}
                //onSubmit={async values => {// history.push("/Main")}}
                onSubmit={values => register(values)}

                validateOnMount={true}
                validationSchema={schema}
            >
                {({ handleSubmit, handleChange, handleBlur, errors, values, touched }) => (
                    <>
                        <TextInput
                            mode="outlined"
                            label="E-mail"
                            placeholder="Wpisz e-mail..."
                            style={styles.input}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            right={<TextInput.Icon name={!errors.email ? "check" : "close"} />}
                        />
                        {(errors.email && touched.email) &&
                            <Text style={{ color: 'red', minHeight: 20, width: 300, }}>
                                {errors.email}
                            </Text>
                        }

                        <TextInput
                            mode="outlined"
                            label="Hasło"
                            placeholder="Wpisz hasło..."
                            style={styles.input}
                            secureTextEntry={!showPassword}
                            right={<TextInput.Icon name={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        {(errors.password && touched.password) &&
                            <Text style={{ color: 'red', minHeight: 20, width: 300, }}>
                                {errors.password}
                            </Text>
                        }

                        <TextInput
                            mode="outlined"
                            label="Potwierdz hasło"
                            placeholder="Wpisz hasło..."
                            style={styles.input}
                            secureTextEntry={!showConfirmPassword}
                            right={<TextInput.Icon name={showConfirmPassword ? "eye-off" : "eye"} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                        />

                        {(errors.confirmPassword && touched.confirmPassword) &&
                            <Text style={{ color: 'red', minHeight: 20, width: 300, }}>
                                {errors.confirmPassword}
                            </Text>
                        }

                        <TextInput
                            mode="outlined"
                            label="Podaj swoje imię"
                            placeholder="Wpisz imię..."
                            style={styles.input}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />

                        {(errors.name && touched.name) &&
                            <Text style={{ color: 'red', minHeight: 20, width: 300, }}>
                                {errors.name}
                            </Text>
                        }

                        <View style={styles.pickerView}>
                            <Picker
                                style={styles.pickerStyle}
                                selectedValue={pickerValue}
                                onValueChange={(itemValue) => setPickerValue(itemValue)}
                            >

                                <Picker.Item label="Kobieta" value="Kobieta"></Picker.Item>
                                <Picker.Item label="Mężczyzna" value="Mężczyzna"></Picker.Item>
                                <Picker.Item label="Inna" value="Inna"></Picker.Item>

                            </Picker>
                        </View>


                        <Button onPress={() => setOpen(true)} uppercase={false} mode="contained">
                            {date.toLocaleDateString('en-US', { dateStyle: 'medium' })}
                        </Button>
                        <Text>
                            {date.toLocaleDateString('pl', { dateStyle: 'medium' })}
                        </Text>
                        <DatePickerModal
                            //locale={'en'} optional, default: automatic
                            mode="single"
                            visible={open}
                            onDismiss={onDismissSingle}
                            date={date}
                            onConfirm={onConfirmSingle}
                            validRange={{
                                startDate: new Date(1900, 1, 2),  // optional
                                endDate: new Date(), // optional
                            }}
                            // onChange={() => change} // same props as onConfirm but triggered without confirmed by user
                            saveLabel="Zapisz" // optional
                            label="Wybierz date urodzenia" // optional
                            animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
                        />
                      
                        <Button
                            type="submit"
                            title="submit"
                            onPress={handleSubmit}
                            mode="contained"
                        >
                            Wyślij
                        </Button>

                    </>
                )}
            </Formik>
        </View>
    );
};
export default RegisterPanel;


const styles = StyleSheet.create({
    pickerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        maxHeight: 60,
        borderColor: 'silver',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
        backgroundColor: 'rgba(245, 245, 245, 0.9)',
        minHeight: 60,
        marginBottom: 20

    },
    pickerStyle: {
        width: 330,
        height: 50,
        borderColor: 'red',
        borderWidth: 2,
        maxHeight: 50,
    },

    input: {
        maxHeight: 50,
        width: 330,
        marginBottom: 20,
    }
});

*/