import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import api from '../../Api/posts';
import AuthenticationService from '../../service/AuthenticationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // <-- import useNavigation hook

const LoginPanel = (props) => {
	const [testApi, setTestApi] = useState('aa');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigation = useNavigation();

	const login = async () => {
		//console.log('Dane: ' + email + ' ' + password);
		let response = await AuthenticationService.login(email, password);
		console.log('res', response);
		if (response == 200) {
			//await AsyncStorage.setItem('access_token', response.data.access_token);
			//await AsyncStorage.setItem('refresh_token', response.data.refresh_token);
			navigation.navigate('SwipeScreen');
		} else {
			setError('BŁĄD');
			alert('Nieprawidłowe dane logowania');
		}
	};

	return (
		<>
			<Text>Witaj!</Text>
			{/* <Image source={require('../Images/logo.png')} style={styles.logo}/> */}
			<TextInput mode='outlined' label='E-mail' placeholder='Wpisz e-mail...' style={styles.input} value={email} onChangeText={(text) => setEmail(text)} />
			<TextInput
				mode='outlined'
				label='Hasło'
				placeholder='Wpisz hasło...'
				style={styles.input}
				secureTextEntry
				right={<TextInput.Icon name='eye' />}
				value={password}
				onChangeText={(text) => setPassword(text)}
			/>
			<Text style={styles.forgot_password}>Nie pamiętasz hasła?</Text>
			<Button mode='contained' style={styles.loginButton} onPress={() => login()}>
				Zaloguj się
			</Button>
			<Text style={styles.forgot_password}>{error}</Text>
		</>
	);
};
export default LoginPanel;

const styles = StyleSheet.create({
	logo: {
		width: 100,
		height: 100,
	},
	input: {
		maxHeight: 50,
		width: 200,
		marginBottom: 20,
	},
	forgot_password: {
		textAlign: 'right',
		width: 200,
	},
	loginLink: {
		flexDirection: 'row',
		width: 400,
		textAlign: 'right',
		alignItems: 'center',
		justifyContent: 'center',
	},
	loginButton: {
		color: 'blue',
	},
	loginButton: {
		width: 200,
	},
});
