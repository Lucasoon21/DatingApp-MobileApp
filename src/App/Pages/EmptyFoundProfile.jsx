import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

const EmptyFoundProfile = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Nie znaleziono żadnego profilu</Text>
        <Text style={styles.subText}>Poczekaj na nowe profile lub zmień swoje preferencje co do wyszukiwania użytkowników</Text>
    </View>
  )
}

export default EmptyFoundProfile

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#FFFFFF',
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
