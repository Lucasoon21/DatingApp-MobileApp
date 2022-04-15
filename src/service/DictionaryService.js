import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';

const API_URL = apiUrl + '/dictionary';



export async function getAlcoholDictionary() {
	try {
		const response = await httpService.axiosInstance.get(API_URL+'/getAllAlcoholDictionary')
		//console.log(response.status);
		return response.data;
	} catch (err) {
		console.log('Alcohol  ' + err.message);
		return err;
	}
}

export async function getZodiacDictionary() {
	try {
		const response = await httpService.axiosInstance.get(API_URL+'/getAllZodiacDictionary')
		//console.log(response.status);
		return response.data;
	} catch (err) {
		console.log('Zodiac  ' + err.message);
		return err;
	}
}

export async function getReligiousDictionary() {
	try {
		const response = await httpService.axiosInstance.get(API_URL+'/getAllReligiousDictionary')
	//	console.log(response.status);
		return response.data;
	} catch (err) {
		console.log('Religious  ' + err.message);
		return err;
	}
}

export async function getRelationshipDictionary() {
	try {
		const response = await httpService.axiosInstance.get(API_URL+'/getAllRelationshipDictionary')
		//console.log(response.status);
		return response.data;
	} catch (err) {
		console.log('Relationship  ' + err.message);
		return err;
	}
}

export async function getOrientationDictionary() {
	try {
		const response = await httpService.axiosInstance.get(API_URL+'/getAllOrientationDictionary')
	//	console.log(response.status);
		return response.data;
	} catch (err) {
		console.log('Orientation  ' + err.message);
		return err;
	}
}
export async function getHobbyDictionary() {
	try {
		const response = await httpService.axiosInstance.get(API_URL+'/getAllHobbyDictionary')
	//	console.log(response.status);
		return response.data;
	} catch (err) {
		console.log('Hobby  ' + err.message);
		return err;
	}
}
export async function getGenderDictionary() {
	try {
		const response = await httpService.axiosInstance.get(API_URL+'/getAllGenderDictionary')
	//	console.log(response.status);
		return response.data;
	} catch (err) {
		console.log('Gender  ' + err.message);
		return err;
	}
}
export async function getEyeColorDictionary() {
	try {
		const response = await httpService.axiosInstance.get(API_URL+'/getAllEyeColorDictionary')
	//	console.log(response.status);
		return response.data;
	} catch (err) {
		console.log('EyeColor  ' + err.message);
		return err;
	}
}
export async function getEducationDictionary() {
	try {
		const response = await httpService.axiosInstance.get(API_URL+'/getAllEducationDictionary')
	//	console.log(response.status);
		return response.data;
	} catch (err) {
		console.log('Education  ' + err.message);
		return err;
	}
}
export async function getCigarettesDictionary() {
	try {
		const response = await httpService.axiosInstance.get(API_URL+'/getAllCigarettesDictionary')
	//	console.log(response.status);
		return response.data;
	} catch (err) {
		console.log('Cigarettes  ' + err.message);
		return err;
	}
}

export async function getChildrenDictionary() {
	try {
		const response = await httpService.axiosInstance.get(API_URL+'/getAllChildrenDictionary')
	//	console.log(response.status);
		return response.data;
	} catch (err) {
		console.log('Children  ' + err.message);
		return err;
	}
}


export default {
    getAlcoholDictionary,
    getChildrenDictionary,
    getCigarettesDictionary,
    getEducationDictionary,
    getEyeColorDictionary,
    getGenderDictionary,
    getHobbyDictionary,
    getOrientationDictionary,
    getRelationshipDictionary,
    getReligiousDictionary,
    getZodiacDictionary,
};
