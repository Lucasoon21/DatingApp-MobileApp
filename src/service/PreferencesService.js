import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';

const API_URL = apiUrl + '/preferences';

export async function getAgePreferences() {
	console.log('>>> preferences/getAgePreferences');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getAgePreferences?profile='+profileId);
		return response;
	} catch (err) {
		console.log('>>> preferences/getAgePreferences: '+err);
		return err;
	}
}

export async function changeAgePreferences(ageFrom, ageTo) {
	console.log('>>> preferences/changeAgePreferences');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changeAgePreferences',{
			profileId: profileId,
			ageFrom: ageFrom,
			ageTo: ageTo,
		});
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('>>> preferences/changeAgePreferences: '+err);
		return err;
	}
}
export async function getHobbyPreferences() {
	console.log('>>> preferences/getPreferencesHobby');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getPreferencesHobby?profile='+profileId);
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('>>> preferences/getPreferencesHobby: '+err);
		return err;
	}
}
export async function changePreferencesHobby(hobbyList) {
	console.log('>>> preferences/changePreferencesHobby');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changePreferencesHobby',{
			profileId: profileId,
			listHobby: hobbyList
		});
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('>>> preferences/changePreferencesHobby: '+err);
		return err;
	}
}


export async function getHeightPreferences() {
	console.log('>>> preferences/getHeightPreferences');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getHeightPreferences?profile='+profileId);
		return response;
	} catch (err) {
		console.log('>>> preferences/getHeightPreferences: '+err);
		return err;
	}
}

export async function changeHeightPreferences(heightFrom, heightTo) {
	console.log('>>> preferences/changeHeightPreferences');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changeHeightPreferences',{
			profileId: profileId,
			heightFrom: heightFrom,
			heightTo: heightTo,
		});
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('>>> preferences/changeHeightPreferences: '+err);
		return err;
	}
}

export async function getWeightPreferences() {
	console.log('>>> preferences/getWeightPreferences');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getWeightPreferences?profile='+profileId);
		return response;
	} catch (err) {
		console.log('>>> preferences/getWeightPreferences: '+err);
		return err;
	}
}

export async function changeWeightPreferences(weightFrom, weightTo) {
	console.log('>>> preferences/changeWeightPreferences');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changeWeightPreferences',{
			profileId: profileId,
			weightFrom: weightFrom,
			weightTo: weightTo,
		});
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('>>> preferences/changeWeightPreferences: '+err);
		return err;
	}
}


export async function getGenderPreferences() {
	console.log('>>> preferences/getPreferencesGender');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getPreferencesGender?profile='+profileId);
		return response;
	} catch (err) {
		console.log('>>> preferences/getPreferencesGender: '+err);
		return err;
	}
}

export async function changePreferencesGender(genderList) {
	console.log('>>> preferences/changePreferencesGender');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changePreferencesGender',{
			profileId: profileId,
			listGender: genderList
		});
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('>>> preferences/changePreferencesGender: '+err);
		return err;
	}
}



export default {
	
    getAgePreferences,
    changeAgePreferences,
    getHobbyPreferences,
    changePreferencesHobby,
    getHeightPreferences, 
    changeHeightPreferences,
    getWeightPreferences, 
    changeWeightPreferences,
	getGenderPreferences,
	changePreferencesGender,
};
