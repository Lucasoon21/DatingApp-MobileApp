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

export async function changeAgePreferences(ageFrom, ageTo) {
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
		console.log('change description  ' + err.message);
		return err;
	}
}
export async function getHobbyPreferences() {
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getPreferencesHobby?profile='+profileId);
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('change description  ' + err.message);
		return err;
	}
}
export async function changePreferencesHobby(hobbyList) {
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changePreferencesHobby',{
			profileId: profileId,
			listHobby: hobbyList
		});
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('change description  ' + err.message);
		return err;
	}
}


export async function getHeightPreferences() {
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getHeightPreferences?profile='+profileId);
		return response;
	} catch (err) {
		console.log('get height  ' + err.message);
		return err;
	}
}

export async function changeHeightPreferences(heightFrom, heightTo) {
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
		console.log('change description  ' + err.message);
		return err;
	}
}

export async function getWeightPreferences() {
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getWeightPreferences?profile='+profileId);
		return response;
	} catch (err) {
		console.log('get weight  ' + err.message);
		return err;
	}
}

export async function changeWeightPreferences(weightFrom, weightTo) {
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
		console.log('change description  ' + err.message);
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
};
