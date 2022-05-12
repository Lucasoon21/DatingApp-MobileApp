import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';

const API_URL = apiUrl + '/auth';

export async function login(email, password) {
	console.log('>>> auth/login');

	try {
		const response = await httpService.axiosInstance.post(API_URL + '/login', {
			email: email,
			password: password,
		});
		if (response.status == 200) {
			console.log('<<< auth/login STATUS >>> ' + response.status);
			if (response.data.isError == 'YES') {
				return response.data;
			} else {
				await SecureStore.setItemAsync('access_token', response.data.access_token);
				await SecureStore.setItemAsync('refresh_token', response.data.refresh_token);
				await SecureStore.setItemAsync('profileId', response.data.profile_id);
				await SecureStore.setItemAsync('userId', response.data.user_id);
				const token = await SecureStore.getItemAsync('access_token');
				httpService.setJwt(response.data.access_token);
				return response.status;
			}
		}
		return response;
	} catch (err) {
		console.log('auth/login: ' + err);
		return err;
	}

}

export async function register(email, password, confirmPassword, name, date, genderValue, orientationValue) {
	console.log('>>> auth/register');

	try {
		const response = await httpService.axiosInstance.post(API_URL + '/register', {
			email: email,
			password: password,
			confirmPassword: confirmPassword,
			name: name,
			dateBirth: date,
			gender: genderValue,
			orientation: orientationValue,
		});
		console.log('<<< auth/register STATUS >>> ' + response.status);
		return response;
	} catch (err) {
		console.log('>>> auth/register: ' + err);
		return err;
	}
}
export async function registerDetails(email, name, gender, dateBirth, orientation) {
	console.log('>>> auth/registerDetails');

	try {
		const response = await httpService.axiosInstance.post(API_URL + '/registerDetails', {
			email: email,
			name: name,
			gender: gender,
			dateBirth: dateBirth,
			orientation: orientation,
		});
		 
		console.log('<<< auth/registerDetails STATUS >>> ' + response.status);
		return response;
	} catch (err) {
		console.log('>>> auth/registerDetails: ' + err);
		return err;
	}
}

export default {
	register,
	login,
	registerDetails,
};
