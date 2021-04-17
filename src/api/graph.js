import fetchJson from "./fetchdata.js"

function fetchAllGraph(callback, failedCallback) {
    fetchJson("GET", "/api/v1/graph", (response)=>{
        callback(response)
    }, (errMsg)=>{
        failedCallback(errMsg)
    })
}

export {fetchAllGraph};