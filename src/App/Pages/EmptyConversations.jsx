import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

const EmptyConversations = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Brak rozmów</Text>
        <Text style={styles.subText}>Jeszcze nie z nikim nie rozmawiałeś. Pora zrobić ten pierwszy krok i napisz do kogoś!</Text>
    </View>
  )
}

export default EmptyConversations

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
      fontWeight: 'bold',
      textAlign: 'center',
    }


})
