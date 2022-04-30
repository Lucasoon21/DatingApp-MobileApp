import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';
import base64 from 'react-native-base64';

const API_URL = apiUrl + '/decision';

export async function swipeDecision(params) {
	console.log('>>> decision/swipeUser');
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/swipeUser', {
			decision: params.decision,
			selectProfileUserId: params.selectProfileUserId,
			profileId: profileId,
		});
		console.log('<<< decision/swipeUser STATUS >>> ' + response.status);
		return response;
	} catch (err) {
		console.log('>>> decision/swipeUser: ' + err);
		return err;
	}
}

export default {
	swipeDecision,
};
