"use strict";
let express = require("express");
var request = require('request');
var cheerio = require('cheerio');
var zlib = require('zlib');
//var streams = require('memory-streams');
//var gzip = zlib.createGzip();
let fs = require("fs");
// var path = require('path');
let app = require('express')();
let http = require('http').Server(app);
let path=require('path');
// let io = require('socket.io')(http);
let clientListNames = [];
let prod = true;
app.use(express.static('dist'));
app.use(express.static('server'));
//app.use('/dist', express.static(path.join(__dirname, 'dist')));
// app.use(express.static(__dirname + '/dist'));
// let proxyFiles = ['/polyfills.bundle.js','/vendor.bundle.js', '/main.bundle.js', '/styles.css'];
// if (!prod) {
//
//     proxyFiles.forEach((url) => {
//
//         app.get(url, (req, res) => {
//                 try {
//                     var nurl = 'http://localhost:3000' + req.url;
//                     let writer = new streams.WritableStream();
//                     var ops = request({
//                         url: nurl,
//                         method: req.query.method
//                     })
//                         .on('response', function (response) {
//                             console.log(response.statusCode); // 200
//                             // console.log(response.body) // 'image/png'
//                         }).pipe(res);//.pipe(writer);
//                 } catch (ex) {
//
//                 }
//
//                 // ops.on('close', function() {
//                 //
//                 //     // Output the content as a string
//                 //     console.log(writer.toString());
//                 //
//                 //     // Output the content as a Buffer
//                 //     console.log(writer.toBuffer());
//                 // });
//                 // if (url.indexOf(".js")>=0) {
//                 //     res.writeHead(200, {'Content-Type': 'application/javascript', 'Content-Encoding': 'gzip'});
//                 //     ops.pipe(gzip).pipe(res);
//                 // } else {
//                 //     ops.pipe(res);
//                 // }
//
//             }
//         );
//
//         // app.get(url, requestProxy({
//         //
//         //     // cacheMaxAge: 60,
//         //     url: "http://localhost:3000"+url,
//         //     // query: {
//         //     //     secret_key: process.env.SOMEAPI_SECRET_KEY
//         //     // },
//         //     // headers: {
//         //     //     'X-Custom-Header': process.env.SOMEAPI_CUSTOM_HEADER
//         //     // }
//         // }));
//     });
//
// } else {
//     proxyFiles.forEach((url) => {
//
//         app.get(url, (req, res) => {
//                 try {
//                     // if (url.indexOf(".css")>0) {
//                     //     res.writeHead(200, {'Content-Type': 'text/css'});
//                     // }
//
//                     let data = fs.readFileSync(__dirname + '/../dist/'+url);
//                     res.send(data + "");
//                     res.end();
//                 } catch (ex) {
//                     console.log(ex);
//                 }
//
//
//             }
//         );
//
//
//     });
//
// }
//app.use(express.static(__dirname, '/server/'));
//app.use(express.static(__dirname + "/..", '/client/'));
//app.use(express.static(__dirname + '/node_modules'));
const comm=require('./common');
const sites=comm.sites;
const getHtml=comm.getHtml;

app.get('/doc-list/:siteid/:url',(req,res)=>{
    // res.writeHead(200, {'Content-Type': 'application/json'});
    var fo=sites.filter(o=>o.id==req.params.siteid);
    if (fo.length) {
        var site = require("./" + fo[0].name);

        var url=req.params.url.split("-").map(o => String.fromCharCode(parseInt(o, 16))).join("");

        getHtml(url).then((data) => {
            site.documentList(data).then((rs) => res.json(rs));

            // var $=cheerio.load(data);
            // var list=[];
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

app.get('/site-detail/:id',(req,res)=>{
    // res.writeHead(200, {'Content-Type': 'application/json'});
    var fo=sites.filter(o=>o.id==req.params.id);
    if (fo.length) {
        var site=require("./"+fo[0].name);
        getHtml(fo[0].url).then((data)=>{
            site.siteListItem(data).then((rs)=>res.json(rs));

            // var $=cheerio.load(data);
            // var list=[];
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