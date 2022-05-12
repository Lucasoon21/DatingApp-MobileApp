import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Menu from '../Controls/Menu';
import DetailsProfileScreen from '../Pages/DetailsProfileScreen';
import { contact, styles, singleConversation } from '../Styles/ConversationsStyle';
import PairComponent from './PairComponent';

const ConversationComponent = (props) => {
	const goChat = () => props.navigation.navigate('ChatScreen',{
        profileId: dataConversation.profileId,
		name: dataConversation.name,
		photo: dataConversation.profileImageLink
    })
	const [dataConversation, setDataConversation] = useState([]);

	useEffect(() => {
		if (props.conversations != null) {
			setDataConversation(props.conversations);
		}
	}, []);

	return (
		<TouchableOpacity onPress={goChat} style={singleConversation.container}>
			{dataConversation.profileImageLink ? (
				<Image source={{ uri: dataConversation.profileImageLink }} style={singleConversation.image} />
			) : (
				<Image source={require('../../Images/default.jpg')} style={singleConversation.image} />
			)}

			<View style={singleConversation.textContainer}>
				<View style={singleConversation.headerContainer}>
					<Text style={singleConversation.headerText} numberOfLines={1}> 
						{dataConversation.name}
					</Text>
					<Text style={singleConversation.dateMessage}>{dataConversation.dateMessageFormat}</Text>
				</View>
				<Text style={singleConversation.message} numberOfLines={2}>
					{dataConversation.contentLastMessage} 
				</Text>
			</View>
		</TouchableOpacity>
	);
};
export default ConversationComponent;
