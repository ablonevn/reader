var cheerio=require("cheerio");
function siteListItem(html){
    return new Promise((resolve, reject) => {
        var $=cheerio.load(html);
        var list=[];
        $('.menu__cat-item a').map(function(i,o){
            list[i] = {
                text:$(o).text(),
                link:$(o).attr("href")
            };
            //return $(o).text();
        });
        resolve({
            data:[{
                text:"document 1",
                link:"http://adayroi.com"
            },{
                text:"document 2",
                link:"http://adayroi.com"
            }],
            next:"", // next link
            prev:""  // prev link
        });
    })
}
function documentList(html) {
    return new Promise((resolve, reject) => {

        resolve({
            data:[{
                text:"document main content 1",
                link:"/link-content 1"
            },{
                text:"document main content 1",
                link:"/link-content doc2"
            }],
            next:"", // next link
            prev:""  // prev link
        });
    })
}
module.exports= {
    siteListItem : siteListItem,
    documentList:documentList
};