import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Menu from "../control/Menu";
import DetailsProfileScreen from '../DetailsProfile/DetailsProfileScreen';
import { contact, styles, singleConversation, chat, message } from './style';
import MenuTop from '../Unused/MenuTop';
import PairComponent from './PairComponent';
import { Ionicons } from '@expo/vector-icons';

const Message = (props) => {
    const goProfile = () => props.navigation.navigate("ProfileUser")

    return (
        <View style={[message.messageContainer, props.sendToMe ? message.messageRecieverContainer : null]}>
            {!props.sendToMe ? (
                <TouchableOpacity onPress={goProfile}>
                    <Image source={require('../../Images/person1.jpg')} style={message.avatar} />
                </TouchableOpacity>
            ) : null}
            <View style={message.singleMessage}>
                <View style={[message.message, props.sendToMe ? message.myMessage : message.recieverMessage]}>
                    <Text style={message.messageText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </View>
                <Text style={[message.date, props.sendToMe ? message.dateMyMessage : message.dateRecieverMessage]}>Dzisiaj</Text>
            </View>

        </View>
    );
};
export default Message;
