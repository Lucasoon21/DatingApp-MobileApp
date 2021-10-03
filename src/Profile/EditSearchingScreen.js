import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Menu from "../control/Menu";
import DetailsProfileScreen from '../DetailsProfile/DetailsProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Profile/style';
import HobbyButton from '../control/HobbyButton';
import RelationButton from '../control/RelationButton';


const EditSearchingScreen = (props) => {
    const goBack = () => props.navigation.goBack();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
                <Ionicons name="arrow-back" size={40} color="rgba(250,250,250,1)" />
            </TouchableOpacity>
            <View style={[styles.sectionContainer]}>
                <Text style={styles.textHeader}>Szukam</Text>
                <View style={styles.hobbyContainerEdit}>
                    <RelationButton text="Związku" type={0} edit={true} />
                    {/*TAK, SZUKAM*/}
                    <RelationButton text="FWB" type={1} edit={true} />
                    {/*NIE, NIE SZUKAM TEGO*/}
                    <RelationButton text="Przyjaźni" type={2} edit={true} />
                    {/* JEST MI TO OBOJETNE */}
                    <RelationButton text="Nie wiem" type={0} edit={true} />
                    <RelationButton text="Rozmowy" type={0} edit={true} />
                    <RelationButton text="ONS" type={1} edit={true} />
                </View>
            </View>
        </View>
    );
};
export default EditSearchingScreen;

