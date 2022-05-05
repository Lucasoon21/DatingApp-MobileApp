import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import LoaderElements from '../Components/LoaderElements';

const StartLoadingScreen = () => {
  return (
    <View style={styles.container}>
        <LoaderElements />
    </View>
  )
}

export default StartLoadingScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:'100%',
        width:'100%',
        paddingHorizontal: 30,
  
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subText: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    }


})
