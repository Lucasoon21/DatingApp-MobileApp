import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Menu from "../Controls/Menu";
import DetailsProfileScreen from '../Pages/DetailsProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/ProfileStyle';


const EditPhotoScreen = (props) => {
  //  const goBack = () => props.navigation.goBack();
    return (
        <View style={styles.container}>
            {/* <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
                <Ionicons name="arrow-back" size={40} color="rgba(250,250,250,1)" />
            </TouchableOpacity> */}
            <Text>Edycja  zdjęcia</Text>
            <Menu settings={true} />
        </View>
    );
};
export default EditPhotoScreen;

