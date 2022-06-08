import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Menu from '../Controls/Menu';
import DetailsProfileScreen from '../Pages/DetailsProfileScreen';
import { styles, contact } from '../Styles/ChatStyle';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const PairComponent = (props) => {
	const goProfile = () =>
		props.navigation.navigate('DetailsProfileScreen', {
			myProfile: false,
			profileUser: profileData,
		});
	const goChat = () =>
		props.navigation.navigate('ChatScreen', {
			profileId: profileData.profileId,
			name: profileData.name,
			photo: image.imageLink ?? "",
		});
	const [profileData, setProfileData] = useState([]);
		const [image, setImage] = useState();
	useEffect(() => {
		console.log(props.profile.image)
		if (props.profile != null) {
			setProfileData(props.profile);
			setImage(props.profile.image??"")
		}
	}, []);
 
	return (
		<>
			<View style={contact.container}>
				<TouchableOpacity onPress={goProfile}>
					<View style={contact.left}>
						{profileData.image ? <Image source={{ uri: profileData.image.imageLink }} style={contact.image} /> : <Image source={require('../../Images/default.jpg')} style={contact.image} />}

						<View style={contact.textContainer}>
							<Text style={contact.text} numberOfLines={1}>
								{profileData.name}, {profileData.age}
							</Text> 
							{/* <Text style={contact.text} numberOfLines={1}>
								a
							</Text> */}
						</View>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={goChat}>
					<Entypo name='chevron-thin-right' size={40} color='black' />
				</TouchableOpacity>
			</View>
		</>
	);
};
export default PairComponent;
