import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Menu from "../Controls/Menu";
import DetailsProfileScreen from '../Pages/DetailsProfileScreen';
import { contact, styles, singleConversation } from '../Styles/ConversationsStyle';
import MenuTop from '../Unused/MenuTop';
import PairComponent from './PairComponent';

const ConversationComponent = (props) => {
    const goChat = () => props.navigation.navigate("ChatScreen")

    return (
        <View style={singleConversation.container}>
            <Image source={require('../../Images/person1.jpg')} style={singleConversation.image} />

            <View style={singleConversation.textContainer} >
                <TouchableOpacity onPress={goChat}>
                    <View style={singleConversation.headerContainer}>
                        <Text style={singleConversation.headerText} numberOfLines={1}>Łukasz aaaaaaaaaaaaaaaa</Text>
                        <Text style={singleConversation.dateMessage}>Wczoraaj</Text>
                    </View>
                    <Text style={singleConversation.message} numberOfLines={2}> To jest przykladowy teskt ktory sprawdzam dlugosc tego tekstu i ogolnoe elo bo beka z b jets </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};
export default ConversationComponent;
