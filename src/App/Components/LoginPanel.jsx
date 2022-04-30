import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, Linking, Pressable } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import api from '../../Api/posts';
import AuthenticationService from '../../service/AuthenticationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // <-- import useNavigation hook
import { Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import httpService from '../../service/httpService';
import Toast from 'react-native-toast-message';
import { configToast } from './configToast';
import LoaderElements from '../Components/LoaderElements';

const LoginPanel = (props) => {
	const [testApi, setTestApi] = useState('aa');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigation = useNavigation();
	const [showPassword, setShowPassword] = useState(false);

	const [visible, setVisible] = React.useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [returnResponse, setReturnResponse] = useState(true);

	const showToast = (type, headerText, subText) => {
		Toast.show({
			type: type,
			text1: headerText,
			text2: subText,
			visibilityTime: 10000,
		});
	};

	const login = async () => {
		setReturnResponse(false);
		//console.log('Dane: ' + email + ' ' + password);
		let response = await AuthenticationService.login(email, password);
		//console.log('res 1', response.status);
		//console.log('res 2', response.data);
		setVisible(true);
		if (response.isOver18Years == 'ERR') {
			navigation.navigate('AreUnderAgeScreen');
			console.log('Wiek');
		} else if (response.isActive == 'ERR') {
			await SecureStore.setItemAsync('access_token', response.access_token);
			await SecureStore.setItemAsync('refresh_token', response.refresh_token);
			await SecureStore.setItemAsync('profileId', response.profile_id);
			await SecureStore.setItemAsync('userId', response.user_id);
			const token = await SecureStore.getItemAsync('access_token');
			httpService.setJwt(token);
			navigation.navigate('ActivateAccountScreen');
			console.log('Niekatywne');
		} else if (response.password == 'ERR' || response.email == 'ERR') {
			showToast('error','Nieprawidłowe dane', 'Podane dane są nieprawdidłowe! Upewnij się że poprawnie wpisałeś swoje dane')
		} else if (response == 200) {
			navigation.navigate('SwipeScreen');
		} else {
			showToast('error','Błąd logowania', 'Wystąpił niespodziewany błąd, spróbuj ponownie później')
		}
		setReturnResponse(true);
		//showToast();
	};
 
	return (
		<>
			<Toast config={configToast}/>

			<TextInput mode='outlined' label='E-mail' placeholder='Wpisz e-mail...' style={styles.input} value={email} onChangeText={(text) => setEmail(text)} />
			<TextInput
				mode='outlined'
				label='Hasło'
				placeholder='Wpisz hasło...'
				style={styles.input}
				secureTextEntry={!showPassword}
				right={<TextInput.Icon name={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />}
				value={password}
				onChangeText={(text) => setPassword(text)}
			/>
			{/* <Text style={styles.forgot_password}>Nie pamiętasz hasła?</Text> */}
			{returnResponse ? (
				<>
					<Button mode='contained' style={styles.loginButton} onPress={() => login()}>
						Zaloguj się
					</Button>
					<Text style={styles.errorText}>{error}</Text>
				</>
			) : (
				<>
					<LoaderElements />
				</>
			)}
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
		//maxHeight: 50,
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
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	errorText: {
		marginTop: 10,
		color: 'red',
		fontSize: 15,
		fontWeight: 'bold',
	},
});
