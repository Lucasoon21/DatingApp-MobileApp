import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';
import base64 from 'react-native-base64';

const API_URL = apiUrl + '/match';

export async function getAllMatch() {
	console.log('>>> match/getAllMatch');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getAllMatch?profile=' + profileId);
		return response;
	} catch (err) {
		console.log('>>> match/getAllMatch: '+err);
		return err;
	}
}

export async function deleteMatch(matchId) {
	console.log('>>> match/deleteMatch');

	let profileId = await SecureStore.getItemAsync('profileId');

	try {
		const response = await httpService.axiosInstance.delete(API_URL + '/deleteMatch', {
			data: {
				profileId: profileId,
				selectProfileUserId: matchId,
			},
		});
		return response;
	} catch (err) {
		console.log('>>> match/deleteMatch: '+err);
		return err;
	}
}

export default {
	getAllMatch,
	deleteMatch,
};
