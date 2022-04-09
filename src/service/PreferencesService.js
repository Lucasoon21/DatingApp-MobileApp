import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';

const API_URL = apiUrl + '/preferences';

export async function getAgePreferences() {
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getAgePreferences?profile='+profileId);
		
		return response;
	} catch (err) {
		console.log('get age  ' + err.message);
		return err;
	}
}
export default {
	changeAgePreferences,
    getAgePreferences,
};
