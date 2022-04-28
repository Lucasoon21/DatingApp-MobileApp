import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, Pressable } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import api from '../../Api/posts';
import AuthenticationService from '../../service/AuthenticationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // <-- import useNavigation hook
import { Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import {Colors, Carousel, PageControl, Modal} from 'react-native-ui-lib';
import * as SecureStore from 'expo-secure-store';
import httpService from '../../service/httpService';

const LoginPanel = (props) => {
	const [testApi, setTestApi] = useState('aa');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigation = useNavigation();
	const [showPassword, setShowPassword] = useState(false);

	const [visible, setVisible] = React.useState(false);
	const showDialog = () => setVisible(true);
	const hideDialog = () => setVisible(false);
	const [modalVisible, setModalVisible] = useState(false);

	const login = async () => {
		//console.log('Dane: ' + email + ' ' + password);
		let response = await AuthenticationService.login(email, password);
		//console.log('res 1', response.status);
		//console.log('res 2', response.data);

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
			console.log('Złe hasło lub login');
		} else if(response==200) {
			navigation.navigate('SwipeScreen')
		}
		//await AsyncStorage.setItem('access_token', response.data.access_token);
		//await AsyncStorage.setItem('refresh_token', response.data.refresh_token);
		//console.log(response)
		//navigation.navigate('SwipeScreen');
		/*} else {
			setError('BŁĄD');
			alert('Nieprawidłowe dane logowania');
		}*/
	};

	return (
		<>
			{/* <Text>Witaj!</Text> */}
			{/* <Image source={require('../Images/logo.png')} style={styles.logo}/> */}
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
			<Button mode='contained' style={styles.loginButton} onPress={() => login()}>
				Zaloguj się
			</Button>

			{/* <Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}>
				<View style={stylesModal.centeredView}>
					<View style={stylesModal.modalView}>
						<Text style={stylesModal.modalText}>Hello World!</Text>
						<Pressable style={[stylesModal.button, stylesModal.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
							<Text style={stylesModal.textStyle}>Hide Modal</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			<Pressable style={[stylesModal.button, stylesModal.buttonOpen]} onPress={() => setModalVisible(true)}>
				<Text style={stylesModal.textStyle}>Show Modal</Text>
			</Pressable> */}
			{/* <Provider style={styles.container}>
				<Portal>
					<Dialog visible={visible} onDismiss={hideDialog}>
						<Dialog.Title>Alert</Dialog.Title>
						<Dialog.Content>
							<Paragraph>This is simple dialog</Paragraph>
						</Dialog.Content>
						<Dialog.Actions>
							<Button onPress={hideDialog}>Done</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
			</Provider> */}
			<Text style={styles.forgot_password}>{error}</Text>
		</>
	);
};
export default LoginPanel;


const stylesModal = StyleSheet.create({
	centeredView: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  marginTop: 22,
	},
	modalView: {
	  margin: 20,
	  backgroundColor: 'white',
	  borderRadius: 20,
	  padding: 35,
	  alignItems: 'center',
	  shadowColor: '#000',
	  shadowOffset: {
		width: 0,
		height: 2,
	  },
	  shadowOpacity: 0.25,
	  shadowRadius: 4,
	  elevation: 5,
	},
	button: {
	  borderRadius: 20,
	  padding: 10,
	  elevation: 2,
	},
	buttonOpen: {
	  backgroundColor: '#F194FF',
	},
	buttonClose: {
	  backgroundColor: '#2196F3',
	},
	textStyle: {
	  color: 'white',
	  fontWeight: 'bold',
	  textAlign: 'center',
	},
	modalText: {
	  marginBottom: 15,
	  textAlign: 'center',
	},
  });

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
});
