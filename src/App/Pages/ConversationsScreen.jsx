import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Menu from "../Controls/Menu";
import DetailsProfileScreen from './DetailsProfileScreen';
import { styles } from '../Styles/ConversationsStyle';
import MenuTop from '../Unused/MenuTop';
import ConversationComponent from '../Components/ConversationComponent';

const ConversationsScreen = (props) => {
     const goPairs = () => props.navigation.navigate("PairsScreen")
     const goConversation = () => props.navigation.navigate("ConversationScreen")
     const goChat = () => props.navigation.navigate("ChatScreen")

    return (
        <View style={styles.container}>
 
            {/* <View style={styles.menuTop}>
                <TouchableOpacity
                    onPress={goPairs}
                    style={styles.xd}
                >
                    <Text style={styles.menuTopElement}>Pary</Text>
                </TouchableOpacity>
                <TouchableOpacity
                     onPress={goConversation}
                    style={[styles.xd, styles.activeTopMenu]}
                >
                    <Text style={styles.menuTopElement}>Rozmowy</Text>
                </TouchableOpacity>
            </View> */}

            <ScrollView style={styles.containerContact}>
                <ConversationComponent navigation={props.navigation}/>
                <ConversationComponent navigation={props.navigation}/>
                <ConversationComponent navigation={props.navigation}/>
                <ConversationComponent navigation={props.navigation}/>
                <ConversationComponent navigation={props.navigation}/>
            </ScrollView>


            <Menu swipe={true} />
        </View>
    );
};
export default ConversationsScreen;
