var cheerio=require("cheerio");
function documentList(html){
    return new Promise((resolve, reject) => {
        var $ = cheerio.load(html);
        var list = [];
        $('.list-chapter a').map(function (i, o) {
            list.push({
                title: $(o).text(),
                link: $(o).attr("href")
            })

        });
        var foNext=$('.pagination .glyphicon-menu-right');

        var next = "";
        if (foNext.length) {
          next=$(foNext[0]).parent().attr("href");
        }
        var rs= {
            list: list,
            next: next
        };
        resolve(rs);
    });

}
module.exports= {
    siteListItem : function(){},
    documentList:documentList
};