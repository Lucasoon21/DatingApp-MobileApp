import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { chat, message } from '../Styles/ChatStyle';
import { Ionicons } from '@expo/vector-icons';
import Message from '../Components/Message';


const ChatScreen = (props) => {
  /*  const goBack = () => props.navigation.goBack();
    const goProfile = () => props.navigation.navigate("ProfileUser")
    const goConversation = () => props.navigation.navigate("Conversations")
    const [messageField, setMessageField] = useState("");
*/
    return (
        <View style={chat.container}>
            <View style={chat.buttonBack}>

                {/* <TouchableOpacity onPress={goBack} style={{zIndex: 100}}>
                    <Ionicons name="arrow-back" size={40} color="rgba(50,50,50,1)" />
                </TouchableOpacity>

                <View style={chat.profileTop}>
                    <TouchableOpacity onPress={goProfile} style={chat.profileTopTouch}>
                        <Image source={require('../../Images/person1.jpg')} style={chat.avatarTop} />
                        <Text style={chat.nameProfile} numberOfLines={1}>Łukasz</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
            <ScrollView style={message.allMessageContainer}>
                <Message sendToMe={false} navigation={props.navigation}/>
                <Message sendToMe={false} navigation={props.navigation}/>
                <Message sendToMe={true} navigation={props.navigation}/>
                <Message sendToMe={true} navigation={props.navigation}/>
                <Message sendToMe={false} navigation={props.navigation}/>
                <Message sendToMe={true} navigation={props.navigation}/>
            </ScrollView>
            <View style={chat.fieldContainer}>
                <TextInput
                    style={chat.messageTextInput}
                    onChangeText={setMessageField}
                    value={messageField}
                    placeholder="Wpisz swoją wiadomość..."
                />
                <Ionicons name="send" size={40} color="rgba(255, 0, 0, 1)" style={chat.sendIcon} />
            </View>


        </View>
    );
};
export default ChatScreen;
