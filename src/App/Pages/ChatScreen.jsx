import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity, TextInput,ActivityIndicator } from 'react-native';
import { chat, message } from '../Styles/ChatStyle';
import { Ionicons } from '@expo/vector-icons';
import Message from '../Components/Message';
import Menu from '../Controls/Menu';
import ChatService from '../../service/ChatService';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
// Step 2: import IconButton
import { IconButton } from 'react-native-paper';

const ChatScreen = (props) => {
	const goBack = () => props.navigation.goBack();
	const goProfile = () =>
		props.navigation.navigate('DetailsForeignProfileScreen', {
			myProfile: false,
			profileUser: {
				profileId: props.route.params.profileId,
			},
		});

	const goConversation = () => props.navigation.navigate('ConversationScreen');
	const [messageField, setMessageField] = useState('');
	const [messages, setMessages] = useState([]);
	const [returnMessage, setReturnMessage] = useState(false);

	useEffect(() => {
		async function fetchMessages() {
			setReturnMessage(false);
			let result = await ChatService.getConversation(props.route.params.profileId);
			console.log(result.data);
			if (result.status == 200) {
				setReturnMessage(true);
				setMessages(result.data);
			}
		}
		fetchMessages();
	}, []);

	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
        console.log(messages)
        sendMessage(messages[0]);
	}, []);


    const sendMessage = async (message) => {
        console.log("m============",message)
        let result = await ChatService.sendMessage({
            recieverId: message.user._id,
            contentMessage: message.text,
        })
        if(result.status === 200) {
            console.log("ok wysłano")
        } else {
            console.log("nie wysłano")
        }
    }


    function renderSend(props) {
        return (
          <Send {...props}>
            <View style={styles.sendingContainer}>
              <IconButton icon='send-circle' size={32} color='#6646ee' />
            </View>
          </Send>
        );
      }
      function scrollToBottomComponent() {
        return (
          <View style={styles.bottomComponentContainer}>
            <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
          </View>
        );
      }
      function renderLoading() {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#6646ee' />
          </View>
        );
      }
	return (
		<GiftedChat
			messages={messages}
            showAvatarForEveryMessage 
			onSend={(messages) => onSend(messages)}
            renderLoading={renderLoading}            
            inverted={true}
            placeholder='Napisz wiadomość...'
           // showUserAvatar
            alwaysShowSend
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent}
            isAnimated
            renderSend={renderSend}
			user={{
				_id: props.route.params.profileId,

			}}
		/>

		// <View style={chat.container}>

		//     <View style={chat.buttonBack}>
		//          <TouchableOpacity onPress={goBack} style={{zIndex: 100}}>
		//             <Ionicons name="arrow-back" size={40} color="rgba(50,50,50,1)" />
		//         </TouchableOpacity>

		//         <View style={chat.profileTop}>
		//             <TouchableOpacity onPress={goProfile} style={chat.profileTopTouch}>
		//                 <Image source={require('../../Images/person1.jpg')} style={chat.avatarTop} />
		//                 <Text style={chat.nameProfile} numberOfLines={1}>Łukasz</Text>
		//             </TouchableOpacity>
		//         </View>
		//     </View>
		//     <ScrollView style={message.allMessageContainer}>

		//         <Message sendToMe={false} navigation={props.navigation}/>
		//         <Message sendToMe={false} navigation={props.navigation}/>
		//         <Message sendToMe={true} navigation={props.navigation}/>
		//         <Message sendToMe={true} navigation={props.navigation}/>
		//         <Message sendToMe={false} navigation={props.navigation}/>
		//         <Message sendToMe={true} navigation={props.navigation}/>

		//     </ScrollView>
		//     <View style={chat.fieldContainer}>
		//         <TextInput
		//             style={chat.messageTextInput}
		//             onChangeText={setMessageField}
		//             value={messageField}
		//             placeholder="Wpisz swoją wiadomość..."
		//         />
		//         <Ionicons name="send" size={40} color="rgba(255, 0, 0, 1)" style={chat.sendIcon} />
		//     </View>

		//     <Menu chat={true} {...props} />
		// </View>
	);
};
export default ChatScreen;
const styles = StyleSheet.create({
    sendingContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }
  });
/*

import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { chat, message } from '../Styles/ChatStyle';
import { Ionicons } from '@expo/vector-icons';
import Message from '../Components/Message';
import Menu from '../Controls/Menu';
import { GiftedChat } from 'react-native-gifted-chat'


const ChatScreen = (props) => {
   const goBack = () => props.navigation.goBack();
    const goProfile = () => props.navigation.navigate("DetailsProfileScreen")
    const goConversation = () => props.navigation.navigate("ConversationScreen")
    const [messageField, setMessageField] = useState("");




    
    return (
        <View style={chat.container}>
            <View style={chat.buttonBack}>

                 <TouchableOpacity onPress={goBack} style={{zIndex: 100}}>
                    <Ionicons name="arrow-back" size={40} color="rgba(50,50,50,1)" />
                </TouchableOpacity>

                <View style={chat.profileTop}>
                    <TouchableOpacity onPress={goProfile} style={chat.profileTopTouch}>
                        <Image source={require('../../Images/person1.jpg')} style={chat.avatarTop} />
                        <Text style={chat.nameProfile} numberOfLines={1}>Łukasz</Text>
                    </TouchableOpacity>
                </View>
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

            <Menu chat={true} {...props} />
        </View>
    );
};
export default ChatScreen;
*/
