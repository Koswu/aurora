import config from '../config'
import storageKeys from '../common/variable/storagekey'
import fetchJson from './fetchdata'

function userLogin(username, password, callback, failedCallback) {
    fetchJson("POST", "/api/v1/token", (response) => {
        if (response.code != 200){
            return failedCallback(response.errMsg);
        }
        callback(response);
    }, (errMsg)=>{
        failedCallback(errMsg);
    }, {
        username: username,
        password: password
    })
}

function userRegister(username, password, callback, failedCallback){
    fetchJson("POST", "/register", callback, failedCallback, {

    })
}

export {userLogin, userRegister};