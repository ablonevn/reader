
const sites=[
    {id:0,name:'local',url:''},
    {id:1,name:'adayroi',url:'http://adayroi.com'},
    {id:2,name:'test',url:''},
    // {id:1,name:'tgdd',url:'http://thegioididong.com'}
];
var usingTor=true;
var request=require('request');
// var torRequest=require('socks5-http-client').request;
var Agent = require('socks5-http-client/lib/Agent');

function ops(options){

    if (usingTor) {
        options=Object.assign({},options,{
            agentClass:Agent,
            agentOptions: {
                socksHost: '127.0.0.1',
                socksPort: '9050'
            }
        });
    }
    return options;
}

function getHtml(url){
    return new Promise((resolve, reject) => {

        if ((url||"")=="") {
            resolve("");
            return;
        }
        request(ops({
            url: url,

            headers: {
                'Connection':'keep-alive',

                'Host':'truyenfull.vn',
        'Referer':'https://www.google.com.vn/',

        'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'

            }})
        , function (error, response, body) {
            // console.log('error:', error); // Print the error if one occurred
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body:', body); // Print the HTML for the Google homepage.
            if (response && response.statusCode && (response.statusCode==200)) {
                // console.log(body);
                resolve(body);
            } else {
                reject();
            }
        });
    }).catch(() => {});

}
module.exports={
    getHtml:getHtml,
    usingTor:function(){
        usingTor=true;

    },
    sites:sites
}