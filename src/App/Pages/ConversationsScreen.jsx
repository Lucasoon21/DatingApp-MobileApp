import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Menu from '../Controls/Menu';
import DetailsProfileScreen from './DetailsProfileScreen';
import { styles } from '../Styles/ConversationsStyle';
import ConversationComponent from '../Components/ConversationComponent';
import { GiftedChat } from 'react-native-gifted-chat';
import ChatService from '../../service/ChatService';
import EmptyConversations from './EmptyConversations';
import LoaderElements from '../Components/LoaderElements';
import { Button, TextInput } from 'react-native-paper';

const ConversationsScreen = (props) => {
	const goPairs = () => props.navigation.navigate('PairsScreen');
	const goConversation = () => props.navigation.navigate('ConversationScreen');
	const goChat = () => props.navigation.navigate('ChatScreen');

	const [conversations, setConversations] = useState([]);
	const [returnConversations, setReturnConversations] = useState(false);

	useEffect(() => {
		fetchConversation();
	}, []);
	async function fetchConversation() {
		setReturnConversations(false);
		let result = await ChatService.getListConversation();
		if (result.status === 200) {
			setConversations(result.data);
			setReturnConversations(true);
		}
	}

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

			{returnConversations ? (
				<>
					{conversations.length > 0 ? (
						<>
							{/* 
							<Button onPress={() => fetchConversation()}>
								<Text>Odśwież</Text>
							</Button> */}
							<TouchableOpacity style={styles.containerContact} onPress={() => fetchConversation()}>
								<ScrollView style={styles.containerContact} onPress={() => fetchConversation()}>
									{conversations.map((conversation, i) => {
										return <ConversationComponent navigation={props.navigation} key={i} conversations={conversation} />;
									})}
								</ScrollView>
							</TouchableOpacity>
						</>
					) : (
						<>
							<Button onPress={() => fetchConversation()}>
								<Text>Odśwież</Text>
							</Button>
							<EmptyConversations />
						</>
					)}
				</>
			) : (
				<View style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<LoaderElements />
				</View>
			)}

			<Menu chat={true} {...props} />
		</View>
	);
};
export default ConversationsScreen;
