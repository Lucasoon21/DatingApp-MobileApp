import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import LoginPanel from '../Components/LoginPanel';
import RegisterPanel from '../Components/RegisterPanel';
import Toast from 'react-native-toast-message';
import { configToast } from '../Components/configToast';

const AuthenticationScreen = () => {
  const [loginPan, setLoginPanel] = useState(true)

  return (
    <View style={styles.container}>
      <Button onPress={() => { setLoginPanel(true) }} >Logowanie</Button>
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
export default AuthenticationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    
  },
});
