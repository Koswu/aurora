import { post } from "jquery";
import fetchJson from "./fetchdata";

function searchInfoNode(keyword, callback, failedCallback){
    fetchJson("GET", `/api/v1/info-node?keyword=${encodeURIComponent(keyword)}`, callback, failedCallback)
}
function getInfoNodes(callback, failedCallback) {
    fetchJson("GET", `/api/v1/info-node`, callback, failedCallback)
}

function searchSourceNode(descKeyword, urlKeyword, callback, failedCallback){
    fetchJson("GET", `/api/v1/source-node?desc_keyword=${encodeURIComponent(descKeyword)}&url_keyword=${encodeURIComponent(urlKeyword)}`
    , callback, failedCallback)
}
function getExternalSourceNode(callback, failedCallback){
    fetchJson("GET", `/api/v1/source-node`, callback, failedCallback)
}

function addExternalSourceNode(description, url, callback, failedCallback) {
    fetchJson("POST", `/api/v1/source-node`, callback, failedCallback, {
        description: description,
        url: url,
    })
}

function addInfoNode(content, inferenceIds, externalSourceIds, callback, failedCallback) {
    fetchJson("POST", `/api/v1/info-node`, callback, failedCallback, {
        content: content,
        info_source_ids: inferenceIds,
        external_source_ids: externalSourceIds,
    })
}

function showInfoNode(id, callback, failedCallback){
    fetchJson("GET", `/api/v1/info-node/` + id, callback, failedCallback)
}
function showSourceNode(id, callback, failedCallback){
    fetchJson("GET", `/api/v1/source-node/` + id, callback, failedCallback)
}

function deleteInfoNode(id, callback, failedCallback){
    fetchJson("DELETE", `/api/v1/info-node/` + id, callback, failedCallback)
}
function deleteSourceNode(id, callback, failedCallback){
    fetchJson("DELETE", `/api/v1/source-node/` + id, callback, failedCallback)
}
function editInfoNode(id, content, inferenceIds, externalSourceIds, callback, failedCallback){
    let postdata = {}
    if (content !== undefined){
        postdata.content = content
    }
    if (inferenceIds !== undefined){
        postdata.inference_ids = inferenceIds
    }
    if (externalSourceIds !== undefined){
        postdata.external_source_ids = externalSourceIds
    }
    fetchJson("PATCH", `/api/v1/info-node` + id, callback, failedCallback, postdata)
}

function getMyRate(id, callback, failedCallback){
    fetchJson("GET", `/api/v1/info-node/${id}/my-rate`, callback, (err)=>{

    })
}

function putMyRate(id, rate, callback, failedCallback){
    fetchJson("PUT", `/api/v1/info-node/${id}/my-rate?rating=${encodeURIComponent(rate)}`, callback, failedCallback)
}


export {searchInfoNode, searchSourceNode, getInfoNodes, getExternalSourceNode, addInfoNode,
     addExternalSourceNode, showInfoNode, deleteInfoNode, editInfoNode, deleteSourceNode, 
     showSourceNode, getMyRate, putMyRate};