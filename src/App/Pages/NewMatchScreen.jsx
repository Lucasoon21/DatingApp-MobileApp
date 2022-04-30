import React from 'react';
import { StyleSheet, Image, Linking, Platform, TouchableOpacity } from 'react-native';
import Menu from '../Controls/Menu';
import { Avatar, AvatarHelper, View, Text, Colors, Typography, Button } from 'react-native-ui-lib';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import BackNavigation from '../Components/BackNavigation';
const NewMatchScreen = (props) => {
	
	const goBack = () => props.navigation.goBack();
	const goProfile = () => {
		props.navigation.navigate('DetailsForeignProfileScreen', {
			myProfile: false,
			profileUser: {
				profileId: props.route.params.profileId,
			},
		});
	};

	return (
		<View style={styles.container}>
			<BackNavigation goBack={goBack} />

			<Text style={styles.matchHeader}>Masz nową parę!</Text>
			<Text style={styles.matchText}>Ty i {props.route.params.name || '  '} wpadliście sobie w oko! Nie czekaj, tylko napisz wiadomość</Text>

			{props.route.params.image ? (
				<>
					<Avatar containerStyle={{ marginVertical: 20 }} onPress={() => goProfile()} source={{ uri: props.route.params.image }} animate size={140} />
				</>
			) : (
				<Avatar containerStyle={{ marginVertical: 20 }} onPress={() => goProfile()} source={require('../../Images/default.jpg')} animate size={140} />
			)}
			<Button style={styles.buttonSendMess}>
				<Text style={styles.buttonText}>Napisz wiadomość</Text>
			</Button>
		</View>
	);
};
export default NewMatchScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 0,
		backgroundColor: 'rgba(245, 50, 50,0.7)',
		paddingVertical: 25,
		paddingHorizontal: 25,
	},
	matchHeader: {
		fontSize: 50,
		textAlign: 'center',
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		marginBottom: 20,
	},
	matchText: {
		fontSize: 20,
		textAlign: 'center',
		fontFamily: 'Roboto',
		marginBottom: 20,
	},
	buttonSendMess: {
		width: 250,
		height: 75,
		backgroundColor: 'rgba(245, 245, 245,0.8)',
	},
	buttonText: {
		fontSize: 20,
	},
	buttonBack: {
		position: 'absolute',
		left: 10,
		top: 10,
		zIndex: 30,
	},
});
