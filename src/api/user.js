import fetchJson from './fetchdata.js'
import config from '../config.js'
import storageKeys from '../common/variable/storagekey.js'

function userLogin(username, password, callback, failedCallback) {
    fetchJson("POST", "/api/v1/token", (response) => {
        return callback(response);
    }, (errMsg)=>{
        return failedCallback(errMsg);
    }, {
        username: username,
        password: password
    })
}

function userRegister(username, password, email, callback, failedCallback){
    fetchJson("POST", "/api/v1/user", callback, failedCallback, {
        username: username,
        password: password,
        email: email,
    });
}

function refreshToken(callback, failedCallback){
    fetchJson("GET", "/api/v1/token", (data)=>{
        localStorage.setItem(storageKeys.AUTH_TOKEN,data)
        callback(data);
    }, failedCallback)
}

export {userLogin, userRegister, refreshToken};