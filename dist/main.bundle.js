webpackJsonp([1],{

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setTitle = setTitle;
exports.getSite = getSite;

var _Subject = __webpack_require__(21);

var appState = {
    title: new _Subject.Subject(),
    sites: new _Subject.Subject()
};

function setTitle(text) {
    appState.title.next(text);
}

function getSite(id) {}

exports.default = appState;

/***/ }),

/***/ 1872:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _home = __webpack_require__(211);

var _home2 = _interopRequireDefault(_home);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(281);

var _createBrowserHistory = __webpack_require__(136);

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _actions = __webpack_require__(42);

var _siteDetail = __webpack_require__(282);

var _siteDetail2 = _interopRequireDefault(_siteDetail);

var _siteCategory = __webpack_require__(382);

var _siteCategory2 = _interopRequireDefault(_siteCategory);

var _reactRedux = __webpack_require__(41);

var _materialUi = __webpack_require__(70);

var _appData = __webpack_require__(157);

var _appData2 = _interopRequireDefault(_appData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var recentsIcon = _react2.default.createElement(
    _materialUi.FontIcon,
    { className: "material-icons" },
    "restore"
);
var favoritesIcon = _react2.default.createElement(
    _materialUi.FontIcon,
    { className: "material-icons" },
    "favorite"
);

// @autoState()

var AppHeader = function (_React$Component) {
    _inherits(AppHeader, _React$Component);

    function AppHeader() {
        _classCallCheck(this, AppHeader);

        return _possibleConstructorReturn(this, (AppHeader.__proto__ || Object.getPrototypeOf(AppHeader)).apply(this, arguments));
    }

    _createClass(AppHeader, [{
        key: "componentDidMount",
        value: function componentDidMount() {
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
            console.log("Event");
            // this.props.getTitle();
        }
    }, {
        key: "render",
        value: function render() {
            var me = this;
            // console.log('app title:',me.props.list)
            return _react2.default.createElement(_materialUi.AppBar, {
                title: this.props.title,
                iconElementLeft: _react2.default.createElement(
                    _materialUi.IconButton,
                    { onClick: this.props.menuClick },
                    _react2.default.createElement(
                        _materialUi.FontIcon,
                        { className: 'material-icons' },
                        this.props.icon
                    )
                ),
                iconElementRight: _react2.default.createElement(
                    _materialUi.IconButton,
                    null,
                    _react2.default.createElement(
                        _materialUi.FontIcon,
                        { className: 'material-icons' },
                        "settings"
                    )
                )
            });
        }
    }]);

    return AppHeader;
}(_react2.default.Component);
//


var mapStateToProps = function mapStateToProps(state, ownProps) {
    return {
        // siteLoaded:state.sites.loaded,
        menuClick: state.app.click,
        title: state.app.title,
        icon: state.app.icon
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        // setSiteList:(lst)=>dispatch(setSiteList(lst)),
    };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AppHeader);

/***/ }),

/***/ 1873:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContentDetail = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(41);

var _actions = __webpack_require__(42);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var state = {
    height: 0,
    startPos: 0,
    limit: 1,
    items: [],
    fetchItem: false,
    lastDetail: -1
};
var canvas = document.createElement("canvas");

var ContentDetail = exports.ContentDetail = function (_React$Component) {
    _inherits(ContentDetail, _React$Component);

    function ContentDetail(props) {
        _classCallCheck(this, ContentDetail);

        var _this = _possibleConstructorReturn(this, (ContentDetail.__proto__ || Object.getPrototypeOf(ContentDetail)).call(this, props));

        _this.resetState();
        state.height = 0;
        state.changed = false;
        state.lastRows = "";
        _this.isFirst = true;

        return _this;
    }

    _createClass(ContentDetail, [{
        key: 'resetState',
        value: function resetState() {
            state = Object.assign({}, state, {

                startPos: 0,
                // limit: 1,
                items: [],
                fetchItem: false,
                mapItems: []

            });
        }
    }, {
        key: 'updateTitle',
        value: function updateTitle(lst) {
            var _this2 = this;

            lst = lst || this.props.listSites;
            var fo = lst.filter(function (site) {
                return _this2.props.match.params.siteId == site.id;
            })[0];
            var n = this.props.match.params.name.split("-").map(function (o) {
                return String.fromCharCode(parseInt(o, 16));
            }).join("");
            this.site = fo;
            this.props.setTitle(this.title);
        }
    }, {
        key: 'getTextWidth',
        value: function getTextWidth(text, font) {
            // re-use canvas object for better performance

            var context = canvas.getContext("2d");
            context.font = font || "normal 16px 'Segoe UI'";
            var metrics = context.measureText(text);
            return metrics.width;
        }
    }, {
        key: 'getTextHeight',
        value: function getTextHeight(text, font) {
            // re-use canvas object for better performance

            var context = canvas.getContext("2d");
            context.font = font || "normal 16px 'Segoe UI'";
            var metrics = context.measureText(text);
            return 24;
        }
    }, {
        key: 'getFitLine',
        value: function getFitLine(arr) {
            var _this3 = this;

            var lst = [];
            var lstr = [];
            var w = $(window).width() - 20 - 10;
            arr.filter(function (r) {
                return (r || "") !== "";
            }).map(function (r) {
                lstr.push(r);
                var text = lstr.join(" ");
                if (_this3.getTextWidth(text) >= w) {
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
        }
    }, {
        key: 'buildRow',
        value: function buildRow(list) {
            var _this4 = this;

            var newRows = list.map(function (row) {
                var lst = [];
                var strs = (row || "").replace(/[\r\n\t]/gi, "").split(' ');
                if (strs.length) {
                    // debugger;
                    lst = _this4.getFitLine(strs);
                }
                return lst;
            });
            // debugger;
            state.mapItems = [].concat.apply([], newRows);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            this.mprops = newProps;
            var changed = false;
            // debugger;
            if (newProps.location && this.oldLocaltion != newProps.location.pathname) {

                this.oldLocaltion = newProps.location.pathname;
                this.resetState();
                this.getContentList();
                changed = true;
                this.setState(Object.assign({}, state));
            }
            var js = JSON.stringify(this.mprops.contentList);
            if (this.mprops.contentList.length && js !== state.lastRows) {
                // console.log("props changed");
                state.lastRows = js;

                //if (this.isFirst || changed) {
                // console.log(this.isFirst,changed);

                // this.isFirst = false;


                this.buildRow(this.mprops.contentList);

                if (this.isPrev) {
                    this.isPrev = false;
                    var pages = parseInt((state.mapItems.length + state.limit - 1) / state.limit);
                    state.startPos = (pages - 1) * state.limit;
                }
                this.setState(Object.assign({}, state));
                // console.log("update ",state.mapItems.length);


                //}
            }
        }
    }, {
        key: 'getContent',
        value: function getContent() {
            var _this5 = this;

            console.log("get content called");
            this.mprops = this.mprops || this.props;
            var url = '/doc-content/' + this.site.id + "/" + this.mprops.match.params.name + "/" + this.mprops.match.params.url;
            fetch('/save', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.site.id,
                    url: '/content-detail/' + this.site.id + "/" + this.mprops.match.params.name + "/" + this.mprops.match.params.url,
                    name: (0, _actions.decodeHex)(this.mprops.match.params.name)
                })
            }).then(function (r) {
                return r;
            });

            return (0, _actions.cachedFetch)(url).then(function (res) {
                // debugger;

                _this5.next = res.next;
                _this5.prev = res.prev;
                _this5.title = res.title;
                if (res.next) (0, _actions.cachedFetch)('/doc-content/' + _this5.site.id + "/" + _this5.mprops.match.params.name + "/" + (0, _actions.encodeHex)(res.next)); // cache next page
                if (res.prev) (0, _actions.cachedFetch)('/doc-content/' + _this5.site.id + "/" + _this5.mprops.match.params.name + "/" + (0, _actions.encodeHex)(res.prev)); // cache prev page
                _this5.updateTitle();
                // console.log(res.data);
                return res;
            });
        }
    }, {
        key: 'getContentList',
        value: function getContentList() {
            var _this6 = this;

            //if (this.isFirst) {
            this.next = null;
            this.prev = null;
            this.getContent().then(function (res) {
                return _this6.props.setContentList(res.data);
            });
            // this.isFirst = false;
            //}


            // this.mprops = this.mprops || this.props;
            // var url = '/doc-content/' + this.site.id + "/" + this.mprops.match.params.name + "/" + this.mprops.match.params.url;
            // fetch('/save', {
            //     method: 'post',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         id: this.site.id,
            //         url: '/content-detail/' + this.site.id + "/" + this.mprops.match.params.name + "/" + this.mprops.match.params.url,
            //         name: decodeHex(this.mprops.match.params.name)
            //     })
            // }).then(r => r);
            //
            // cachedFetch(url).then((res) => {
            //     // debugger;
            //     this.props.setContentList(res.data);
            //     this.next = res.next;
            //     this.prev = res.prev;
            //     this.title = res.title;
            //     this.updateTitle();
            //     // console.log(res.data);
            // });
        }
    }, {
        key: 'doNext',
        value: function doNext() {
            // console.log("limit item", state.limit);
            if (state.startPos + state.limit < state.mapItems.length) {
                state.startPos = state.startPos + state.limit;
                // console.log(state.startPos);
                this.setState(Object.assign({}, state));
            } else {
                // debugger;
                if (this.next) {
                    // this.isPrev=false;
                    this.props.history.replace('/content-detail/' + this.site.id + "/" + this.mprops.match.params.name + "/" + (0, _actions.encodeHex)(this.next));
                    // this.resetState();
                    // this.getContent().then(res=>{
                    //     this.buildRow(res.data);
                    //     // this.setState(Object.assign({}, state));
                    // })
                    // this.getContentList();
                }
            }
        }
    }, {
        key: 'doPrev',
        value: function doPrev() {
            //console.log("limit item",state.limit);
            if (state.startPos - state.limit >= 0) {
                state.startPos = state.startPos - state.limit;
                this.setState(Object.assign({}, state));
            } else {
                // debugger;
                if (this.prev) {
                    this.isPrev = true;
                    this.props.history.replace('/content-detail/' + this.site.id + "/" + this.mprops.match.params.name + "/" + (0, _actions.encodeHex)(this.prev));
                    // this.resetState();
                    // this.lockUpdate=true;
                    // this.getContent().then(res=>{
                    //
                    //     this.buildRow(res.data);
                    //     var pages=parseInt((state.mapItems.length)/state.limit);
                    //
                    //
                    //     state.startPos=(pages-1)*state.limit;
                    //     console.log("prev set item",pages,state.mapItems.length,state.startPos);
                    //     // this.lockUpdate=false;
                    //     // this.setState(Object.assign({}, state));
                    // });
                    //calc last page
                    // this.getContentList();
                }
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this7 = this;

            this.props.setAppIcon({
                icon: "keyboard_arrow_left",
                click: this.props.history.goBack
            });
            this.oldLocaltion = this.props.history.location.pathname;
            this.title = "";
            if (this.props.listSites.length == 0) {
                (0, _actions.cachedFetch)('/sites').then(function (res) {
                    // debugger;
                    _this7.props.setSiteList(res);
                    _this7.updateTitle(res);
                    _this7.getContentList();
                });
            } else {
                // debugger;
                this.updateTitle();
                this.getContentList();
            }
            var padding = 20;
            state.height = $(this.el).parent().height() - padding;
            state.limit = parseInt(state.height / this.getTextHeight('hg'));
            // console.log(state.height);
            this.setState(Object.assign({}, state));
        }
    }, {
        key: 'renderItem',
        value: function renderItem(item, idx, limit) {

            return _react2.default.createElement(
                'div',
                { key: state.startPos + idx },
                item
            );
        }
    }, {
        key: 'onClick',
        value: function onClick(event) {
            event.persist();
            // debugger;
            if (event.clientX > $(window).width() / 2) {
                this.doNext();
            } else {
                this.doPrev();
            }
            // console.log(event.clientX,event.clientY);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this8 = this;

            var paging = _react2.default.createElement('div', null);
            if (state.mapItems && state.mapItems.length) {
                // console.log("render changed",state.mapItems,state.startPos , state.limit);
                var items = state.mapItems.slice(state.startPos, state.startPos + state.limit);
                paging = _react2.default.createElement(
                    'div',
                    { style: { padding: '10px 0px 10px 10px', height: state.height }, onClick: function onClick(evt) {
                            return _this8.onClick(evt);
                        } },
                    items.map(function (item, idx) {
                        return _react2.default.createElement(
                            'div',
                            { key: state.startPos + idx },
                            item
                        );
                    })
                );
            } else {
                // console.log("render blank");
                // return (<div ref={el => this.el = el}></div>)
                //<Paging startPos={state.startPos} height={state.height} rows={state.mapItems}
                //renderItem={this.renderItem} limit={state.limit}/>
            }
            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this8.el = el;
                    } },
                paging
            );
        }
    }]);

    return ContentDetail;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return {
        listSites: state.sites.list,
        contentList: state.content.list
        //docList:state.doc.list
        // lstDetail:state.app.siteDetail.list
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        setSiteList: function setSiteList(lst) {
            return dispatch((0, _actions.setSiteList)(lst));
        },
        setDocList: function setDocList(lst) {
            return dispatch((0, _actions.setDocumentList)(lst));
        },
        // setSiteDetailList:(list)=>dispatch(setSiteDetailList(list)),
        setTitle: function setTitle(data) {
            return dispatch((0, _actions.setAppTitle)("" + data || ""));
        },
        setAppIcon: function setAppIcon(icon) {
            return dispatch((0, _actions.setAppIcon)(icon));
        },
        setContentList: function setContentList(lst) {
            return dispatch((0, _actions.setContentList)(lst));
        }

    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ContentDetail);

/***/ }),

/***/ 1874:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(497);

var _materialUi = __webpack_require__(70);

var _index = __webpack_require__(156);

var _reactRedux = __webpack_require__(41);

var _actions = __webpack_require__(42);

var _appData = __webpack_require__(157);

var _appData2 = _interopRequireDefault(_appData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import {bindActionCreators} from "redux";

// var first=true;

var Home = function (_React$Component) {
    _inherits(Home, _React$Component);

    function Home() {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
    }

    _createClass(Home, [{
        key: 'componentDidMount',


        //  constructor(props,context) {
        //      super(props,context);
        //      // appState.title.next("Home")
        //      // this.props.setTitle();
        //      // this.props.setAppIcon({icon:"home"});
        //      // cachedFetch('/sites').then((res) =>this.props.setSiteList(res));
        //
        // //     // this.state = {
        // //     //     counter : 100
        // //     // };
        // //
        // //     // const {counter }=props;
        // //     //const {firstAction, secondAction} = props;
        //  }
        value: function componentDidMount() {
            var _this2 = this;

            this.props.setTitle();
            var click = function click() {};
            this.props.setAppIcon({ icon: "home", click: click });
            console.log("render Home", JSON.stringify(this.props.list));
            // if ((this.props.list.length == 0)) {
            // this.props.setLoading(true);
            fetch('/sites').then(function (res) {
                return res.json();
            }).then(function (res) {
                return _this2.props.setSiteList(res);
            });
            // this.props.setLoading(false);

            // }

        }
    }, {
        key: 'render',
        value: function render() {
            var me = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _materialUi.List,
                    null,
                    _react2.default.createElement(
                        _materialUi.Subheader,
                        { inset: true },
                        'List sites'
                    ),
                    this.props.list.map(function (o) {
                        {
                            if (o.reading) {
                                return _react2.default.createElement(_materialUi.ListItem, { key: o.id,
                                    leftAvatar: _react2.default.createElement(_materialUi.Avatar, { icon: _react2.default.createElement(_index.FileFolder, null) }),
                                    rightIcon: _react2.default.createElement(_index.ActionInfo, null),
                                    primaryText: o.name,
                                    onClick: function onClick() {
                                        // context.history.push === history.push
                                        me.props.history.push(o.url);
                                    },
                                    secondaryText: o.url });
                            } else {
                                return _react2.default.createElement(_materialUi.ListItem, { key: o.id,
                                    leftAvatar: _react2.default.createElement(_materialUi.Avatar, { icon: _react2.default.createElement(_index.FileFolder, null) }),
                                    rightIcon: _react2.default.createElement(_index.ActionInfo, null),
                                    primaryText: o.name,
                                    onClick: function onClick() {
                                        // context.history.push === history.push
                                        me.props.history.push('/site/' + o.id);
                                    },
                                    secondaryText: o.url
                                });
                            }
                        };
                    })
                )
            );
        }
    }]);

    return Home;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    // debugger;
    return {
        loading: state.sites.loading,
        list: state.sites.list
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        // same effect
        setTitle: function setTitle() {
            return dispatch((0, _actions.setAppTitle)("Home"));
        },
        setSiteList: function setSiteList(lst) {
            return dispatch((0, _actions.setSiteList)(lst));
        },
        setAppIcon: function setAppIcon(icon) {
            return dispatch((0, _actions.setAppIcon)(icon));
        }

        // secondAction : bindActionCreators(()=>{}, dispatch)
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Home);

/***/ }),

/***/ 282:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(41);

var _actions = __webpack_require__(42);

var _materialUi = __webpack_require__(70);

var _index = __webpack_require__(156);

var _rxjs = __webpack_require__(283);

var _reactHeight = __webpack_require__(381);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var state = {
    first: true,
    lastDetail: -1,
    inst: null
};

// let loaded=[];

var SiteDetail = function (_React$Component) {
    _inherits(SiteDetail, _React$Component);

    function SiteDetail(props) {
        _classCallCheck(this, SiteDetail);

        // this.isLast=false;
        // this.iconDone=false;
        var _this = _possibleConstructorReturn(this, (SiteDetail.__proto__ || Object.getPrototypeOf(SiteDetail)).call(this, props));

        _this.state = {
            limit: 1,
            height: 0
        };
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


        return _this;
    }

    _createClass(SiteDetail, [{
        key: "componentWillMount",
        value: function componentWillMount() {
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
        }
    }, {
        key: "incItems",
        value: function incItems(height) {
            var h = $(this.el).parent().height();
            if (height == 0) return;
            if (this.isLast) return;
            if (height < h) {
                // console.log("xxxxxx",height)
                if (this.state.limit > 100) return;
                this.setState(Object.assign({}, this.state, {
                    limit: this.state.limit + 1
                }));
            } else {
                // console.log("yyyy",this.state.limit);
                this.isLast = true;
                this.setState(Object.assign({}, this.state, {
                    limit: this.state.limit - 1
                }));
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            console.log("render site detail");
            this.props.setAppIcon({
                icon: "keyboard_arrow_left",
                click: this.props.history.goBack
            });

            var params = this.props.match.params;
            (0, _actions.cachedFetch)('/site-detail/' + params.id).then(function (res) {
                return _this2.props.setSiteDetailList(res.data);
            });
            if (this.props.listSites.length == 0) {
                // this.props.setLoading(true);
                (0, _actions.cachedFetch)('/sites').then(function (res) {
                    var fo = res.filter(function (o) {
                        return o.id == params.id;
                    })[0];
                    // console.log('name',fo)
                    _this2.props.setTitle(fo.name);

                    _this2.props.setSiteList(res);
                });
                // this.props.setLoading(false);
            } else {
                var fo = this.props.listSites.filter(function (o) {
                    return o.id == params.id;
                })[0];
                this.props.setTitle(fo.name);
            }
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

        }
    }, {
        key: "goBack",
        value: function goBack(props) {

            // console.log("click click");
            // state.inst.props.history.goBack();


        }
    }, {
        key: "norm",
        value: function norm(text) {
            var arr = ((text || "") + "").split('').map(function (c) {
                return c.charCodeAt(0).toString(16);
            });
            return arr.join("-");
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            // console.log(this.props.lstDetail);

            return _react2.default.createElement(
                "div",
                { ref: function ref(el) {
                        return _this3.el = el;
                    } },
                this.props.lstDetail.map(function (item, idx) {
                    // if (idx + 1 > this.state.limit) return;
                    return _react2.default.createElement(_materialUi.ListItem, {

                        key: idx,
                        leftAvatar: _react2.default.createElement(_materialUi.Avatar, { icon: _react2.default.createElement(_index.FileFolder, null) }),
                        primaryText: item.text,
                        onClick: function onClick() {
                            // context.history.push === history.push
                            _this3.props.history.push('/site-category/' + _this3.props.match.params.id + '/' + _this3.norm(item.text) + '/' + _this3.norm(item.link));
                        },
                        secondaryText: item.link
                    });
                })
            );
        }
    }]);

    return SiteDetail;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return {
        loading: state.sites.loading,
        listSites: state.sites.list,
        lstDetail: state.siteDetail.list
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        setSiteList: function setSiteList(lst) {
            return dispatch((0, _actions.setSiteList)(lst));
        },
        setSiteDetailList: function setSiteDetailList(list) {
            return dispatch((0, _actions.setSiteDetailList)(list));
        },
        setTitle: function setTitle(data) {
            return dispatch((0, _actions.setAppTitle)(data || ""));
        },
        setAppIcon: function setAppIcon(icon) {
            return dispatch((0, _actions.setAppIcon)(icon));
        },
        setLoading: function setLoading(state) {}

    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SiteDetail);

/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(41);

var _actions = __webpack_require__(42);

var _materialUi = __webpack_require__(70);

var _index = __webpack_require__(156);

var _rxjs = __webpack_require__(283);

var _paging = __webpack_require__(383);

var _paging2 = _interopRequireDefault(_paging);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var state = {
    height: 0,
    startPos: 0,
    limit: 1,
    items: [],
    fetchItem: false,
    lastDetail: -1
};

// let loaded=[];

var SiteCategory = function (_React$Component) {
    _inherits(SiteCategory, _React$Component);

    function SiteCategory(props) {
        _classCallCheck(this, SiteCategory);

        var _this = _possibleConstructorReturn(this, (SiteCategory.__proto__ || Object.getPrototypeOf(SiteCategory)).call(this, props));

        state = {
            height: 0,
            startPos: 0,
            limit: 1,
            items: [],
            fetchItem: false,
            lastDetail: -1,
            rows: []

        };
        _this.state = {
            height: 0
            //     // this.title=new Subject();
            //     // this.title.subscribe((text)=>this.props.setTitle(text))
            //
        };return _this;
    }

    _createClass(SiteCategory, [{
        key: "updateTitle",
        value: function updateTitle(lst) {
            var _this2 = this;

            var fo = lst.filter(function (site) {
                return _this2.props.match.params.siteId == site.id;
            })[0];
            var n = this.props.match.params.name.split("-").map(function (o) {
                return String.fromCharCode(parseInt(o, 16));
            }).join("");
            this.site = fo;
            this.props.setTitle(fo.name + " - " + n);
        }
    }, {
        key: "getDocumentList",
        value: function getDocumentList() {
            var _this3 = this;

            (0, _actions.cachedFetch)('/doc-list/' + this.site.id + "/" + this.props.match.params.url).then(function (res) {

                _this3.props.setDocList(res.data);
                // state.items = res.data.slice(state.startPos, 1);
                // state=Object.assign({},state,{fetchItem:true,limit:1});
                // this.setState(state);
                //
                // console.log('items:', state.items);
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this4 = this;

            this.props.setAppIcon({
                icon: "keyboard_arrow_left",
                click: this.props.history.goBack
            });
            if (this.props.listSites.length == 0) {
                (0, _actions.cachedFetch)('/sites').then(function (res) {
                    // debugger;
                    _this4.props.setSiteList(res);
                    _this4.updateTitle(res);
                    _this4.getDocumentList();
                });
            } else {
                // debugger;
                this.updateTitle(this.props.listSites);
                this.getDocumentList();
            }
            state.me = this;
            state.height = $(this.el).parent().height() - 56;
        }
    }, {
        key: "renderItem",
        value: function renderItem(item, idx, limit) {
            state.limit = limit;

            return _react2.default.createElement(_materialUi.ListItem, {

                key: idx
                // leftAvatar={<Avatar icon={<FileFolder/>}/>}
                // rightIcon={<ActionInfo/>}
                , primaryText: item.title,
                onClick: function onClick() {
                    // context.history.push === history.push
                    state.me.props.history.push('/content-detail/' + state.me.props.match.params.siteId + '/' + state.me.props.match.params.name + "/" + (0, _actions.encodeHex)(item.link));
                },
                secondaryText: item.link || " "
            });
        }
    }, {
        key: "doNext",
        value: function doNext() {
            console.log("limit item", state.limit);
            if (state.startPos + state.limit < this.props.docList.length) {
                state.startPos = state.startPos + state.limit;
                this.setState(Object.assign({}, state));
            }
        }
    }, {
        key: "doPrev",
        value: function doPrev() {
            //console.log("limit item",state.limit);
            if (state.startPos - state.limit >= 0) {
                state.startPos = state.startPos - state.limit;
                this.setState(Object.assign({}, state));
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            return _react2.default.createElement(
                "div",
                { style: { 'display': 'flex', 'flexDirection': 'column' }, ref: function ref(el) {
                        return _this5.el = el;
                    } },
                _react2.default.createElement(
                    "div",
                    { style: { height: state.height } },
                    _react2.default.createElement(_paging2.default, { startPos: state.startPos, height: state.height, rows: this.props.docList, renderItem: this.renderItem })
                ),
                _react2.default.createElement(
                    _materialUi.Toolbar,
                    null,
                    _react2.default.createElement(
                        _materialUi.ToolbarGroup,
                        { firstChild: true },
                        _react2.default.createElement(_materialUi.RaisedButton, { label: "Prev", onClick: function onClick() {
                                return _this5.doPrev();
                            }, primary: true })
                    ),
                    _react2.default.createElement(
                        _materialUi.ToolbarGroup,
                        null,
                        _react2.default.createElement(_materialUi.RaisedButton, { label: "Next", onClick: function onClick() {
                                return _this5.doNext();
                            }, primary: true })
                    )
                )
            );
        }
    }]);

    return SiteCategory;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return {
        listSites: state.sites.list,
        docList: state.doc.list
        // lstDetail:state.app.siteDetail.list
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        setSiteList: function setSiteList(lst) {
            return dispatch((0, _actions.setSiteList)(lst));
        },
        setDocList: function setDocList(lst) {
            return dispatch((0, _actions.setDocumentList)(lst));
        },
        // setSiteDetailList:(list)=>dispatch(setSiteDetailList(list)),
        setTitle: function setTitle(data) {
            return dispatch((0, _actions.setAppTitle)("" + data || ""));
        },
        setAppIcon: function setAppIcon(icon) {
            return dispatch((0, _actions.setAppIcon)(icon));
        }

    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SiteCategory);

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(41);

var _reactHeight = __webpack_require__(381);

var _actions = __webpack_require__(42);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var state = {
    height: 0,
    startPos: 0,
    limit: 1,
    items: [],
    fetchItem: false,
    lastDetail: -1,
    rows: []
};

// let loaded=[];

var Paging = function (_React$Component) {
    _inherits(Paging, _React$Component);

    function Paging(props) {
        _classCallCheck(this, Paging);

        var _this = _possibleConstructorReturn(this, (Paging.__proto__ || Object.getPrototypeOf(Paging)).call(this, props));

        _this.state = state = {
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

    _createClass(Paging, [{
        key: "addMoreRow",
        value: function addMoreRow(height) {

            if (this.props.limit) {

                return;
            }
            if (height > this.props.height) {
                // console.log("last ",state.limit);
                state = Object.assign({}, state, {
                    fetchItem: false,
                    limit: state.limit - 1,
                    items: state.rows.slice(state.startPos, state.startPos + state.limit - 1)
                });
                this.setState(state);
            } else {
                // console.log("axddrow",state.limit,state.fetchItem);
                if (state.fetchItem) {
                    state.limit = state.limit + 1;
                    var items = state.rows.slice(state.startPos, state.startPos + state.limit);
                    var fetchItem = items.length > state.items.length;
                    state.items = items;
                    if (!fetchItem) {
                        state.limit = state.limit - 1;
                    }
                    state = Object.assign({}, state, { fetchItem: fetchItem });
                    this.setState(state);
                }
            }
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            state.rows = [].concat(nextProps.rows);
            state.startPos = nextProps.startPos;

            state.limit = nextProps.limit || 1;
            // console.log(state.limit);
            state.items = state.rows.slice(state.startPos, state.startPos + state.limit);
            // if (state.startPos>0) {
            //     debugger;
            // }
            // console.log("items",state.rows);
            if (state.items.length == 0) {
                state.fetchItem = false;
            } else {
                state.fetchItem = true;
            }
            this.setState(Object.assign({}, state));
            console.log("props change ", this.state);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            // console.log("rows ",state.rows);


        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var rows = state.rows.slice(this.state.startPos, state.startPos + state.limit);
            var items = rows.map(function (item, idx) {
                return _this2.props.renderItem(item, idx, state.limit);
            });
            // console.log("items:",state.rows);
            return _react2.default.createElement(
                _reactHeight.ReactHeight,
                { onHeightReady: function onHeightReady(height) {
                        return _this2.addMoreRow(height);
                    } },
                state.items.map(function (item, idx) {
                    return _this2.props.renderItem(item, idx, state.limit);
                })
            );
        }
    }]);

    return Paging;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Paging);

/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(20);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MuiThemeProvider = __webpack_require__(180);

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _reactRedux = __webpack_require__(41);

var _darkBaseTheme = __webpack_require__(493);

var _darkBaseTheme2 = _interopRequireDefault(_darkBaseTheme);

var _getMuiTheme = __webpack_require__(192);

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _redux = __webpack_require__(134);

var _reducers = __webpack_require__(494);

var _reducers2 = _interopRequireDefault(_reducers);

var _app = __webpack_require__(496);

var _app2 = _interopRequireDefault(_app);

var _colors = __webpack_require__(58);

__webpack_require__(1874);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var muiTheme = {
    palette: {
        primary1Color: _colors.indigo700,
        primary2Color: _colors.indigo700,
        primary3Color: _colors.white,
        textColor: _colors.white,
        secondaryTextColor: _colors.white,
        alternateTextColor: _colors.white
    },
    appBar: {
        //height: 50,
    }
};

var store = (0, _redux.createStore)(_reducers2.default);

_reactDom2.default.render(_react2.default.createElement(
    _MuiThemeProvider2.default,
    { muiTheme: (0, _getMuiTheme2.default)(muiTheme) },
    _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_app2.default, null)
    )
), document.getElementById('app'));

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = __webpack_require__(495);

Object.keys(_actions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actions[key];
    }
  });
});

/***/ }),

/***/ 494:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(134);

var _actions = __webpack_require__(42);

var initState = {
    title: "",
    icon: "home",
    click: function click() {
        console.log("default on click");
    }

};

function app() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
    var action = arguments[1];

    var res = action.type.split('|').map(function (type) {
        switch (type) {
            case _actions.SET_APP_TITLE:
                return Object.assign({}, state, {
                    title: action.text
                });
            case _actions.SET_APP_ICON:
                var r = action.info;
                var p = {};
                if (r.icon) p.icon = r.icon;
                if (r.click) p.click = r.click;

                return Object.assign({}, state, p);

            default:
                return state;
        }
    });
    return Object.assign.apply({}, res);
}

function sites() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        loading: false,
        list: []
    };
    var action = arguments[1];

    switch (action.type) {

        case _actions.SET_SITE_LIST:
            return Object.assign({}, state, {

                list: action.list
            });
        default:
            return state;
    }
}

function siteDetail() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        list: []
    };
    var action = arguments[1];

    switch (action.type) {
        case _actions.SET_DETAIL_LIST:
            return Object.assign({}, state, {
                list: action.list

            });

        default:
            return state;
    }
}

function doc() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        list: []
    };
    var action = arguments[1];

    switch (action.type) {
        case _actions.SET_DOCUMENT_LIST:
            return Object.assign({}, state, {
                list: action.list
            });
        default:
            return state;
    }
}

function content() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        list: []
    };
    var action = arguments[1];

    switch (action.type) {
        case _actions.SET_CONTENT_LIST:
            return Object.assign({}, state, {
                list: action.list
            });
        default:
            return state;
    }
}
var appData = (0, _redux.combineReducers)({
    app: app,
    sites: sites,
    siteDetail: siteDetail,
    doc: doc,
    content: content
});

exports.default = appData;

/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cachedFetch = cachedFetch;
exports.setSiteList = setSiteList;
exports.setAppTitle = setAppTitle;
exports.setSiteDetailList = setSiteDetailList;
exports.setAppIcon = setAppIcon;
exports.setDocumentList = setDocumentList;
exports.setContentList = setContentList;
exports.encodeHex = encodeHex;
exports.decodeHex = decodeHex;
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
var SET_APP_TITLE = exports.SET_APP_TITLE = j();
var SET_SITE_LIST = exports.SET_SITE_LIST = j();
var SET_APP_ICON = exports.SET_APP_ICON = j();

//sites

//site detail
var SET_DETAIL_LIST = exports.SET_DETAIL_LIST = j();

// document
var SET_DOCUMENT_LIST = exports.SET_DOCUMENT_LIST = j();
var SET_CONTENT_LIST = exports.SET_CONTENT_LIST = j();

var memFetch = {};

function cachedFetch(url, options) {
    // Use the URL as the cache key to sessionStorage
    var cacheKey = url + JSON.stringify(options || "");
    // if (memFetch[cacheKey]) {
    //     return Promise.resolve(memFetch[cacheKey]);
    // }
    memFetch[cacheKey] = fetch(url, options).then(function (response) {
        // let's only store in cache if the content-type is
        // JSON or something non-binary
        var ct = response.headers.get('Content-Type');
        if (ct && ct.match(/application\/json/i)) {
            return response.json();
        }
        return response;
    });
    return memFetch[cacheKey];
}

function setSiteList(list) {
    return { type: SET_SITE_LIST, list: list };
}

function setAppTitle(text) {
    return { type: SET_APP_TITLE, text: text };
}

function setSiteDetailList(list) {
    return { type: SET_DETAIL_LIST, list: list };
}
function setAppIcon(info) {
    return { type: SET_APP_ICON, info: info };
}
function setDocumentList(list) {
    return { type: SET_DOCUMENT_LIST, list: list };
}
function setContentList(list) {
    return { type: SET_CONTENT_LIST, list: list };
}
function encodeHex(text) {
    var arr = text.split('').map(function (c) {
        return c.charCodeAt(0).toString(16);
    });
    return arr.join("-");
}
function decodeHex(text) {
    return text.split("-").map(function (o) {
        return String.fromCharCode(parseInt(o, 16));
    }).join("");
}

/***/ }),

/***/ 496:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _home = __webpack_require__(211);

var _home2 = _interopRequireDefault(_home);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(281);

var _createBrowserHistory = __webpack_require__(136);

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _actions = __webpack_require__(42);

var _siteDetail = __webpack_require__(282);

var _siteDetail2 = _interopRequireDefault(_siteDetail);

var _siteCategory = __webpack_require__(382);

var _siteCategory2 = _interopRequireDefault(_siteCategory);

var _appHeader = __webpack_require__(1872);

var _appHeader2 = _interopRequireDefault(_appHeader);

var _contentDetail = __webpack_require__(1873);

var _contentDetail2 = _interopRequireDefault(_contentDetail);

var _reactRedux = __webpack_require__(41);

var _materialUi = __webpack_require__(70);

var _appData = __webpack_require__(157);

var _appData2 = _interopRequireDefault(_appData);

var _colors = __webpack_require__(58);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var recentsIcon = _react2.default.createElement(
    _materialUi.FontIcon,
    { className: "material-icons" },
    "restore"
);
var favoritesIcon = _react2.default.createElement(
    _materialUi.FontIcon,
    { className: "material-icons" },
    "favorite"
);

// @autoState()
var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: "componentDidMount",
        value: function componentDidMount() {
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
            console.log("Event");
            // this.props.getTitle();
        }
    }, {
        key: "render",
        value: function render() {
            var me = this;
            // console.log('app title:',me.props.list)
            return _react2.default.createElement(
                _reactRouter.Router,
                { key: Math.random(), history: (0, _createBrowserHistory2.default)() },
                _react2.default.createElement(
                    "div",
                    { style: { display: 'flex', lineHeight: '150%', flexDirection: 'column', height: '100vh' } },
                    _react2.default.createElement(_appHeader2.default, null),
                    _react2.default.createElement(
                        "div",
                        { style: { flex: 1, overflowY: 'scroll', backgroundColor: _colors.darkBlack, color: _colors.white } },
                        _react2.default.createElement(_reactRouter.Route, { exact: true, path: "/", component: _home2.default }),
                        _react2.default.createElement(_reactRouter.Route, { path: "/site/:id", component: _siteDetail2.default }),
                        _react2.default.createElement(_reactRouter.Route, { path: "/site-category/:siteId/:name/:url", component: _siteCategory2.default }),
                        _react2.default.createElement(_reactRouter.Route, { path: "/content-detail/:siteId/:name/:url", component: _contentDetail2.default })
                    )
                )
            );
        }
    }]);

    return App;
}(_react2.default.Component);
//
// const mapStateToProps = (state, ownProps) => {
//     return {
//         // siteLoaded:state.sites.loaded,
//         // menuClick:state.app.click,
//         // title:state.app.title,
//         // icon:state.app.icon,
//     };
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         // setSiteList:(lst)=>dispatch(setSiteList(lst)),
//     }
// };


exports.default = (0, _reactRedux.connect)()(App);

/***/ })

},[384]);