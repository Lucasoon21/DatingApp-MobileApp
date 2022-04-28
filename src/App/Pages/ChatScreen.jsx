import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { chat, message } from '../Styles/ChatStyle';
import { Ionicons } from '@expo/vector-icons';
import Message from '../Components/Message';
import Menu from '../Controls/Menu';
import ChatService from '../../service/ChatService';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
// Step 2: import IconButton
import { IconButton } from 'react-native-paper';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import * as SecureStore from 'expo-secure-store';
import { apiUrl } from '../../../config.json';

var stompClient = null;

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

	const [myProfile, setMyProfile] = useState()
	const [otherProfile, setOtherProfile] = useState(props.route.params.profileId)


	useEffect(() => {
		async function fetchMessages() {
			setReturnMessage(false);
			let result = await ChatService.getConversation(props.route.params.profileId);
			let profile = await SecureStore.getItemAsync('profileId');
			if (result.status == 200) {
				setReturnMessage(true);
				setMessages(result.data);
				setOtherProfile(props.route.params.profileId)
				setMyProfile(profile)
				connectToChat(profile)
			}
			console.log("CHAT Z UZYTKOWNIKIEM: "+props.route.params.profileId)
			console.log("JESTEM UZYTKOWNIKIEM: "+profile)
		}
		fetchMessages();
		//registerUser();
	}, []);

	const onSend = useCallback((messages = []) => {
		//console.log(">>> Przekazana wiadomość do wysłania: ",messages);
		setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
		sendMessage(messages[0]);
	}, []);

	const onRecieve = useCallback((messages = []) => {
	//	console.log(">>> Dostałem wiadomosć... : ",messages);
		setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
		
	}, []);


	const sendMessage = async (message) => {
		let result = await ChatService.sendMessage({
			recieverId: message.user._id,
			contentMessage: message.text,
		});
		if (result.status === 200) {
			//sendPrivateValue(message.text);
			console.log('ok wysłano');
			let profile = await SecureStore.getItemAsync('profileId');
			sendMsg(profile,message.text)
		} else {
			console.log('nie wysłano');
		}
	};

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

	//=========== WEBSOCKET

	 function connectToChat(userName) {
		console.log("connecting to chat...")
		let socket = new SockJS(apiUrl + '/chat');
		stompClient = Stomp.over(socket);
		stompClient.connect({}, function (frame) {
			console.log("connected to: " + frame);
			stompClient.subscribe("/topic/messages/" + userName, function (response) {
				let data = JSON.parse(response.body);
				//if (otherProfile != data.senderProfileId) {
				if (otherProfile != data.user._id) {

					console.log(otherProfile," ============== TAK ==============",data)
					if(props.route.params.profileId==data.userSender) {
						const dat = {
							_id: uid(),
							createdAt: data.createdAt,
							text: data.text,
							user:  {
							  _id: data.user._id,
							  avatar: data.user.avatar
							},
						}
						onRecieve(dat);
					} else {
						console.log("Dostałeś nową wiadomość")
					}

				} else {
					console.log(" ============== NIE ==============")

					//newMessages.set(data.senderProfileId, data.contentMessage);
					/*const dat = {
						_id: uid(),
						createdAt: data.createdAt,
						text: data.text,
						user:  {
						  _id: data.user._id,
						  avatar: data.user.avatar
						},
					}
					onRecieve(dat);
*/
				//	$('#userNameAppender_' + data.senderProfileId).append('<span id="newMessage_' + data.senderProfileId + '" style="color: red">+1</span>');
				}
			});
		});
	} 
	function uid() {
		return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
	  };

	function sendMsg(from, text) {
		//console.log("other profile ============== ", from, text,otherProfile)
		stompClient.send("/app/chat/" + otherProfile, {}, JSON.stringify({
				receiverProfileId: otherProfile,
				senderProfileId: from,
				contentMessage: text
		}));
	}
























	return (
		<GiftedChat
			messages={messages}
			showAvatarForEveryMessage
			onSend={(messages) => onSend(messages)}
			renderLoading={renderLoading}
			inverted={true}
			placeholder='Napisz wiadomość...a.'
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
		alignItems: 'center',
	},
	loadingContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
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
