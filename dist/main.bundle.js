webpackJsonp([1],{

/***/ 1574:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(65);

var _actions = __webpack_require__(66);

var _materialUi = __webpack_require__(92);

var _index = __webpack_require__(155);

var _rxjs = __webpack_require__(278);

var _reactHeight = __webpack_require__(1867);

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

        return _possibleConstructorReturn(this, (SiteDetail.__proto__ || Object.getPrototypeOf(SiteDetail)).call(this, props));
        // this.isLast=false;
        // this.iconDone=false;
        // this.state = {
        //     limit: 1,
        //     height: 0,
        // };
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
            state.inst.props.history.goBack();
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

/***/ 1869:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(65);

var _actions = __webpack_require__(66);

var _materialUi = __webpack_require__(92);

var _index = __webpack_require__(155);

var _rxjs = __webpack_require__(278);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var state = {

    lastDetail: -1
};

// let loaded=[];

var SiteCategory = function (_React$Component) {
    _inherits(SiteCategory, _React$Component);

    function SiteCategory() {
        _classCallCheck(this, SiteCategory);

        return _possibleConstructorReturn(this, (SiteCategory.__proto__ || Object.getPrototypeOf(SiteCategory)).apply(this, arguments));
    }

    _createClass(SiteCategory, [{
        key: "updateTitle",


        // constructor(props) {
        //     super(props);
        //     // this.title=new Subject();
        //     // this.title.subscribe((text)=>this.props.setTitle(text))
        //
        // }
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
                // debugger;
                _this3.props.setDocList(res.data);
                console.log(res.data);
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
            console.log($(this.el).height());
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            return _react2.default.createElement(
                "div",
                { style: { 'height': '100vh' }, ref: function ref(el) {
                        return _this5.el = el;
                    } },
                this.props.docList.map(function (item, idx) {
                    return _react2.default.createElement(_materialUi.ListItem, {

                        key: idx
                        // leftAvatar={<Avatar icon={<FileFolder/>}/>}
                        // rightIcon={<ActionInfo/>}
                        , primaryText: item.title,
                        onClick: function onClick() {
                            // context.history.push === history.push
                            _this5.props.history.push('/content-detail/' + _this5.props.match.params.siteId + '/' + _this5.props.match.params.name + "/" + (0, _actions.encodeHex)(item.link));
                        },
                        secondaryText: item.link
                    });
                })
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

/***/ 1870:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _home = __webpack_require__(490);

var _home2 = _interopRequireDefault(_home);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(1573);

var _createBrowserHistory = __webpack_require__(207);

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _actions = __webpack_require__(66);

var _siteDetail = __webpack_require__(1574);

var _siteDetail2 = _interopRequireDefault(_siteDetail);

var _siteCategory = __webpack_require__(1869);

var _siteCategory2 = _interopRequireDefault(_siteCategory);

var _reactRedux = __webpack_require__(65);

var _materialUi = __webpack_require__(92);

var _appData = __webpack_require__(273);

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
                iconElementRight: _react2.default.createElement(_materialUi.FlatButton, { label: "Save" })
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

/***/ 1871:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1875:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(65);

var _actions = __webpack_require__(66);

var _materialUi = __webpack_require__(92);

var _index = __webpack_require__(155);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import {Subject} from "rxjs";

var state = {

    lastDetail: -1
};

// let loaded=[];

var ContentDetail = function (_React$Component) {
    _inherits(ContentDetail, _React$Component);

    function ContentDetail() {
        _classCallCheck(this, ContentDetail);

        return _possibleConstructorReturn(this, (ContentDetail.__proto__ || Object.getPrototypeOf(ContentDetail)).apply(this, arguments));
    }

    _createClass(ContentDetail, [{
        key: "updateTitle",


        // constructor(props) {
        //     super(props);
        //     // this.title=new Subject();
        //     // this.title.subscribe((text)=>this.props.setTitle(text))
        //
        // }
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
        key: "getContentList",
        value: function getContentList() {
            var _this3 = this;

            (0, _actions.cachedFetch)('/doc-content/' + this.site.id + "/" + this.props.match.params.name + "/" + this.props.match.params.url).then(function (res) {
                // debugger;
                _this3.props.setContentList(res.data);
                _this3.title = res.title;
                _this3.updateTitle();
                console.log(res.data);
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
            this.title = "";
            if (this.props.listSites.length == 0) {
                (0, _actions.cachedFetch)('/sites').then(function (res) {
                    // debugger;
                    _this4.props.setSiteList(res);
                    _this4.updateTitle(res);
                    _this4.getContentList();
                });
            } else {
                // debugger;
                this.updateTitle();
                this.getContentList();
            }
        }
    }, {
        key: "render",
        value: function render() {

            return _react2.default.createElement(
                "div",
                null,
                this.props.contentList.map(function (o, idx) {
                    return _react2.default.createElement(
                        "p",
                        { key: idx },
                        o
                    );
                })
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

/***/ 273:
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

/***/ 376:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(20);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MuiThemeProvider = __webpack_require__(178);

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _reactRedux = __webpack_require__(65);

var _redux = __webpack_require__(134);

var _reducers = __webpack_require__(487);

var _reducers2 = _interopRequireDefault(_reducers);

var _app = __webpack_require__(489);

var _app2 = _interopRequireDefault(_app);

__webpack_require__(1871);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducers2.default);

_reactDom2.default.render(_react2.default.createElement(
    _MuiThemeProvider2.default,
    null,
    _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_app2.default, null)
    )
), document.getElementById('app'));

/***/ }),

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(134);

var _actions = __webpack_require__(66);

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

/***/ 488:
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

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _home = __webpack_require__(490);

var _home2 = _interopRequireDefault(_home);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(1573);

var _createBrowserHistory = __webpack_require__(207);

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _actions = __webpack_require__(66);

var _siteDetail = __webpack_require__(1574);

var _siteDetail2 = _interopRequireDefault(_siteDetail);

var _siteCategory = __webpack_require__(1869);

var _siteCategory2 = _interopRequireDefault(_siteCategory);

var _appHeader = __webpack_require__(1870);

var _appHeader2 = _interopRequireDefault(_appHeader);

var _contentDetail = __webpack_require__(1875);

var _contentDetail2 = _interopRequireDefault(_contentDetail);

var _reactRedux = __webpack_require__(65);

var _materialUi = __webpack_require__(92);

var _appData = __webpack_require__(273);

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
                    { style: { display: 'flex', flexDirection: 'column', height: '100vh' } },
                    _react2.default.createElement(_appHeader2.default, null),
                    _react2.default.createElement(
                        "div",
                        { style: { flex: 1, overflowY: 'scroll' } },
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

/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(491);

var _materialUi = __webpack_require__(92);

var _index = __webpack_require__(155);

var _reactRedux = __webpack_require__(65);

var _actions = __webpack_require__(66);

var _appData = __webpack_require__(273);

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
            if (this.props.list.length == 0) {
                // this.props.setLoading(true);
                (0, _actions.cachedFetch)('/sites').then(function (res) {
                    return _this2.props.setSiteList(res);
                });
                // this.props.setLoading(false);
            }
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

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = __webpack_require__(488);

Object.keys(_actions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actions[key];
    }
  });
});

/***/ })

},[376]);