import React from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const LoginPanel = (props) => {

    
    return(
        <>
            <Text>Witaj!</Text>
            {/* <Image source={require('../Images/logo.png')} style={styles.logo}/> */}
            <TextInput mode="outlined" label="E-mail" placeholder="Wpisz e-mail..."  style={styles.input} />
            <TextInput mode="outlined" label="Hasło" placeholder="Wpisz hasło..."  style={styles.input} secureTextEntry right={<TextInput.Icon name="eye" />}/>
            <Text style={styles.forgot_password}>Nie pamiętasz hasła?</Text>
            <Button mode="contained" style={styles.loginButton}>Zaloguj się</Button> 

        </> 
    );
};
export default LoginPanel;

const styles = StyleSheet.create({
    logo: {
      width: 100,
      height: 100,
    },
    input: {
      maxHeight: 50,
      width:200,
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
        width:200,
    },
  });
  