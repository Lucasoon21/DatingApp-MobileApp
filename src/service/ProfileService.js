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
		//console.log('response', response.status);
		return response.status;
	} catch (err) {
		console.log('change description  ' + err.message);
		return err;
	}
}

export async function changeProfileDetails(alcohol, job, height, weight, 
	orientation, education, religious, children, cigarettes, eyeColor) {
	let profileId = await SecureStore.getItemAsync('profileId');
	let userId = await SecureStore.getItemAsync('userId');
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
	let profileIdd = await SecureStore.getItemAsync('profileId');
	let userId = await SecureStore.getItemAsync('userId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/getProfileDetails', {
			profileId: profileIdd,
		});
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('change description  ' + err.message);
		return err;
	}
}

export async function getProfileHobby() {
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getProfileHobby?profile='+profileId);
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('change description  ' + err.message);
		return err;
	}
}

export async function changeProfileHobby(hobbyList) {
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changeProfileHobby',{
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




export async function getProfileRelationship() {
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getProfileRelationship?profile='+profileId);
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('change description  ' + err.message);
		return err;
	}
}

export async function changeProfileRelationship(listRelationship) {
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changeProfileRelationship',{
			profileId: profileId,
			listRelationship: listRelationship
		});
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('change description  ' + err.message);
		//console.log(httpService.axiosInstance.defaults)
		return err;
	}
}





export default {
	changeDescription,
	changeProfileDetails,
	getProfileDetails,
	getProfileHobby,
	changeProfileHobby,
	getProfileRelationship,
	changeProfileRelationship
};
