import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';
import base64 from 'react-native-base64';

const API_URL = apiUrl + '/chat';

export async function getConversation(profileSecond) {
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getConversation?profileFirst=' + profileId + '&profileSecond=' + profileSecond);
		//	console.log(response);
		return response;
	} catch (err) {
		console.log('fetch profiles  ' + err.message);
		return err;
	}
}

export async function getListConversation() {
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getListConversation?profile=' + profileId);
		//	console.log(response);
		return response;
	} catch (err) {
		console.log('fetch profiles  ' + err.message);
		return err;
	}
}

export async function sendMessage(params) {
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.post(API_URL + '/sendMessage', {
			senderProfileId: profileId,
			receiverProfileId: params.recieverId,
			contentMessage: params.contentMessage,
		});
		//	console.log(response);
		return response;
	} catch (err) {
		console.log('fetch profiles  ' + err.message);
		return err;
	}
}

export default {
	getListConversation,
	getConversation,
	sendMessage,
};
