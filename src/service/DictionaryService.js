import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';

const API_URL = apiUrl + '/dictionary';

export async function getAlcoholDictionary() {
	console.log('>>> dictionary/getAlcoholDictionary');

	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getAllAlcoholDictionary');

		console.log('<<< dictionary/getAlcoholDictionary STATUS >>> ' + response.status);
		return response.data;
	} catch (err) {
		console.log('>>> dictionary/getAlcoholDictionary: ' + err);
		return err;
	}
}



export async function getReligiousDictionary() {
	console.log('>>> dictionary/getAllReligiousDictionary');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getAllReligiousDictionary');

		console.log('<<< dictionary/getAllReligiousDictionary STATUS >>> ' + response.status);
		return response.data;
	} catch (err) {
		console.log('>>> dictionary/getAllReligiousDictionary: ' + err);
		return err;
	}
}

export async function getRelationshipDictionary() {
	console.log('>>> dictionary/getAllRelationshipDictionary');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getAllRelationshipDictionary');

		console.log('<<< dictionary/getAllRelationshipDictionary STATUS >>> ' + response.status);
		return response.data;
	} catch (err) {
		console.log('>>> dictionary/getAllRelationshipDictionary: ' + err);
		return err;
	}
}

export async function getOrientationDictionary() {
	console.log('>>> dictionary/getAllOrientationDictionary');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getAllOrientationDictionary');

		console.log('<<< dictionary/getAllOrientationDictionary STATUS >>> ' + response.status);
		return response.data;
	} catch (err) {
		console.log('>>> dictionary/getAllOrientationDictionary: ' + err);
		return err;
	}
}
export async function getHobbyDictionary() {
	console.log('>>> dictionary/getAllHobbyDictionary');

	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getAllHobbyDictionary');

		console.log('<<< dictionary/getAllHobbyDictionary STATUS >>> ' + response.status);
		return response.data;
	} catch (err) {
		console.log('>>> dictionary/getAllHobbyDictionary: ' + err);
		return err;
	}
}
export async function getGenderDictionary() {
	console.log('>>> dictionary/getAllGenderDictionary');

	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getAllGenderDictionary');

		console.log('<<< dictionary/getAllGenderDictionary STATUS >>> ' + response.status);
		return response.data;
	} catch (err) {
		console.log('>>> dictionary/getAllGenderDictionary: ' + err);
		return err;
	}
}
export async function getEyeColorDictionary() {
	console.log('>>> dictionary/getAllEyeColorDictionary');

	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getAllEyeColorDictionary');

		console.log('<<< dictionary/getAllEyeColorDictionary STATUS >>> ' + response.status);
		return response.data;
	} catch (err) {
		console.log('>>> dictionary/getAllEyeColorDictionary: ' + err);
		return err;
	}
}
export async function getEducationDictionary() {
	console.log('>>> dictionary/getAllEducationDictionary');

	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getAllEducationDictionary');

		console.log('<<< dictionary/getAllEducationDictionary STATUS >>> ' + response.status);
		return response.data;
	} catch (err) {
		console.log('>>> dictionary/getAllEducationDictionary: ' + err);
		return err;
	}
}
export async function getCigarettesDictionary() {
	console.log('>>> dictionary/getAllCigarettesDictionary');

	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getAllCigarettesDictionary');

		console.log('<<< dictionary/getAllCigarettesDictionary STATUS >>> ' + response.status);
		return response.data;
	} catch (err) {
		console.log('>>> dictionary/getAllCigarettesDictionary: ' + err);
		return err;
	}
}

export async function getChildrenDictionary() {
	console.log('>>> dictionary/getAllChildrenDictionary');

	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getAllChildrenDictionary');

		console.log('<<< dictionary/getAllChildrenDictionary STATUS >>> ' + response.status);
		return response.data;
	} catch (err) {
		console.log('>>> dictionary/getAllChildrenDictionary: ' + err);
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

};
