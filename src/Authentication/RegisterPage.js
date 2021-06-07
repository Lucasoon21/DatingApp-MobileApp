import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegisterPanel = (props) => {

    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const showMode = () => {
        setShow(true);
    };


    return (
        <>
            <Text>Zakładanie konta xd xd</Text>
            <Image source={require('../Images/logo.png')} style={styles.logo} />
            <TextInput mode="outlined" label="E-mail" placeholder="Wpisz e-mail..." style={styles.input} />
            <TextInput mode="outlined" label="Hasło" placeholder="Wpisz hasło..." style={styles.input} secureTextEntry right={<TextInput.Icon name="eye" />} />
            <TextInput mode="outlined" label="E-mail" placeholder="Wpisz e-mail..." style={styles.input} />
            <Button onPress={showMode} title="Show date picker!" style={styles.loginButton} mode="contained" > Wybierz date</Button>
            {show && (
                <DateTimePicker
                    locale={'pl'}
                    testID="dateTimePicker"
                    value={date}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

            <View style={styles.registerLink}>
                <Text >Masz już konto? </Text><Text style={styles.registerButton} onPress={() => { props.activePanel(true) }}>Zaloguj się</Text>
            </View>
            <Button mode="contained" style={styles.loginButton}>Zaloguj się</Button>


        </>
    );
};
export default RegisterPanel;


const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
    },
    input: {
        maxHeight: 50,
        width: 200,
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
        width: 200,
    },
});
