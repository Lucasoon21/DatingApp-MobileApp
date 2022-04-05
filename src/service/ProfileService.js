import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';

const API_URL = apiUrl + '/profile';

export async function changeDescription(description) {
	let profileId = await SecureStore.getItemAsync('profileId');
	let userId = await SecureStore.getItemAsync('userId');
	//console.log(profileId)
	//console.log(userId)
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changeDescription', {
			profileId: profileId,
			description: description,
		});
		console.log('response', response.status);
		return response.status;
	} catch (err) {
		console.log('change description  ' + err.message);
		return err;
	}
}

export async function changeProfileDetails(alcohol, job, height, weight, 
	orientation, education, religious, children, cigarettes, eyeColor) {
	console.log("dsdsfdsa ")
	let profileId = await SecureStore.getItemAsync('profileId');
	let userId = await SecureStore.getItemAsync('userId');
	console.log(profileId +" "+ userId)
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changeProfileDetails', {
			profileId: profileId,
			alcoholId: alcohol,
			job: job,
			height: height,
			weight: weight,
			orientationId: orientation,
			educationId: education,
			religiousId: religious,
			childrenId: children,
			cigarettesId: cigarettes,
			eyeColorId: eyeColor,
		});
		//('response', response);
		return response.status;
	} catch (err) {
		console.log('change description  ' + err.message);
		return err;
	}
}

export async function getProfileDetails() {
	console.log("dsdsfdsa ")
	let profileIdd = await SecureStore.getItemAsync('profileId');
	let userId = await SecureStore.getItemAsync('userId');
	console.log(profileIdd +" "+ userId)
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/getProfileDetails', {
			profileId: profileIdd,
		});
		console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('change description  ' + err.message);
		return err;
	}
}


export default {
	changeDescription,
	changeProfileDetails,
	getProfileDetails
};
