var comm=require('./common');
//var mkdirp=require("mkdirp");
var config=require('./config');
// var path=require("path");
var root=comm.rootData;
var distDir=config.target;
var url=config.url;
var fs=require("fs");
var index=[];
var outDir=root+"/"+distDir;
comm.mkdirp(outDir);
var tr=require('./'+config.driver);
var list=[];
//comm.usingTor();

if (!fs.existsSync(outDir + '/config.json')) {
    fs.writeFileSync(outDir + '/config.json',JSON.stringify(config))
}


new Promise(fileListingDone=> {


    if (!fs.existsSync(outDir + '/chapters.json')) {


        new Promise((resolve, reject) => {
            function downloadListChapters(url) {
                console.log("Downloading ...", url)
                comm.getHtml(url,true).then(function (html) {
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
        }).catch(comm.error);

    } else {
        fileListingDone();
    }


}).then(()=>{
    var fileList=require(outDir + '/chapters.json');
    var data=outDir+"/data";
    comm.mkdirp(data);
    function doDownload(idx) {
        if (idx>fileList.length-1) return ;
        var item=fileList[idx];
        console.log("download content "+item.link);
        if (fs.existsSync(outDir+"/data/"+idx)) {
            setTimeout(()=>{
                doDownload(idx+1)

            },0)

        } else {

            tr.documentContent(distDir,item.link,true).then(()=>{
                setTimeout(()=>{
                    doDownload(idx+1)

                },1000)

            },()=>{
                setTimeout(()=>{
                    doDownload(idx)

                },1000)

            }).catch(comm.error);
        }

    }
    doDownload(0);

}).catch(comm.error);