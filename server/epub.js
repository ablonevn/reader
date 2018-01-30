var fs=require('fs');
var dir=require("./story.json").dir;
var path=require("path");
var dataDir=path.resolve(__dirname+"/../data/"+dir);
var outExports=path.resolve(__dirname+"/../exports/"+dir);
var mkdirp=require('mkdirp');
var chapters=require(dataDir+"/chapters.json");
let request = require('request');
var Epub = require("epub-gen");


console.log("process "+dataDir);
mkdirp(outExports);
function to16(s){
    return s.split('').map(s=>s.charCodeAt(0).toString(16)).join("-");
}
var dir16=to16(dir);
var content=[];
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
function getChap(i) {
    if (i<chapters.length) {
        var c=chapters[i];

        console.log("process file "+i+" "+c.title);
        var url="http://localhost:8010/doc-content/0/"+dir16+"/"+to16(c.link);
        request(url,function (error, response, body) {
            if (error) {
                return console.error('Request failed:', error);
            }
            var fileName=pad(i,5)+".html";
            var next=pad(i+1,5)+".html";
            var obj=JSON.parse(body);
            var expHtmlObj={
                title:obj.title,
                data:"<p>"+obj.data.join("</p><p>")+"</p>"
            };
            var str="<html><body><h1><a href=\"/"+next+"\">"+expHtmlObj.title+"</a></h1>"+expHtmlObj.data;
            // str=str+"<script src='/jquery.js'></script>";
            // str=str+"<script>$(function(){$('body').append($('<div><a href=\\\"/\"+next+\"\\\">Tiếp</a></div>'))})</script>";
            str=str+"</body></html>";

            fs.writeFileSync(outExports+"/"+fileName,str);
            //console.log('Response :', obj.title);
            content.push(expHtmlObj);
            setTimeout(()=>getChap(i+1),0)
        })
    } else {
        var option = {
            title: dir, // *Required, title of the book.
            author: "tntdb", // *Required, name of the author.
            //publisher: "Macmillan & Co.", // optional
            //cover: "http://demo.com/url-to-cover-image.jpg", // Url or File path, both ok.
            content: content
        };
        //new Epub(option, dir+".epub");
    }




}
getChap(0);

//var x=rp("http://google.com").then;
//console.log(x);

return;




