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
comm.usingTor();
// process.on('unhandledRejection', error => {
//     // Won't execute
//     console.log('unhandledRejection', error.test);
// });
comm.getHtml("http://google.com",true)
    .then(r=>console.log(r))
    .catch(comm.error);
