var cheerio=require("cheerio");
function siteListItem(html){
    return new Promise((resolve, reject) => {

        resolve({
            data:[{
                text:"document 1",
                link:""
            },{
                text:"document 2",
                link:""
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
                link:""
            },{
                text:"document main content 1",
                link:""
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