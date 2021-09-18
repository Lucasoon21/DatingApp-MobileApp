import React from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const AccountVerification = (props) => {

    
    return(
        <>
            <Text>Podaj kod aktywacyjny wysłany na maila</Text>
            <TextInput mode="outlined" label="kod" />
        </> 
    );
};
export default AccountVerification;

const styles = StyleSheet.create({

});
  