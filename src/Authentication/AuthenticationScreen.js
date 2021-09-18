import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import LoginPanel from './LoginPanel';
import RegisterPanel from './RegisterPanel';

const AuthPage = () => {
  const [loginPan, setLoginPanel] = useState(true)

  return (
    <>
      <Button onPress={() => { setLoginPanel(true) }} >Logowaniee</Button>
      <Button onPress={() => { setLoginPanel(false) 
      console.log(loginPan)}}>Rejestracja</Button>
      
      {
        loginPan ? (
          <LoginPanel />
        ) : (
          <RegisterPanel />
        )
      }
    </>
  );
};
export default AuthPage;
