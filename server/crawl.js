

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
        tr.documentContent(distDir,item.link,true).then(()=>doDownload(idx+1)).catch(comm.error);
    }
    doDownload(0);

}).catch(comm.error);