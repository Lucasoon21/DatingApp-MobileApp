/*import { AsyncStorage } from "react-native"

const JwtManager = () => {
    function _setAccessToken(jwt) {
        AsyncStorage.setItem("access_token", jwt)
    }

    function _getAccessToken() {
        return AsyncStorage.getItem("access_token")
    }
    function _clearToken() {
        AsyncStorage.removeItem("access_token")
    }

    function _setRefreshToken(refreshToken) {
        AsyncStorage.setItem("refresh_token", refreshToken)
    }
    function _getRefreshToken() {
        return AsyncStorage.getItem("refresh_token")
    }
    function _clearRefreshToken() {
        AsyncStorage.removeItem("refresh_token")
    }
    return {
        setAccessToken: _setAccessToken,
        getAccessToken: _getAccessToken,
        clearToken: _clearToken,
        setRefreshToken: _setRefreshToken,
        getRefreshToken: _getRefreshToken,
        clearRefreshToken: _clearRefreshToken,
    }
}
export default JwtManager()*/

const JwtManager = () => {

    function _getAccessToken() {
        return AsyncStorage.getItem("access_token")
    }
    return {
        getAccessToken: _getAccessToken,
    }
}
export default JwtManager()