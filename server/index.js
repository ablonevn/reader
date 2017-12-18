
let express = require("express");
let request = require('request');
let cheerio = require('cheerio');
let zlib = require('zlib');
let fs = require("fs");
let app = require('express')();
let http = require('http').Server(app);
let path=require('path');
let clientListNames = [];
let prod = true;
app.use(express.static('dist'));
app.use(express.static('server'));
let root=path.resolve(__dirname+"/../data");
const comm=require('./common');
const sites=comm.sites;
const getHtml=comm.getHtml;
app.get('/doc-content/:siteid/:name/:url',(req,res)=>{
    // res.writeHead(200, {'Content-Type': 'application/json'});
    let fo=sites.filter(o=>o.id==req.params.siteid);
    if (fo.length) {
        let site = require("./" + fo[0].name);


        let url=req.params.url.split("-").map(o => String.fromCharCode(parseInt(o, 16))).join("");
        let name=req.params.name.split("-").map(o => String.fromCharCode(parseInt(o, 16))).join("");
        if (req.params.siteid==0) {

            site.documentContent(name,url).then((rs) => res.json(rs)).catch(comm.error);
            return;
        }

        getHtml(url).then((data) => {
            site.documentContent(data).then((rs) => res.json(rs)).catch(comm.error);

            // let $=cheerio.load(data);
            // let list=[];
            // $('.menu__cat-item a').map(function(i,o){
            //     list[i] = {
            //         text:$(o).text(),
            //         link:$(o).attr("href")
            //     };
            //     //return $(o).text();
            // });
            // console.log(list);
            // res.json(list);
        }).catch(comm.error)
    }
});


app.get('/doc-list/:siteid/:url',(req,res)=>{
    // res.writeHead(200, {'Content-Type': 'application/json'});
    let fo=sites.filter(o=>o.id==req.params.siteid);
    if (fo.length) {
        let site = require("./" + fo[0].name);


        let url=req.params.url.split("-").map(o => String.fromCharCode(parseInt(o, 16))).join("");
        if (req.params.siteid==0) {
            site.documentList(url).then(rs=>res.json(rs)).catch(comm.error);
            return;
        }

        getHtml(url).then((data) => {
            site.documentList(data).then((rs) => res.json(rs)).catch(comm.error);

            // let $=cheerio.load(data);
            // let list=[];
            // $('.menu__cat-item a').map(function(i,o){
            //     list[i] = {
            //         text:$(o).text(),
            //         link:$(o).attr("href")
            //     };
            //     //return $(o).text();
            // });
            // console.log(list);
            // res.json(list);
        }).catch(comm.error)
    }
});

app.get('/site-detail/:id',(req,res)=>{


    // res.writeHead(200, {'Content-Type': 'application/json'});
    let fo=sites.filter(o=>o.id==req.params.id);
    if (fo.length) {
        let site=require("./"+fo[0].name);
        if (req.params.id==0) {
            site.siteListItem().then(rs=>{
                res.send(rs);
            });
            return;
        }
        getHtml(fo[0].url).then((data)=>{
            site.siteListItem(data).then((rs)=>res.json(rs)).catch(comm.error);

            // let $=cheerio.load(data);
            // let list=[];
            // $('.menu__cat-item a').map(function(i,o){
            //     list[i] = {
            //         text:$(o).text(),
            //         link:$(o).attr("href")
            //     };
            //     //return $(o).text();
            // });
            // console.log(list);
            // res.json(list);
        })
    }
});

app.get('/sites',(req,res)=>{
    // res.writeHead(200, {'Content-Type': 'application/json'});

    res.send(sites);

});

app.get('/api/get/:url', function (req, res) {
    res.send('<h1>Hello</h1>');
});
app.get('*', function (req, res) {
    let data = fs.readFileSync(__dirname + '/../src/index.html');
    res.send(data + "");
});


// io.on('connection', function(socket){
// 	clientListNames.push(socket.handshake.query.userName);
// 	io.emit("updateSocketList", clientListNames);
// 	io.emit("addUserToSocketList",socket.handshake.query.userName);
//
// 	socket.on('disconnect', function(){
// 		let name=socket.handshake.query.userName;
// 		let userIndex = clientListNames.indexOf(socket.handshake.query.userName);
// 		 if (userIndex != -1) {
// 		 	clientListNames.splice(userIndex, 1);
// 			io.emit("updateSocketList", clientListNames);
// 			io.emit("removeUserFromSocketList",name);
// 		 }
//   	});
//
// 	socket.on('chatMessageToSocketServer', function(msg, func){
// 		func("Message recieved!",socket.handshake.query.userName);
// 		let name = socket.handshake.query.userName;
// 		let sockectObj = {name,msg}
// 		io.emit('broadcastToAll_chatMessage', sockectObj);
// 	});
// });

http.listen(8010, function () {
    console.log('listening on *:8010');
});