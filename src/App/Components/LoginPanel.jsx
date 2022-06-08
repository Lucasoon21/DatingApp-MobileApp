import { useNavigation } from '@react-navigation/native'; // <-- import useNavigation hook
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useToast } from 'react-native-toast-notifications';
import AuthenticationService from '../../service/AuthenticationService';
import httpService from '../../service/httpService';
import LoaderElements from '../Components/LoaderElements';
import { configToast } from './configToast';

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

	const toast = useToast();
	const showToast = (type, headerText, subText) => {
		toast.show(subText, {
			type: type,
			placement: 'top',
			duration: 40000,
			animationDuration: 100,
			animationType: 'zoom-in',
			data: {
				title: headerText,
			},
		});
	};

	const login = async () => {
		setReturnResponse(false);
		let response = await AuthenticationService.login(email, password);
		setVisible(true);
		if (response.isOver18Years == 'ERR') {
			navigation.navigate('AreUnderAgeScreen');
		} else if (response.isActive == 'ERR') {
			await SecureStore.setItemAsync('userId', response.user_id);
			await SecureStore.setItemAsync('profileId', response.profile_id);
			await SecureStore.setItemAsync('refresh_token', response.refresh_token);
			await SecureStore.setItemAsync('access_token', response.access_token);
			const token = await SecureStore.getItemAsync('access_token');
			httpService.setJwt(token);
			navigation.navigate('ActivateAccountScreen');
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
