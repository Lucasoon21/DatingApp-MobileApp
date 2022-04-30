import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';
import base64 from 'react-native-base64';

const API_URL = apiUrl + '/chat';

export async function getConversation(profileSecond) {
	console.log('>>> chat/getConversation');
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getConversation?profileFirst=' + profileId + '&profileSecond=' + profileSecond);
		 
		console.log("<<< chat/getConversation STATUS >>> "+response.status)
		return response;	
	} catch (err) {
		console.log('>>> chat/getConversation: '+err);
		return err;
	}
}

export async function getListConversation() {
	console.log('>>> chat/getListConversation');
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getListConversation?profile=' + profileId);
		 
		console.log("<<< chat/getListConversation STATUS >>> "+response.status)
		return response;	
		} catch (err) {
		console.log('>>> chat/getListConversation'+err);
		return err;
	}
}

export async function sendMessage(params) {
	console.log('>>> chat/sendMessage');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.post(API_URL + '/sendMessage', {
			senderProfileId: profileId,
			receiverProfileId: params.recieverId,
			contentMessage: params.contentMessage,
		});
		 
		console.log("<<< chat/sendMessage STATUS >>> "+response.status)
		return response;	
		} catch (err) {
		console.log('>>> chat/sendMessage: '+err);
		return err;
	}
}
 
export default {
	getListConversation,
	getConversation,
	sendMessage,
};
