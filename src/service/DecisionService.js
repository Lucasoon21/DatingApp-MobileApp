import * as SecureStore from 'expo-secure-store';
import { apiUrl } from '../../config';
import httpService from './httpService';

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


