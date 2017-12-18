const socksPort= '40050';
//const socksPort= '9050';
const sites = [
    {id: 0, name: 'local', url: ''},
    {id: 1, name: 'adayroi', url: 'http://adayroi.com'},
    {id: 2, name: 'test', url: ''},
    // {id:1,name:'tgdd',url:'http://thegioididong.com'}
];

const rootData=require("path").resolve( __dirname+'/../data');
var fs=require("fs");
// var usingTor = true;
const request = require('request');
// var torRequest=require('socks5-http-client').request;
const Agent = require('socks5-http-client/lib/Agent');
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();
const decode = entities.decode;

function ops(options,usingTor) {

    if (usingTor) {
        options = Object.assign({}, options, {
            agentClass: Agent,
            agentOptions: {
                socksHost: '127.0.0.1',
                socksPort: socksPort
            }
        });
    }
    return options;
}

function getHtml(url,usingTor) {
    url=(url||"").trim();
    return new Promise((resolve, reject) => {

        if ((url || "") == "") {
            resolve("");
        } else {
            request(ops({
                    url: url,
                    headers: {
                        'Connection': 'keep-alive',
                        'Referer': 'https://www.google.com.vn/',
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
                    }
                },usingTor)
                , function (error, response, body) {
                    // console.log('error:', error); // Print the error if one occurred
                    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    // console.log('body:', body); // Print the HTML for the Google homepage.
                    if (response && response.statusCode && (response.statusCode === 200)) {
                        // console.log(body);
                        if (body && (body !=="undefined")) {
                            resolve(body);
                        } else {
                            reject("Get url return 'undefined'" +url)
                        }

                    } else {
                        reject("get url failed "+url);
                    }
                });
        }

    }).catch(error);

}
function buildContent(callback) {
    var root=rootData;
    return function documentContent(name, url,usingTor) {
        name = (name || "").trim();
        url = (url || "").trim();
        var canSave=name !== '';
        return new Promise(resolve => {
            var fo, dataDir;
            if (name !== '') {


                dataDir = root + "/" + name + "/data";
                require("mkdirp")(dataDir);

                require(root + "/" + name + "/chapters.json").filter((v, idx) => {
                    if (v.link === url) {
                        fo = v;
                        fo.idx = idx;
                        return true;
                    }
                    return false;
                });
            }
            new Promise((setHtmlData,dlfailed) => {
                // luon luon tim thay
                if (fo) {

                    if (canSave && fs.existsSync(dataDir + "/" + fo.idx)) {
                        setHtmlData(fs.readFileSync(dataDir + "/" + fo.idx) + "");
                    } else {
                        getHtml(url,usingTor).then(html => {
                            if (html) {
                                if (canSave) {
                                    fs.writeFileSync(dataDir + "/" + fo.idx, html);
                                }
                                setHtmlData(html)
                            } else {
                                dlfailed("failure download")
                            }

                        })

                    }


                } else {
                    getHtml(url,usingTor).then(html => {
                        if (html) {
                            setHtmlData(html)
                        }

                    })
                }
            }).then(html => {
                if (html) {
                    callback(fo,html,resolve);
                }
            }).catch(error)

        })


    }

}

function error(err){
    console.log(err);
}


module.exports = {
    getHtml: getHtml,
    usingTor: function () {
        usingTor = true;

    },
    sites: sites,
    decode: decode,
    error: error,
    mkdirp:require("mkdirp"),
    path:require("path"),
    rootData:rootData,
    buildContent:buildContent
};