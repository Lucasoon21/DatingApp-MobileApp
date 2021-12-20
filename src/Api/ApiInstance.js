import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios"
import JwtManager from "./JwtManager"

let _lastRefreshJwt
let _refreshDuring = false
let _firstRefresh = true
const _refreshJwtInMinutes = 45
/*
export function createApiInstance() {
    const api = axios.create()

    api.interceptors.request.use(
        (config) => {
            const token = JwtManager.getAccessToken()
            if (token) {
                config.headers["Authorization"] = "Bearer " + token
            }
            return config
        },
        (error) => {
            Promise.reject(error)
        }
    )

    api.interceptors.response.use((response) => {
        const token = JwtManager.getAccessToken()
        const refJwt = _lastRefreshJwt ? _lastRefreshJwt.getTime() : new Date().getTime()
        if (
            (Math.round(new Date().getTime() - refJwt) / 60000 >= _refreshJwtInMinutes &&
                !_refreshDuring && token) ||
            (token && _firstRefresh && !_refreshDuring)
        ) {
            _refreshDuring = true
            _lastRefreshJwt = new Date()
            _firstRefresh = false

            //ODŚWIEŻENIE REFRESH TOKENA
            // TODO
        }

    })
}*/