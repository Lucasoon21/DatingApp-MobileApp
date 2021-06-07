import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import LoginPanel from './LoginPage';
import RegisterPanel from './RegisterPage';


const AuthPage = () => {
    const [loginPan,setLoginPanel] = useState(true)

    function  setLogin(reg){
        setLoginPanel(reg);
    }

    return(
        <>
        {
          loginPan? ( 
            <LoginPanel activePanel={setLogin}/>
          ) : (
            <RegisterPanel activePanel={setLogin}/>
          )
        }
        </>
    );
};
export default AuthPage;

const styles = StyleSheet.create({

  });