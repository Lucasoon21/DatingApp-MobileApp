import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Menu from '../Controls/Menu';
import DetailsProfileScreen from './DetailsProfileScreen';
import { styles } from '../Styles/ConversationsStyle';
import MenuTop from '../Unused/MenuTop';
import ConversationComponent from '../Components/ConversationComponent';
import { GiftedChat } from 'react-native-gifted-chat';
import ChatService from '../../service/ChatService';

const ConversationsScreen = (props) => {
	const goPairs = () => props.navigation.navigate('PairsScreen');
	const goConversation = () => props.navigation.navigate('ConversationScreen');
	const goChat = () => props.navigation.navigate('ChatScreen');

	const [conversations, setConversations] = useState([]);
	const [returnConversations, setReturnConversations] = useState(false);

	useEffect(() => {
		async function fetchConversation() {
			setReturnConversations(false);
			let result = await ChatService.getListConversation();
			console.log(result.data);
			if (result.status === 200) {
				setConversations(result.data);
				setReturnConversations(true);
			}
		}
		fetchConversation();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.menuTop}>
				<TouchableOpacity onPress={goPairs} style={styles.xd}>
					<Text style={styles.menuTopElement}>Pary</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={goConversation} style={[styles.xd, styles.activeTopMenu]}>
					<Text style={styles.menuTopElement}>Rozmowy</Text>
				</TouchableOpacity>
			</View>

			<ScrollView style={styles.containerContact}>
				{returnConversations ? (
					<>
						{conversations.length > 0 ? (
							<>
								{conversations.map((conversation, i) => {
									return <ConversationComponent navigation={props.navigation} key={i} conversations={conversation} />;
								})}
							</>
						) : (
							<>
								<Text>Brak rozmów</Text>
							</>
						)}
					</>
				) : (
					<>
						<ActivityIndicator size='large' color='#0000ff' />
					</>
				)}


			</ScrollView>

			<Menu chat={true} {...props} />
		</View>
	);
};
export default ConversationsScreen;
