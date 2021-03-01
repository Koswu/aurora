import fetchJson from './fetchdata'

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

export {userLogin, userRegister};