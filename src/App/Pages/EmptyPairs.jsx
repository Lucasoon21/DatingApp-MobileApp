import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

const EmptyPairs = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Brak par</Text>
        <Text style={styles.subText}>Jeszcze nie masz żadnych par. Ale niedługo na pewno się pojawią ;)</Text>
    </View>
  )
}

export default EmptyPairs

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
      fontWeight: 'bold',
      textAlign: 'center',
    }


})
