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
                link:"/link-doc1"
            },{
                text:"document 2",
                link:"/link-doc2"
            }],
            next:"", // next link
            prev:""  // prev link
        });
    })
}
module.exports= {
    siteListItem : siteListItem
};