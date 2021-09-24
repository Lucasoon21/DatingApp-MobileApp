import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import LoginPanel from './LoginPanel';
import RegisterPanel from './RegisterPanel';

const AuthPage = () => {
  const [loginPan, setLoginPanel] = useState(true)

  return (
    <View style={styles.container}>
      <Button onPress={() => { setLoginPanel(true) }} >Logowaniee</Button>
      <Button onPress={() => { setLoginPanel(false) }}>Rejestracja</Button>
      
      {
        loginPan ? (
          <LoginPanel />
        ) : (
          <RegisterPanel />
        )
      }
    </View>
  );
};
export default AuthPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
