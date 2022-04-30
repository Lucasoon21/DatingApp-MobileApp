import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

const EmptyLikedMe = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Jeszcze nie dostałeś żadnego like'a</Text>
        <Text style={styles.subText}>Uzupełnij swój profil aby zachęcić jak najwięcej osób</Text>
    </View>
  )
}

export default EmptyLikedMe

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
