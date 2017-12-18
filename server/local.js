var fs=require('fs');
var path=require('path');
var cheerio=require('cheerio');
var root=path.resolve(__dirname+"/../data");
var comm=require('./common');
var mkdirp=require('mkdirp');
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();
var decode = entities.decode;
function siteListItem() {
    return new Promise((resolve)=>{
        var ls = [];
        fs.readdir(root, function (err, items) {
            // console.log(items);
            var k = -1;

            for (var i = 0; i < items.length; i++) {
                if (items[i]!="read.json") {
                    ls.push({id: k--, text: items[i],link:items[i]});
                }

            }
            resolve({
                data:ls,
                next:"",
                prev:""
            });
        });


    })


}
function documentList(url) {
    var spl=url.split('@');
    var page=parseInt( spl[1]||"0");
    var dir=spl[0];
    return new Promise(resolve=>{
        resolve({
            data:require(root+"/"+dir+"/chapters.json"),
            next:dir+"@"+(page+1),
            prev:dir +"@"+(page-1)
        });

    })

}
function documentContent(name,url){
    return new Promise(resolve=>{
        var dataDir=root+"/"+name+"/data";
        mkdirp(dataDir);
        var fo;
        var chapters=require(root+"/"+name+"/chapters.json");

        chapters.filter((v,idx)=>{
            if (v.link===url) {
                fo=v;
                fo.idx=idx;
                return true;
            }
            return false;
        });
        // luon luon tim thay
        if (fo) {
            new Promise((setHtmlData,dataError)=>{
                if (fs.existsSync(dataDir+"/"+fo.idx)) {
                    setHtmlData(fs.readFileSync(dataDir+"/"+fo.idx)+"");
                } else {
                    comm.getHtml(url,true).then(html=>{
                        if (html) {
                            fs.writeFileSync(dataDir+"/"+fo.idx,html);
                            setHtmlData(html)
                        } else {
                            dataError("Loi khi download "+url);
                        }


                    }).catch(comm.error)

                }

            }).then(html=>{
                var driver=require(root+"/"+name+"/config.json").driver;
                var tr=require("./"+driver);
                tr.documentContent(name,url).then(r=>{
                    r.next="";
                    r.prev="";
                    if (chapters.length-1>fo.idx) {
                        r.next=chapters[fo.idx+1].link;
                    }
                    if (fo.idx>0) {
                        r.prev=chapters[fo.idx-1].link;
                    }

                    resolve(r);
                }).catch(comm.error);


            }).catch(comm.error)

        } else {

        }

    })


}
module.exports= {
    siteListItem : siteListItem,
    documentList:documentList,
    documentContent:documentContent
};