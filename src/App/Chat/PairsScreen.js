import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Menu from "../control/Menu";
import DetailsProfileScreen from '../DetailsProfile/DetailsProfileScreen';
import { contact, styles } from '../Chat/style';
import MenuTop from '../Unused/MenuTop';
import PairComponent from './PairComponent';

const PairsScreen = (props) => {
    const goPairs = () => props.navigation.navigate("Pairs")
    const goConversation = () => props.navigation.navigate("Conversations")
    const goChat = () => props.navigation.navigate("Chat")
    
    return (
        <View style={styles.container}>
            <View style={styles.menuTop}>
                <TouchableOpacity
                    onPress={goPairs}
                    style={[styles.xd, styles.activeTopMenu]}
                >
                    <Text style={styles.menuTopElement}>Pary</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={goConversation}
                    style={styles.xd}
                >
                    <Text style={styles.menuTopElement}>Rozmowy</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.containerContact}>

                <PairComponent navigation={props.navigation}/>
                <PairComponent navigation={props.navigation}/>
                <PairComponent navigation={props.navigation}/>
                <PairComponent navigation={props.navigation}/>
                <PairComponent navigation={props.navigation}/>
            </ScrollView>



        </View>
    );
};
export default PairsScreen;
