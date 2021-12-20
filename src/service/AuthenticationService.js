import { AxiosPromise } from "axios"
import { featureFlags } from "../shared/featureFlags"
import httpService from "./httpService"
import axios from 'axios';

const API_URL = "http://158.75.93.208:8080/auth"


export async function register(email, password) {

    try {
        const response = await axios.post(API_URL+'/register', {
            email: email,
            password: password,
        });
        console.log(response.status)
        return response
    } catch (err) {
        console.log("Rejestracja "+err.message)
        return err
    }
}
export async function registerDetails(email, name, gender, dateBirth) {

    try {
        const response = await axios.post(API_URL+'/registerDetails', {
            email: email,
            name: name,
            gender: gender,
            dateBirth: dateBirth
        });
        console.log(response.status)
        return response
    } catch (err) {
        console.log("Rejestracja detale "+err.message)
        return err
    }
}
export async function login(email, password) {
    try {
        const response = await axios.post(API_URL + "/login", {
            email: email,
            password: password,
        });
        return response

    } catch (err) {
        console.log("Login: " + err)
        return err
    }
}


/* const promise = await httpService.get(API_URL+"/testApi")
 const {data: sqlObj } = promise;
 return sqlObj*/
/*
try {
    const promise = await httpService.post(API_URL+"/register",{
        params: {login: login, password: password},
    });
    const { data: response } = promise
    localStorage.setItem("JWT", response.token);
    return userService.
} catch (err) {

}*/


export default {
    register,
    login,
    registerDetails,
}