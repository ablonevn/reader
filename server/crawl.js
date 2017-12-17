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
comm.usingTor();
// process.on('unhandledRejection', error => {
//     // Won't execute
//     console.log('unhandledRejection', error.test);
// });

new Promise(fileListingDone=> {


    if (!fs.existsSync(outDir + '/chapters.json')) {


        new Promise((resolve, reject) => {
            function downloadListChapters(url) {
                console.log("Downloading ...", url)
                comm.getHtml(url).then(function (html) {
                    tr.documentList(html).then(function (res) {
                        if (res.list.length) {
                            list = list.concat(res.list);
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

        }).then(res => {

            var json = JSON.stringify(res);
            fs.writeFileSync(outDir + '/chapters.json', json);
            fileListingDone();
        });

    } else {
        fileListingDone();
    }


}).then(()=>{
    var fileList=require(outDir + '/chapters.json');
    var data=outDir+"/data";
    mkdirp(data);
    function doDownload(idx) {
        if (idx>fileList.length-1) return ;
        var item=fileList[idx];
        console.log("download content "+item.link);
        tr.documentContent(distDir,item.link).then(()=>doDownload(idx+1));
    }
    doDownload(0);

});