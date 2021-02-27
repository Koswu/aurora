import fetchJson from './fetchdata'
function testServer(callback){
    fetchJson('post', '/test/post', callback, {
        abc: "DFFD"
    });
}

export {testServer};