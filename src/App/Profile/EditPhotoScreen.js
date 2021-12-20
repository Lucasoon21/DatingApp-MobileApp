import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Menu from "../control/Menu";
import DetailsProfileScreen from '../DetailsProfile/DetailsProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Profile/style';


const EditPhotoScreen = (props) => {
    const goBack = () => props.navigation.goBack();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
                <Ionicons name="arrow-back" size={40} color="rgba(250,250,250,1)" />
            </TouchableOpacity>
            <Text>Edycja  zdjęcia</Text>
        </View>
    );
};
export default EditPhotoScreen;

