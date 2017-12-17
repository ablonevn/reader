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
                ls.push({id: k--, text: items[i],link:items[i]});
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
            data:require(root+"/"+dir+"/chapters.json").slice(page,10),
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
        require(root+"/"+name+"/chapters.json").filter((v,idx)=>{
            if (v.link==url) {
                fo=v;
                fo.idx=idx;
                return true;
            }
            return false;
        });
        // luon luon tim thay
        if (fo) {
            new Promise(setHtmlData=>{
                if (fs.existsSync(dataDir+"/"+fo.idx)) {
                    setHtmlData(fs.readFileSync(dataDir+"/"+fo.idx)+"");
                } else {
                    comm.getHtml(url).then(html=>{
                        fs.writeFileSync(dataDir+"/"+fo.idx,html);
                        setHtmlData(html)

                    })

                }

            }).then(html=>{
                var lst=[];
                var $=cheerio.load(html);
                lst=$('.chapter-c').html().split("<br>").filter(r=>r!="");
                lst=lst.map(o=> cheerio.load(decode(o)).text());
                resolve({
                    data:lst
                })

            })

        } else {

        }

    })


}
module.exports= {
    siteListItem : siteListItem,
    documentList:documentList,
    documentContent:documentContent
};