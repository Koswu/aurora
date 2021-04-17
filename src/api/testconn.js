import fetchJson from './fetchdata.js'
function testServer(callback){
    fetchJson('post', '/test/post', callback, {
        abc: "DFFD"
    });
}

export {testServer};