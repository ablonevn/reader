var cheerio=require("cheerio");
var mkdirp=require('mkdirp');
var path=require('path');
var root=path.resolve( __dirname+'/../data');
var fs=require('fs');
var comm=require('./common');
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();
var decode = entities.decode;
function documentList(html){
    return new Promise((resolve, reject) => {
        var $ = cheerio.load(html);
        var list = [];
        $('.list-chapter a').map(function (i, o) {
            list.push({
                title: $(o).text(),
                link: $(o).attr("href")
            })

        });
        var foNext=$('.pagination .glyphicon-menu-right');

        var next = "";
        if (foNext.length) {
          next=$(foNext[0]).parent().attr("href");
        }
        var rs= {
            list: list,
            next: next
        };
        resolve(rs);
    });

}
function documentContent(name,url){
    return new Promise(resolve=>{
        var fo,dataDir;
        if (name!='') {


            dataDir = root + "/" + name + "/data";
            mkdirp(dataDir);

            require(root + "/" + name + "/chapters.json").filter((v, idx) => {
                if (v.link == url) {
                    fo = v;
                    fo.idx = idx;
                    return true;
                }
                return false;
            });
        }
        // luon luon tim thay
        if (fo) {
            new Promise(setHtmlData=>{
                if ((name!='') && fs.existsSync(dataDir+"/"+fo.idx)) {
                    setHtmlData(fs.readFileSync(dataDir+"/"+fo.idx)+"");
                } else {
                    comm.getHtml(url).then(html=>{
                        if (name!='') {


                            fs.writeFileSync(dataDir + "/" + fo.idx, html);
                        }
                        setHtmlData(html)

                    })

                }

            }).then(html=>{
                var lst=[];
                var $=cheerio.load(html);
                lst=$('.chapter-c').html().split("<br>").filter(r=>r!="");
                lst=lst.map(o=> cheerio.load(decode(o)).text());
                resolve({
                    title:fo.title,
                    data:lst
                })

            })

        } else {

        }

    })


}
module.exports= {
    siteListItem : function(){},
    documentList:documentList,
    documentContent:documentContent
};