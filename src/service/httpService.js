import axios from 'axios'
import logger from './logService'
/*
axios.interceptors.response.use(null, (error) => {
    const expectedError = error.response && error.response.status >=400 && error.response.status <500;
    if(error.response && error.response.status === 401 && error.response.data==="jwtExpErr") {
        localStorage.setItem("jwtExpired",true);
        windows.location = "#"
    }
    if(!expectedError) {
        logger.log(error)
        console.log("wystapil problem")
    } else {
        console.log("cos innego")
    }
    return Promise.reject(error)
})

function setJwt(jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt,
}*/