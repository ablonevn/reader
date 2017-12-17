var comm=require('./common');
var mkdirp=require("mkdirp");
var config=require('./config');
var path=require("path");
var root=path.resolve( __dirname+'/../data');
var distDir=config.target;
var url=config.url;
var fs=require("fs");
var index=[];
var outDir=root+"/"+distDir;
mkdirp(outDir);
var tr=require('./'+config.driver);
var list=[];


new Promise((resolve,reject)=>{
    function downloadListChapters(url) {
        console.log("Downloading ...",url)
        comm.getHtml(url).then(function(html){
            tr.documentList(html).then(function(res){
                if (res.list.length) {
                    list=list.concat(res.list);
                }
                if (res.next) {
                    // resolve(list);

                    downloadListChapters(res.next);
                } else {
                    resolve(list);
                }
                // console.log(res);

            })

        })

    }
    downloadListChapters(url);

}).then(res=>{

    var json = JSON.stringify(res);
    fs.writeFileSync(outDir+'/chapters.json', json);
});




