import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import React from 'react';
import { TextInput, Button } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import ProfileService from '../../service/ProfileService';

const ActivateAccountScreen = (props) => {
	const goBack = async () => {
		await SecureStore.deleteItemAsync('access_token');
		await SecureStore.deleteItemAsync('refresh_token');
		await SecureStore.deleteItemAsync('profileId');
		await SecureStore.deleteItemAsync('userId');
		props.navigation.navigate('AuthScreen');
	}
	const goActivate = async () =>{
		let response = await ProfileService.activateAccount();
		if (response.status === 200) {
			props.navigation.navigate('SwipeScreen');
		}
	}
	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Twoje konto jest nieaktywne</Text>
			<Text style={styles.text}>Aby ponownie twoje konto zostało aktywne, naciśnij przycisk na poniżej</Text>

			<Button mode='contained'onPress={() => goBack()} style={styles.button}>
				Wróć do strony głownej
			</Button>
			<Button mode='contained'onPress={() => goActivate()} style={styles.button}>
				Aktywuj konto
			</Button>
		</View>
	);
};

export default ActivateAccountScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 15,
	},
	headerText: {
		fontSize: 50,
		marginVertical: 15,
		textAlign: 'center',
	},
	text: {
		fontSize: 20,
		marginVertical: 15,
		textAlign: 'center',
	},
	button: {
		marginVertical: 10,
	}
});
