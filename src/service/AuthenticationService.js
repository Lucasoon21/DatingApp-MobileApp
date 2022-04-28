import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';

const API_URL = apiUrl + '/auth';

export async function login(email, password) {
	console.log('>>> auth/login');

	try {
		const promise = await httpService.axiosInstance.post(API_URL + '/login', {
			email: email,
			password: password,
		});
		const { data: response, status: status } = promise;
		if(promise.status==200) {
			if(promise.data.isError=="YES") {
				return promise.data
			} else {
				await SecureStore.setItemAsync('access_token', promise.data.access_token);
				await SecureStore.setItemAsync('refresh_token', promise.data.refresh_token);
				await SecureStore.setItemAsync('profileId', promise.data.profile_id);
				await SecureStore.setItemAsync('userId', promise.data.user_id);
				const token = await SecureStore.getItemAsync('access_token');
				httpService.setJwt(promise.data.access_token);
				return promise.status
			}
		}
		return promise;
	} catch (err) {
		console.log('auth/login: ' + err);
		return err;
	}
	/*
	try {
		const response = await httpService.axiosInstance
			.post(API_URL+'login', {
				email: email,
				password: password,
			})
			.then((response) => {
                console.log(response)
				AsyncStorage.setItem('access_token', response.data.access_token);
				httpService.axiosInstance.setAuthHeader(response.data.access_token);
			})
			.catch((error) => {
				console.log("Błąd ",error.response);
			});

		return response;
	} catch (err) {
		console.log('Login: ' + err);
		return err;
	}*/
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
		return response;
	} catch (err) {
		console.log('>>> auth/register: '+err);
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
		//console.log(response.status);
		return response;
	} catch (err) {
		console.log('>>> auth/registerDetails: '+err);
		return err;
	}
}

export default {
	register,
	login,
	registerDetails,
};
