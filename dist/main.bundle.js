webpackJsonp([1],{

/***/ 1542:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_redux_1 = __webpack_require__(49);
var actions_1 = __webpack_require__(97);
var material_ui_1 = __webpack_require__(115);
var paging_1 = __webpack_require__(1543);
// import {Subject} from "rxjs";
// let loaded=[];
var SiteCategory = /** @class */ (function (_super) {
    __extends(SiteCategory, _super);
    function SiteCategory(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            height: 0,
            startPos: 0,
            limit: 1,
            items: [],
            fetchItem: false,
            lastDetail: -1,
            rows: [],
            docList: [],
            postList: []
        };
        return _this;
    }
    SiteCategory.prototype.updateTitle = function (lst) {
        var _this = this;
        var fo = lst.filter(function (site) { return _this.props.match.params.siteId == site.id; })[0];
        var n = this.props.match.params.name.split("-").map(function (o) { return String.fromCharCode(parseInt(o, 16)); }).join("");
        this.site = fo;
        this.props.setTitle(fo.name + " - " + n);
    };
    SiteCategory.prototype.getDocumentList = function () {
        var _this = this;
        return actions_1.cachedFetch('/doc-list/' + this.site.id + "/" + this.props.match.params.url).then(function (res) {
            return _this.documentList = res.data;
            // state.items = res.data.slice(state.startPos, 1);
            // state=Object.assign({},state,{fetchItem:true,limit:1});
            // this.setState(state);
            //
            // console.log('items:', state.items);
        });
    };
    SiteCategory.prototype.componentDidMount = function () {
        var _this = this;
        this.props.setAppIcon({
            icon: "keyboard_arrow_left",
            click: this.props.history.goBack
        });
        this.height = $(this.el).parent().height() - 56;
        // debugger;
        // if (this.props.listSites.length == 0) {
        actions_1.cachedFetch('/sites').then(function (res) {
            // debugger;
            //this.props.setSiteList(res);
            _this.updateTitle(res);
            _this.getDocumentList().then(function (res) {
                _this.setState(Object.assign({}, _this.state, {
                    height: _this.height,
                    docList: res
                }));
            });
        });
        // } else {
        //     // debugger;
        //     this.updateTitle(this.props.listSites);
        //     this.getDocumentList();
        // }
        // state.me=this;
    };
    SiteCategory.prototype.renderItem = function (item, idx) {
        // this.limit=limit;
        var _this = this;
        return React.createElement(material_ui_1.ListItem, { key: idx, 
            // leftAvatar={<Avatar icon={<FileFolder/>}/>}
            // rightIcon={<ActionInfo/>}
            primaryText: item.title, onClick: function () {
                // context.history.push === history.push
                _this.props.history.push('/content-detail/' + _this.props.match.params.siteId + '/' + _this.props.match.params.name + "/" + actions_1.encodeHex(item.link));
            }, secondaryText: item.link || " " });
    };
    SiteCategory.prototype.setLimit = function (limit) {
        this.limit = limit;
        // console.log(this,limit);
    };
    SiteCategory.prototype.doNext = function () {
        // console.log("limit item",state.limit);
        if (this.state.startPos + this.limit < this.state.docList.length) {
            var n = {
                startPos: this.state.startPos,
                postList: this.state.postList
            };
            n.postList.push(n.startPos);
            n.startPos = n.startPos + this.limit;
            this.setState(Object.assign({}, this.state, n));
        }
    };
    SiteCategory.prototype.doPrev = function () {
        if (this.state.startPos > 0) {
            var p = this.state.postList.pop() || 0;
            var n = {
                startPos: p,
                postList: this.state.postList
            };
            this.setState(Object.assign({}, this.state, n));
        }
    };
    SiteCategory.prototype.render = function () {
        var _this = this;
        console.log("render");
        var first = React.createElement("span", null);
        var last = React.createElement("span", null);
        if (this.state.startPos > 0) {
            first = (React.createElement(material_ui_1.ToolbarGroup, { firstChild: true },
                React.createElement(material_ui_1.RaisedButton, { label: "Prev", onClick: function () { return _this.doPrev(); }, primary: true })));
        }
        // if (this.state.startPos+this.state.limit>0) {
        //
        // }
        return (React.createElement("div", { style: { 'display': 'flex', 'flexDirection': 'column' }, ref: function (el) { return _this.el = el; } },
            React.createElement("div", { style: { height: this.state.height } },
                React.createElement(paging_1.default, { startPos: this.state.startPos, height: this.state.height, rows: this.state.docList, renderItem: function (it, idx) { return _this.renderItem(it, idx); }, callback: function (limit) { return _this.setLimit(limit); } })),
            React.createElement(material_ui_1.Toolbar, null,
                first,
                React.createElement(material_ui_1.ToolbarGroup, { lastChild: true },
                    React.createElement(material_ui_1.RaisedButton, { label: "Next", onClick: function () { return _this.doNext(); }, primary: true })))));
    };
    return SiteCategory;
}(React.Component));
var mapStateToProps = function (state, ownProps) {
    return {
        listSites: state.sites.list,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        setSiteList: function (lst) { return dispatch(actions_1.setSiteList(lst)); },
        setDocList: function (lst) { return dispatch(actions_1.setDocumentList(lst)); },
        // setSiteDetailList:(list)=>dispatch(setSiteDetailList(list)),
        setTitle: function (data) { return dispatch(actions_1.setAppTitle("" + data || "")); },
        setAppIcon: function (icon) { return dispatch(actions_1.setAppIcon(icon)); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SiteCategory);


/***/ }),

/***/ 1543:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_redux_1 = __webpack_require__(49);
var react_height_1 = __webpack_require__(1544);
// let loaded=[];
var Paging = /** @class */ (function (_super) {
    __extends(Paging, _super);
    function Paging(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            height: 0,
            startPos: 0,
            limit: 1,
            items: [],
            fetchItem: false,
            lastDetail: -1,
            rows: []
        };
        return _this;
    }
    Paging.prototype.renderItem = function (lst) {
        // var rows=this.rows.slice(this.startPos, this.startPos + this.limit);
        var _this = this;
        return lst.map(function (item, idx) { return _this.props.renderItem(item, idx); });
    };
    Paging.prototype.addMoreRow = function (height) {
        // console.log("more",this.fetchItem);
        if (this.props.limit) {
            return;
        }
        if (height > this.props.height) {
            // console.log("last ",state.limit);
            this.fetchItem = false;
            this.limit = this.limit - 1;
            var r = this.rows.slice(this.startPos, this.startPos + this.limit - 1);
            this.setState(Object.assign({}, this.state, {
                items: r
            }));
        }
        else {
            // console.log("axddrow",state.limit,state.fetchItem);
            if (this.fetchItem) {
                this.limit = this.limit + 1;
                var items = this.rows.slice(this.startPos, this.startPos + this.limit);
                var fetchItem = items.length > this.items.length;
                //this.items = items;
                if (!fetchItem) {
                    this.limit = this.limit - 1;
                }
                // var r=this.renderItem(items);
                var st = Object.assign({}, this.state, {
                    items: items
                });
                this.setState(Object.assign({}, this.state, st));
            }
        }
    };
    Paging.prototype.componentWillReceiveProps = function (nextProps) {
        this.rows = [].concat(nextProps.rows);
        this.startPos = nextProps.startPos;
        this.limit = nextProps.limit || 1;
        // console.log(state.limit);
        this.items = this.rows.slice(this.startPos, this.startPos + this.limit);
        // if (state.startPos>0) {
        //     debugger;
        // }
        // console.log("items",state.rows);
        // debugger;
        if (this.items.length == 0) {
            this.fetchItem = false;
        }
        else {
            this.fetchItem = true;
        }
        this.setState(Object.assign({}, this.state, { items: this.renderItem(this.items) }));
        // console.log("props change ",this.state);
    };
    Paging.prototype.componentDidMount = function () {
        // console.log("rows ",state.rows);
    };
    Paging.prototype.render = function () {
        var _this = this;
        if (!this.fetchItem && this.limit) {
            this.props.callback(this.limit - 1);
        }
        // let me=this;
        // var rows=this.rows.slice(this.startPos, this.startPos + this.limit);
        // var items=rows.map((item, idx) => this.props.renderItem(item, idx, this.limit));
        // console.log("items:",this.state.items);
        return (React.createElement(react_height_1.ReactHeight, { onHeightReady: function (height) { return _this.addMoreRow.call(_this, height); } }, this.state.items.map(function (item, idx) { return _this.props.renderItem(item, idx); })));
    };
    return Paging;
}(React.Component));
var mapStateToProps = function (state, ownProps) {
    return {};
};
var mapDispatchToProps = function (dispatch) {
    return {};
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Paging);


/***/ }),

/***/ 1546:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_redux_1 = __webpack_require__(49);
var actions_1 = __webpack_require__(97);
// let state = {
//     height: 0,
//     startPos: 0,
//     limit: 1,
//     items: [],
//     fetchItem: false,
//     lastDetail: -1
// };
var canvas = document.createElement("canvas");
var ContentDetail = /** @class */ (function (_super) {
    __extends(ContentDetail, _super);
    function ContentDetail(props) {
        var _this = _super.call(this, props) || this;
        _this.resetState();
        _this.height = 0;
        _this.lastRows = "";
        _this.canUpdate = false;
        _this.state = {
            mapItems: []
        };
        return _this;
    }
    ContentDetail.prototype.resetState = function () {
        this.startPos = 0;
        // this.items = [];
        this.fetchItem = false;
        this.mapItems = [];
    };
    ContentDetail.prototype.updateTitle = function (lst) {
        var _this = this;
        lst = lst || this.lstSites;
        var fo = lst.filter(function (site) { return _this.props.match.params.siteId == site.id; })[0];
        var n = this.props.match.params.name.split("-").map(function (o) { return String.fromCharCode(parseInt(o, 16)); }).join("");
        this.site = fo;
        this.props.setTitle(this.title);
    };
    ContentDetail.prototype.getTextWidth = function (text, font) {
        // re-use canvas object for better performance
        var context = canvas.getContext("2d");
        context.font = font || "normal 16px 'Segoe UI'";
        var metrics = context.measureText(text);
        return metrics.width;
    };
    ContentDetail.prototype.getTextHeight = function (text, font) {
        // re-use canvas object for better performance
        var context = canvas.getContext("2d");
        context.font = font || "normal 16px 'Segoe UI'";
        var metrics = context.measureText(text);
        return 24;
    };
    ContentDetail.prototype.getFitLine = function (arr) {
        var _this = this;
        var lst = [];
        var lstr = [];
        var w = $(window).width() - 20 - 10;
        arr.filter(function (r) { return (r || "") !== ""; })
            .map(function (r) {
            lstr.push(r);
            var text = lstr.join(" ");
            if (_this.getTextWidth(text, null) >= w) {
                // debugger;
                lstr.pop();
                // sample.text(lstr.join(" "));
                // debugger;
                lst.push(lstr.join(" "));
                lstr = [r];
            }
        });
        if (lstr.length) {
            lst.push(lstr.join(" "));
        }
        return lst;
    };
    ContentDetail.prototype.buildRow = function (list) {
        var _this = this;
        var newRows = list.map(function (row) {
            var lst = [];
            var strs = (row || "").replace(/[\r\n\t]/gi, "").split(' ');
            if (strs.length) {
                // debugger;
                lst = _this.getFitLine(strs);
            }
            return lst;
        });
        // debugger;
        this.mapItems = [].concat.apply([], newRows).filter(function (m) { return (m || "") !== ""; });
    };
    ContentDetail.prototype.componentWillReceiveProps = function (newProps) {
        var _this = this;
        this.mprops = newProps;
        this.canUpdate = false;
        if (newProps.location && (this.oldLocaltion != newProps.location.pathname)) {
            this.oldLocaltion = newProps.location.pathname;
            this.resetState();
            debugger;
            this.getContentList().then(function (lst) {
                // console.log("get content in rec props");
                _this.buildRow(lst);
                if (_this.isPrev) {
                    _this.isPrev = false;
                    var pages = parseInt(((_this.mapItems.length + _this.limit - 1) / _this.limit) + "");
                    _this.startPos = (pages - 1) * _this.limit;
                }
                _this.doRender();
            });
            // changed = true;
            // this.setState(Object.assign({}, state));
        }
    };
    ContentDetail.prototype.getContent = function () {
        var _this = this;
        console.log("get content called");
        this.mprops = this.mprops || this.props;
        var url = '/doc-content/' + this.site.id + "/" + this.mprops.match.params.name + "/" + this.mprops.match.params.url;
        var hd = new Headers();
        hd.set('Accept', 'application/json');
        hd.set('Content-Type', 'application/json');
        fetch('/save', {
            method: 'post',
            headers: hd,
            body: JSON.stringify({
                id: this.site.id,
                url: '/content-detail/' + this.site.id + "/" + this.mprops.match.params.name + "/" + this.mprops.match.params.url,
                name: actions_1.decodeHex(this.mprops.match.params.name)
            })
        });
        return actions_1.cachedFetch(url).then(function (res) {
            // debugger;
            _this.next = res.next;
            _this.prev = res.prev;
            _this.title = res.title;
            if (res.next)
                actions_1.cachedFetch('/doc-content/' + _this.site.id + "/" + _this.mprops.match.params.name + "/" + actions_1.encodeHex(res.next)); // cache next page
            if (res.prev)
                actions_1.cachedFetch('/doc-content/' + _this.site.id + "/" + _this.mprops.match.params.name + "/" + actions_1.encodeHex(res.prev)); // cache prev page
            _this.updateTitle();
            console.log(res.data);
            return res;
        });
    };
    ContentDetail.prototype.getContentList = function () {
        this.canUpdate = false;
        //if (this.isFirst) {
        this.next = null;
        this.prev = null;
        return this.getContent().then(function (res) {
            return res.data;
        });
        // this.isFirst = false;
        //}
    };
    ContentDetail.prototype.doNext = function () {
        this.canUpdate = true;
        if (this.startPos + this.limit < this.mapItems.length) {
            this.startPos = this.startPos + this.limit;
            this.setState(Object.assign({}, this.state));
        }
        else {
            if (this.next) {
                this.props.history.replace('/content-detail/' + this.site.id + "/" + this.mprops.match.params.name + "/" + actions_1.encodeHex(this.next));
            }
        }
    };
    ContentDetail.prototype.doPrev = function () {
        this.canUpdate = true;
        if (this.startPos - this.limit >= 0) {
            this.startPos = this.startPos - this.limit;
            this.setState(Object.assign({}, this.state));
        }
        else {
            if (this.prev) {
                this.isPrev = true;
                this.props.history.replace('/content-detail/' + this.site.id + "/" + this.mprops.match.params.name + "/" + actions_1.encodeHex(this.prev));
            }
        }
    };
    ContentDetail.prototype.doRender = function () {
        if (!this.mapItems)
            return;
        if (this.mapItems.length == 0)
            return;
        var js = JSON.stringify(this.mapItems);
        if (js !== this.lastRows) {
            this.lastRows = js;
            console.log(this.lastRows == js, "rrrrrrrr");
            this.setState(Object.assign({}, this.state, {
                mapItems: this.mapItems
            }));
        }
    };
    ContentDetail.prototype.componentDidMount = function () {
        var _this = this;
        this.props.setAppIcon({
            icon: "keyboard_arrow_left",
            click: this.props.history.goBack
        });
        // debugger;
        this.oldLocaltion = this.props.history.location.pathname;
        this.title = "";
        var padding = 20;
        this.height = $(this.el).parent().height() - padding;
        this.limit = parseInt((this.height / this.getTextHeight('hg')) + "");
        // return;
        // new Promise(resolve=>{
        actions_1.cachedFetch('/sites').then(function (res) {
            // debugger;
            _this.lstSites = res;
            _this.updateTitle(res);
            _this.getContentList()
                .then(function (lst) {
                //             // console.log("get content in did mount");
                _this.buildRow(lst);
                _this.doRender();
            });
        });
        // console.log("xxxxxxxxxxxxx");
        // console.log(state.height);
        // }).then(()=>{
        //     this.doRender()
        // });
        // return 0;
    };
    ContentDetail.prototype.onClick = function (event) {
        event.persist();
        if (event.clientX > $(window).width() / 2) {
            this.doNext();
        }
        else {
            this.doPrev();
        }
    };
    ContentDetail.prototype.render = function () {
        var _this = this;
        console.log("render called");
        var paging = React.createElement("div", null);
        if (this.state.mapItems && this.state.mapItems.length) {
            // console.log("render changed",state.mapItems,state.startPos , state.limit);
            var items = this.state.mapItems.slice(this.startPos, this.startPos + this.limit);
            paging =
                React.createElement("div", { style: { padding: '10px 0px 10px 10px', height: this.height }, onClick: function (evt) { return _this.onClick(evt); } }, items.map(function (item, idx) { return React.createElement("div", { key: _this.startPos + idx }, item); }));
        }
        else {
            // console.log("render blank");
            // return (<div ref={el => this.el = el}></div>)
            //<Paging startPos={state.startPos} height={state.height} rows={state.mapItems}
            //renderItem={this.renderItem} limit={state.limit}/>
        }
        return (React.createElement("div", { ref: function (el) { return _this.el = el; } }, paging));
    };
    return ContentDetail;
}(React.Component));
var mapStateToProps = function (state, ownProps) {
    return {};
};
var mapDispatchToProps = function (dispatch) {
    return {
        setSiteList: function (lst) { return dispatch(actions_1.setSiteList(lst)); },
        setDocList: function (lst) { return dispatch(actions_1.setDocumentList(lst)); },
        // setSiteDetailList:(list)=>dispatch(setSiteDetailList(list)),
        setTitle: function (data) { return dispatch(actions_1.setAppTitle("" + data || "")); },
        setAppIcon: function (icon) { return dispatch(actions_1.setAppIcon(icon)); },
        setContentList: function (lst) { return dispatch(actions_1.setContentList(lst)); }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ContentDetail);


/***/ }),

/***/ 1547:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_redux_1 = __webpack_require__(49);
var material_ui_1 = __webpack_require__(115);
// const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
// const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
// @autoState()
var AppHeader = /** @class */ (function (_super) {
    __extends(AppHeader, _super);
    function AppHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppHeader.prototype.componentDidMount = function () {
        // console.log("aare render")
        // let me=this;
        // if (!this.props.siteLoaded) {
        //this.props.siteLoaded=true;
        // debugger;
        // let params=this.props;
        // if (params) {
        //     // debugger;
        //     fetch('/site-detail/'+params.id).then((response)=>response.json()).then((res)=>this.props.setSiteDetailList(res));
        // }
        // appState.title.subscribe(v=>{
        //     me.state.title=v;
        //     this.setState(me.state);
        // });
        // }
        // console.log("Event");
        // this.props.getTitle();
    };
    AppHeader.prototype.render = function () {
        // let me=this;
        // console.log('app title:',me.props.list)
        return (React.createElement(material_ui_1.AppBar, { title: this.props.title, iconElementLeft: React.createElement(material_ui_1.IconButton, { onClick: this.props.menuClick },
                React.createElement(material_ui_1.FontIcon, { className: 'material-icons' }, this.props.icon)), iconElementRight: React.createElement(material_ui_1.IconButton, null,
                React.createElement(material_ui_1.FontIcon, { className: 'material-icons' }, "settings")) }));
    };
    return AppHeader;
}(React.Component));
//
var mapStateToProps = function (state, ownProps) {
    return {
        // siteLoaded:state.sites.loaded,
        menuClick: state.app.click,
        title: state.app.title,
        icon: state.app.icon,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {};
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AppHeader);


/***/ }),

/***/ 1548:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var material_ui_1 = __webpack_require__(115);
var svg_icons_1 = __webpack_require__(300);
var react_redux_1 = __webpack_require__(49);
var actions_1 = __webpack_require__(97);
var mapStateToProps = function (state, ownProps) {
    return {};
};
var mapDispatchToProps = function (dispatch) {
    return {
        // same effect
        setTitle: function () { return dispatch(actions_1.setAppTitle("Home")); },
        setSiteList: function (lst) { return dispatch(actions_1.setSiteList(lst)); },
        setAppIcon: function (icon) { return dispatch(actions_1.setAppIcon(icon)); },
    };
};
//@autoState(mapStateToProps, mapDispatchToProps)
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = [];
        return _this;
    }
    // constructor(props, context?) {
    //     super(props, context);
    //     // debugger;
    //     // this.state = {
    //     //     list: []
    //     // }
    //
    //
    // }
    Home.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.props.setTitle();
                        this.props.setAppIcon({
                            icon: "home", click: function () { }
                        });
                        return [4 /*yield*/, fetch('/sites').then(function (res) { return res.json(); }).then(function (res) {
                                _this.list = res;
                            })];
                    case 1:
                        _a.sent();
                        this.setState(Object.assign({}, this.state));
                        return [2 /*return*/];
                }
            });
        });
    };
    Home.prototype.render = function () {
        var _this = this;
        // console.log("xxxxxx");
        if (this.list.length == 0)
            return null;
        return (React.createElement("div", null,
            React.createElement(material_ui_1.List, null,
                React.createElement(material_ui_1.Subheader, { inset: true }, "List sites"),
                this.list.map(function (o) {
                    {
                        if (o.reading) {
                            return React.createElement(material_ui_1.ListItem, { key: o.id, leftAvatar: React.createElement(material_ui_1.Avatar, { icon: React.createElement(svg_icons_1.FileFolder, null) }), rightIcon: React.createElement(svg_icons_1.ActionInfo, null), primaryText: o.name, onClick: function () {
                                    // context.history.push === history.push
                                    _this.props.history.push(o.url);
                                }, secondaryText: o.url });
                        }
                        else {
                            return React.createElement(material_ui_1.ListItem, { key: o.id, leftAvatar: React.createElement(material_ui_1.Avatar, { icon: React.createElement(svg_icons_1.FileFolder, null) }), rightIcon: React.createElement(svg_icons_1.ActionInfo, null), primaryText: o.name, onClick: function () {
                                    // context.history.push === history.push
                                    _this.props.history.push('/site/' + o.id);
                                }, secondaryText: o.url });
                        }
                    }
                }))));
    };
    return Home;
}(React.Component));
exports.Home = Home;
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Home);
//export exp as Home; 


/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(21);
var MuiThemeProvider_1 = __webpack_require__(207);
var react_redux_1 = __webpack_require__(49);
var getMuiTheme_1 = __webpack_require__(219);
var redux_1 = __webpack_require__(155);
var reducers_1 = __webpack_require__(447);
var colors_1 = __webpack_require__(96);
__webpack_require__(461);
var app_1 = __webpack_require__(462);
var muiTheme = {
    palette: {
        primary1Color: colors_1.indigo500,
        primary2Color: colors_1.indigo500,
        primary3Color: colors_1.white,
        textColor: colors_1.white,
        secondaryTextColor: colors_1.white,
        alternateTextColor: colors_1.white,
    },
};
var store = redux_1.createStore(reducers_1.default);
ReactDOM.render(React.createElement(MuiThemeProvider_1.default, { muiTheme: getMuiTheme_1.default(muiTheme) },
    React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(app_1.default, null))), document.getElementById('app'));


/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(155);
var actions_1 = __webpack_require__(97);
var initState = {
    title: "",
    icon: "home",
    click: function () {
        console.log("default on click");
    },
};
function app(state, action) {
    if (state === void 0) { state = initState; }
    var res = action.type.split('|').map(function (type) {
        switch (type) {
            case actions_1.SET_APP_TITLE:
                return Object.assign({}, state, {
                    title: action.text
                });
            case actions_1.SET_APP_ICON:
                var r = action.info;
                var p = {};
                if (r.icon)
                    p.icon = r.icon;
                if (r.click)
                    p.click = r.click;
                return Object.assign({}, state, p);
            default:
                return state;
        }
    });
    return Object.assign.apply({}, res);
}
function sites(state, action) {
    if (state === void 0) { state = {
        loading: false,
        list: []
    }; }
    switch (action.type) {
        case actions_1.SET_SITE_LIST:
            return Object.assign({}, state, {
                list: action.list
            });
        default:
            return state;
    }
}
function siteDetail(state, action) {
    if (state === void 0) { state = {
        list: []
    }; }
    switch (action.type) {
        case actions_1.SET_DETAIL_LIST:
            return Object.assign({}, state, {
                list: action.list
            });
        default:
            return state;
    }
}
function doc(state, action) {
    if (state === void 0) { state = {
        list: []
    }; }
    switch (action.type) {
        case actions_1.SET_DOCUMENT_LIST:
            return Object.assign({}, state, {
                list: action.list
            });
        default:
            return state;
    }
}
function content(state, action) {
    if (state === void 0) { state = {
        list: []
    }; }
    switch (action.type) {
        case actions_1.SET_CONTENT_LIST:
            return Object.assign({}, state, {
                list: action.list
            });
        default:
            return state;
    }
}
var appData = redux_1.combineReducers({
    app: app,
    sites: sites,
    siteDetail: siteDetail,
    doc: doc,
    content: content
});
exports.default = appData;


/***/ }),

/***/ 448:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = __webpack_require__(449);
var react_redux_1 = __webpack_require__(49);
var counter = 0;
function j() {
    counter++;
    return counter + "";
}
//
// var _gInitialized:boolean=false;
// export function gInit(cb) {
//     if (!_gInitialized) {
//         _gInitialized=true;
//         cb();
//     }
// }
// App
// export const GET_TITLE = j();
exports.SET_APP_TITLE = j();
exports.SET_SITE_LIST = j();
exports.SET_APP_ICON = j();
//sites
//site detail
exports.SET_DETAIL_LIST = j();
// document
exports.SET_DOCUMENT_LIST = j();
exports.SET_CONTENT_LIST = j();
var memFetch = {};
function cachedFetch(url, options) {
    // Use the URL as the cache key to sessionStorage
    var cacheKey = url + JSON.stringify(options || "");
    if (memFetch[cacheKey]) {
        return Promise.resolve(memFetch[cacheKey]);
    }
    memFetch[cacheKey] = fetch(url, options).then(function (response) {
        // let's only store in cache if the content-type is
        // JSON or something non-binary
        var ct = response.headers.get('Content-Type');
        if (ct && (ct.match(/application\/json/i))) {
            return response.json();
        }
        return response;
    });
    return memFetch[cacheKey];
}
exports.cachedFetch = cachedFetch;
var sourceData = {};
function appSource(key) {
    if (!sourceData[key]) {
        sourceData[key] = new Subject_1.Subject();
    }
    return sourceData[key];
}
exports.appSource = appSource;
function setSiteList(list) {
    return { type: exports.SET_SITE_LIST, list: list };
}
exports.setSiteList = setSiteList;
function setAppTitle(text) {
    return { type: exports.SET_APP_TITLE, text: text };
}
exports.setAppTitle = setAppTitle;
function setSiteDetailList(list) {
    return { type: exports.SET_DETAIL_LIST, list: list };
}
exports.setSiteDetailList = setSiteDetailList;
function setAppIcon(info) {
    return { type: exports.SET_APP_ICON, info: info };
}
exports.setAppIcon = setAppIcon;
function setDocumentList(list) {
    return { type: exports.SET_DOCUMENT_LIST, list: list };
}
exports.setDocumentList = setDocumentList;
function setContentList(list) {
    return { type: exports.SET_CONTENT_LIST, list: list };
}
exports.setContentList = setContentList;
function encodeHex(text) {
    var arr = text.split('').map(function (c) {
        return c.charCodeAt(0).toString(16);
    });
    return arr.join("-");
}
exports.encodeHex = encodeHex;
function decodeHex(text) {
    return text.split("-").map(function (o) { return String.fromCharCode(parseInt(o, 16)); }).join("");
}
exports.decodeHex = decodeHex;
function autoState(f1, f2) {
    return function (target) {
        console.log("g(): called", target);
        var f = react_redux_1.connect(function (state, ownProps) { return f1(state, ownProps); }, function (dispatch) { return f2(dispatch); })(target);
        return f;
    };
}
exports.autoState = autoState;


/***/ }),

/***/ 461:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// import Home from "./home";
var React = __webpack_require__(0);
var react_router_1 = __webpack_require__(463);
var createBrowserHistory_1 = __webpack_require__(476);
// import {setSiteList} from './actions'
var site_detail_1 = __webpack_require__(478);
var site_category_1 = __webpack_require__(1542);
var content_detail_1 = __webpack_require__(1546);
var app_header_1 = __webpack_require__(1547);
var colors_1 = __webpack_require__(96);
var react_redux_1 = __webpack_require__(49);
var home_1 = __webpack_require__(1548);
// import {FontIcon} from "material-ui";
// import {connect} from "react-redux";
// const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
// const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
var mapStateToProps = function (state, ownProps) {
    return {};
};
var mapDispatchToProps = function (dispatch) {
    return {};
};
// @connect(mapStateToProps,mapDispatchToProps)
//@autoState(mapStateToProps,mapDispatchToProps)
//@classDecorator(mapStateToProps,mapDispatchToProps)
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.componentDidMount = function () {
    };
    App.prototype.render = function () {
        var me = this;
        // console.log('app title:',me.props.title);
        return (React.createElement(react_router_1.Router, { key: Math.random(), history: createBrowserHistory_1.default() },
            React.createElement("div", { style: { display: 'flex', lineHeight: '150%', flexDirection: 'column', height: '100vh' } },
                React.createElement(app_header_1.default, null),
                React.createElement("div", { style: { flex: 1, overflowY: 'scroll', backgroundColor: colors_1.darkBlack, color: colors_1.white } },
                    React.createElement(react_router_1.Route, { exact: true, path: "/", component: home_1.default }),
                    React.createElement(react_router_1.Route, { path: "/site/:id", component: site_detail_1.default }),
                    React.createElement(react_router_1.Route, { path: "/site-category/:siteId/:name/:url", component: site_category_1.default }),
                    React.createElement(react_router_1.Route, { path: "/content-detail/:siteId/:name/:url", component: content_detail_1.default })))));
    };
    return App;
}(React.Component));
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);


/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_redux_1 = __webpack_require__(49);
var actions_1 = __webpack_require__(97);
var material_ui_1 = __webpack_require__(115);
var svg_icons_1 = __webpack_require__(300);
//
// let state = {
//     first: true,
//     lastDetail: -1,
//     inst: null
// };
// let loaded=[];
var SiteDetail = /** @class */ (function (_super) {
    __extends(SiteDetail, _super);
    function SiteDetail(props) {
        var _this = _super.call(this, props) || this;
        // this.isFirst=true;
        // this.iconDone=false;
        _this.state = {
            limit: 1,
            height: 0,
            lstDetail: []
        };
        return _this;
        // this.siteName=new Subject();
        // this.siteName.subscribe((text)=>{
        //     this.props.setTitle(text);
        //
        // });
        // state.inst=this;
        // this.props.setAppIcon({
        //     icon:"keyboard_arrow_left",
        //     click:this.goBack
        // });
    }
    SiteDetail.prototype.componentWillMount = function () {
        // this.props.setTitle();
        // let me = this;
        // let params = me.props.match.params;
        // if (this.props.listSites.length == 0) {
        //
        //     cachedFetch('/sites').then((res) =>{
        //         var fo=res.filter((o)=>o.id==params.id)[0];
        //         this.siteName.next(fo.name);
        //         this.props.setSiteList(res)
        //     });
        //     // state.first = false;
        //     // cachedFetch('/sites').then((res) => {
        //     //     this.props.setSiteList(res);
        //     //     var fo=res.filter((o)=>o.id==params.id)[0];
        //     //     this.siteName.next(fo.name);
        //     // });
        // } else {
        //     var fo=this.props.listSites.filter((o)=>o.id==params.id)[0];
        //     this.siteName.next(fo.name);
        // }
        //
        //
        // // this.props.setSiteList();
        //
        // if (params.id != state.lastDetail) {
        //     state.lastDetail = params.id;
        //
        //     cachedFetch('/site-detail/' + params.id).then((res) => this.props.setSiteDetailList(res.data));
        // }
        // console.log(this.props.listSites,'once');
        // debugger;
        //  console.log(this.props.listSites);
        // var site=me.props.listSites[params.id];
        // if (!loaded[params.id]) {
        // loaded[params.id]=true;
        // console.log("site found:",site);
        // }
    };
    SiteDetail.prototype.componentDidMount = function () {
        var _this = this;
        // debugger;
        //         console.log("render site detail");
        this.props.setAppIcon({
            icon: "keyboard_arrow_left",
            click: this.props.history.goBack
        });
        var params = this.props.match.params;
        var f1 = actions_1.cachedFetch('/site-detail/' + params.id).then(function (res) {
            _this.lstDetail = res.data;
            //this.props.setSiteDetailList(res.data)
            _this.setState(Object.assign({}, _this.state, {
                lstDetail: _this.lstDetail,
            }));
        });
        var f2 = actions_1.cachedFetch('/sites').then(function (res) {
            var fo = res.filter(function (o) { return o.id == params.id; })[0];
            // console.log('name',fo)
            _this.props.setTitle(fo.name);
            _this.props.setSiteList(res);
            _this.sites = res;
        });
        // Promise.all([f1,f2]).then(()=>{
        //
        // })
        // if ((this.props.listSites.length == 0) ) {
        // this.props.setLoading(true);
        // this.props.setLoading(false);
        // } else {
        //     var fo = this.props.listSites.filter((o) => o.id == params.id)[0];
        //     this.props.setTitle(fo.name);
        // }
        // console.log(h);
        // if (h>0) {
        //     if (h!=this.state.height) {
        //         this.setState(Object.assign({},this.state,{
        //             height:h
        //         }));
        //     }
        //
        //     var h1=$(this.divElement).height();
        //     if (h1<h) {
        //         console.log(h1);
        //         this.setState(Object.assign({},this.state,{
        //             limit:this.state.limit+1
        //         }));
        //     }
        // }
        //console.log($(this.divElement).parent().height());
        // loopFunction.next({
        //     el:this.divElement,
        //     c:this
        //     }
        // );
        // if (!$(this.el).attr("done")) {
        //     $(this.el).attr("done",1)
        //     this.props.setAppIcon({icon:"keyboard_arrow_left",
        //         // click:()=>{
        //         //     console.log("click click");
        //         //     this.props.history.goBack();
        //         // }
        //     });
        // }
    };
    SiteDetail.prototype.goBack = function (props) {
        // console.log("click click");
        // state.inst.props.history.goBack();
    };
    SiteDetail.prototype.norm = function (text) {
        var arr = ((text || "") + "").split('').map(function (c) {
            return c.charCodeAt(0).toString(16);
        });
        return arr.join("-");
    };
    SiteDetail.prototype.render = function () {
        // console.log("render");
        // console.log(this.props.lstDetail);
        var _this = this;
        return (React.createElement("div", { ref: function (el) { return _this.el = el; } }, this.state.lstDetail.map(function (item, idx) {
            // if (idx + 1 > this.state.limit) return;
            return (React.createElement(material_ui_1.ListItem, { key: idx, leftAvatar: React.createElement(material_ui_1.Avatar, { icon: React.createElement(svg_icons_1.FileFolder, null) }), primaryText: item.text, onClick: function () {
                    // context.history.push === history.push
                    _this.props.history.push('/site-category/' + _this.props.match.params.id + '/' + _this.norm(item.text) + '/' + _this.norm(item.link));
                }, secondaryText: item.link }));
        })));
    };
    return SiteDetail;
}(React.Component));
var mapStateToProps = function (state, ownProps) {
    return {};
};
var mapDispatchToProps = function (dispatch) {
    return {
        setSiteList: function (lst) { return dispatch(actions_1.setSiteList(lst)); },
        setSiteDetailList: function (list) { return dispatch(actions_1.setSiteDetailList(list)); },
        setTitle: function (data) { return dispatch(actions_1.setAppTitle(data || "")); },
        setAppIcon: function (icon) { return dispatch(actions_1.setAppIcon(icon)); },
        setLoading: function (state) { }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SiteDetail);


/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(448));


/***/ })

},[337]);