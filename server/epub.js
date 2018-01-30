var dir="read-some";
var path=require("path");
var dataDir=path.resolve(__dirname+"/../data/"+dir);
var chapters=require(dataDir+"/chapters.json");
let request = require('request');
var Epub = require("epub-gen");
console.log("process "+dataDir);
function to16(s){
    return s.split('').map(s=>s.charCodeAt(0).toString(16)).join("-");
}
var dir16=to16(dir);
var content=[];
function getChap(i) {
    if (i<chapters.length) {
        var c=chapters[i];

        console.log("process file "+i+" "+c.title);
        var url="http://localhost:8010/doc-content/0/"+dir16+"/"+to16(c.link);
        request(url,function (error, response, body) {
            if (error) {
                return console.error('Request failed:', error);
            }
            var obj=JSON.parse(body);
            //console.log('Response :', obj.title);
            content.push({
               title:obj.title,
               data:"<p>"+obj.data.join("</p><p>")+"</p>"
            });
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
        new Epub(option, dir+".epub");
    }




}
getChap(0);

//var x=rp("http://google.com").then;
//console.log(x);

return;




