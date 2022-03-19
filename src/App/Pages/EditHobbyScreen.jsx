import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Menu from "../Controls/Menu";
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/ProfileStyle';
import HobbyButton from '../Controls/HobbyButton';


const EditHobbyScreen = (props) => {
   // const goBack = () => props.navigation.goBack();
    return (
        <View style={styles.container}>
            {/* <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
                <Ionicons name="arrow-back" size={40} color="rgba(250,250,250,1)" />
            </TouchableOpacity> */}
            <View style={[styles.sectionContainer]}>
                <Text style={styles.textHeader}>Hobby</Text>
                <View style={styles.hobbyContainerEdit}>
                    <HobbyButton text="Sport" edit={true} />
                    <HobbyButton text="Muzyka" edit={true} />
                    <HobbyButton text="Gotowanie" edit={true} />
                    <HobbyButton text="Taniec" edit={true} />
                    <HobbyButton text="Podróże" edit={true} />
                    <HobbyButton text="Sport" edit={true} />
                    <HobbyButton text="Muzyka" edit={true} />
                    <HobbyButton text="Gotowanie" edit={true} />
                    <HobbyButton text="Taniec" edit={true} />
                    <HobbyButton text="Podróże" edit={true} />
                    <HobbyButton text="Sport" edit={true} />
                    <HobbyButton text="Muzyka" edit={true} />
                    <HobbyButton text="Gotowanie" edit={true} />
                    <HobbyButton text="Taniec" edit={true} />
                </View>
            </View>
            <Menu settings={true} />
        </View>
    );
};
export default EditHobbyScreen;

