var comm = require('./common');
var cheerio = require("cheerio");



function documentList(html) {
    return new Promise((resolve, reject) => {
        var $ = cheerio.load(html);
        var list = [];
        $('.list-chapter a').map(function (i, o) {
            list.push({
                title: $(o).text(),
                link: $(o).attr("href")
            })

        });
        var foNext = $('.pagination .glyphicon-menu-right');

        var next = "";
        if (foNext.length) {
            next = $(foNext[0]).parent().attr("href");
        }
        var rs = {
            list: list,
            next: next
        };
        resolve(rs);
    });

}

// function documentContent(name, url,usingTor) {
//     name = (name || "").trim();
//     url = (url || "").trim();
//     var canSave=name !== '';
//     return new Promise(resolve => {
//         var fo, dataDir;
//         if (name !== '') {
//
//
//             dataDir = root + "/" + name + "/data";
//             comm.mkdirp(dataDir);
//
//             require(root + "/" + name + "/chapters.json").filter((v, idx) => {
//                 if (v.link === url) {
//                     fo = v;
//                     fo.idx = idx;
//                     return true;
//                 }
//                 return false;
//             });
//         }
//         new Promise((setHtmlData,dlfailed) => {
//             // luon luon tim thay
//             if (fo) {
//
//                 if (canSave && fs.existsSync(dataDir + "/" + fo.idx)) {
//                     setHtmlData(fs.readFileSync(dataDir + "/" + fo.idx) + "");
//                 } else {
//                     comm.getHtml(url,usingTor).then(html => {
//                         if (html) {
//                             if (canSave) {
//                                 fs.writeFileSync(dataDir + "/" + fo.idx, html);
//                             }
//                             setHtmlData(html)
//                         } else {
//                             dlfailed("failure download")
//                         }
//
//                     })
//
//                 }
//
//
//             } else {
//                 comm.getHtml(url,usingTor).then(html => {
//                     if (html) {
//                         setHtmlData(html)
//                     }
//
//                 })
//             }
//         }).then(html => {
//             if (html) {
//                 var lst = [];
//                 var $ = cheerio.load(html);
//                 lst = $('.chapter-c').html().split("<br>").filter(r => (r||"").trim() !== "");
//                 lst = lst.map(o => cheerio.load(comm.decode(o)).text());
//                 resolve({
//                     title: fo.title,
//                     data: lst
//                 })
//             }
//
//
//         }).catch(comm.error)
//
//     })
//
//
// }
var documentContent = comm.buildContent((fo, html, resolve) => {
    fo=fo||{};
    var lst = [];
    var $ = cheerio.load(html);
    lst = ($('.chapter-c').html() || "")
        .split("<br>")
        .filter(r => (r || "").trim() !== "");
    lst = lst.map(o => cheerio.load(comm.decode(o)).text());
    resolve({
        title: fo.title || "",
        data: lst
    })
});

module.exports = {
    siteListItem: function () {
    },
    documentList: documentList,
    documentContent: documentContent
};