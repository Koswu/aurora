import fetchJson from "./fetchdata";

function searchNode(keyword, callback, failedCallback){
    fetchJson("GET", `/api/v1/info_node?keyword=${encodeURIComponent(keyword)}`, callback, failedCallback)
}

export {searchNode};