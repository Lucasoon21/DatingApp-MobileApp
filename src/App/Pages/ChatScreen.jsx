import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import ChatService from '../../service/ChatService';
import Menu from '../Controls/Menu';
import { chat } from '../Styles/ChatStyle';
// Step 2: import IconButton
import * as SecureStore from 'expo-secure-store';
import { IconButton } from 'react-native-paper';
import SockJS from 'sockjs-client';
import { apiUrl } from '../../../config.json';
import LoaderElements from '../Components/LoaderElements';
import { over } from 'stompjs'

var stompClient = null;

const ChatScreen = (props) => {
	const goBack = () => {
		stompClient.disconnect()
		props.navigation.goBack()
	};
	const goProfile = () =>
		props.navigation.navigate('DetailsForeignProfileScreen', {
			myProfile: false,
			profileUser: {
				profileId: props.route.params.profileId,
			},
		});

	const [messages, setMessages] = useState([]);
	const [returnMessage, setReturnMessage] = useState(false);
	const [otherProfile, setOtherProfile] = useState(props.route.params.profileId);

	useEffect(() => {
		async function fetchMessages() {
			setReturnMessage(false);
			let result = await ChatService.getConversation(props.route.params.profileId);
			let profile = await SecureStore.getItemAsync('profileId');
			if (result.status == 200) {
				setMessages(result.data);
				setOtherProfile(props.route.params.profileId);
				connectToChat(profile);
				setReturnMessage(true);
			}
			console.log('CHAT Z UZYTKOWNIKIEM: ' + props.route.params.profileId);
			console.log('JESTEM UZYTKOWNIKIEM: ' + profile);
		}
		fetchMessages();
	}, []);

	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
		sendMessage(messages[0]);
	}, []);

	const onRecieve = useCallback((messages = []) => {
		setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
	}, []);

	const sendMessage = async (message) => {
		let result = await ChatService.sendMessage({
			recieverId: message.user._id,
			contentMessage: message.text,
		});
		if (result.status === 200) {
			let profile = await SecureStore.getItemAsync('profileId');
			sendMsg(profile, message.text);
		} else {
			console.log('nie wysłano');
		}
	};

	function renderSend(props) {
		return (
			<Send {...props}>
				<View style={styles.sendingContainer}>
					<IconButton icon='send-circle' size={36} color='#6646ee' />
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
		return <LoaderElements />;
	}

	//=========== WEBSOCKET

	function connectToChat(userName) {
		console.log('connecting to chat...');
		let socket = new SockJS(apiUrl + '/chat');
		stompClient = Stomp.over(socket);
		stompClient.connect({}, function (frame) {
			console.log('connected to: ' + frame);
			stompClient.subscribe('/topic/messages/' + userName, function (response) {
				let data = JSON.parse(response.body);
				if (otherProfile != data.user._id) {
					if (props.route.params.profileId == data.userSender) {
						const dat = {
							_id: uid(),
							createdAt: data.createdAt,
							text: data.text,
							user: {
								_id: data.user._id,
								avatar: data.user.avatar,
							},
						};
						onRecieve(dat);
					} else {
						console.log('Dostałeś nową wiadomość od innego użytkownika');
					}
				}
			});
		});
	}

	function sendMsg(from, text) {
		stompClient.send(
			'/app/chat/' + otherProfile,
			{},
			JSON.stringify({
				receiverProfileId: otherProfile,
				senderProfileId: from,
				contentMessage: text,
			}),
		);
	}

	function uid() {
		return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, '');
	}

	return (
		<>
			<View style={chat.buttonBack}>
				<View style={{ zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<TouchableOpacity onPress={goBack}>
						<Ionicons name='arrow-back' size={40} color='rgba(50,50,50,1)' />
					</TouchableOpacity>
				</View>

				<View style={chat.profileTop}>
					<TouchableOpacity onPress={goProfile} style={chat.profileTopTouch}>
						{props.route.params.photo ? (
							<Image source={{ uri: props.route.params.photo }} style={chat.avatarTop} />
						) : (
							<Image source={require('../../Images/default.jpg')} style={chat.avatarTop} />
						)}
						<Text style={chat.nameProfile} numberOfLines={1}>
							{props.route.params.name}
						</Text>
					</TouchableOpacity>
				</View>
				<View></View>
			</View>
			<View style={{ flex: 1, marginBottom: 50 }}>
				{returnMessage ? (
					<>
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
							//loadEarlier
							renderSend={renderSend}
							user={{
								_id: props.route.params.profileId,
							}}
							textInputProps={{
								marginTop: 12,
								marginLeft: 0,
								marginBottom: 6,
								marginRight: 0,
								paddingTop: 0,
							}}
						/>
					</>
				) : (
					<>
						<LoaderElements />
					</>
				)}
			</View>
			<Menu chat={true} {...props} />
		</>
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
