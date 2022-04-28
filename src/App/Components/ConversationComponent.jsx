import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Menu from '../Controls/Menu';
import DetailsProfileScreen from '../Pages/DetailsProfileScreen';
import { contact, styles, singleConversation } from '../Styles/ConversationsStyle';
import MenuTop from '../Unused/MenuTop';
import PairComponent from './PairComponent';

const ConversationComponent = (props) => {
	const goChat = () => props.navigation.navigate('ChatScreen',{
        profileId: dataConversation.profileId,
    })
	const [dataConversation, setDataConversation] = useState([]);

	useEffect(() => {
		if (props.conversations != null) {
			setDataConversation(props.conversations);
			console.log("dataConversation",dataConversation)
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
/*
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
*/
