import config from "../config"
import storageKeys from "../common/variable/storagekey"
function fetchJson(method, path, callback, failedCallback, data={}){
    const url = config.BACKEND_SERVE_BASEURL + path;
    const token = localStorage.getItem(storageKeys.AUTH_TOKEN)
    fetch(url, {
        method: method,
        body: method=='GET'?null:JSON.stringify(data),
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token?'Bearer ' + token: ''
        })
    }).then((response) => {
        response.json().then((response) =>{
            if (response.code == 200){
                callback(response.data);
            } else {
                failedCallback(response.msg)
            }
        }).catch((errmsg) => {
            handleFailed(errmsg); 
            failedCallback("JSON解析失败");
        });
    }).catch((errmsg) => {
        handleFailed(errmsg);
        failedCallback("请求发送失败");
    });
}
function handleFailed(e){
    console.log(e);
}

export default fetchJson;