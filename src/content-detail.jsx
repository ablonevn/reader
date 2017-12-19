import React from 'react';
import {connect} from "react-redux";
import {decodeHex} from './actions'

import {
    cachedFetch,
    setAppIcon,
    setAppTitle,
    setSiteDetailList,
    setSiteList,
    setDocumentList,
    encodeHex,
    setContentList
} from "./actions";
import Paging from './paging';

let state = {
    height: 0,
    startPos: 0,
    limit: 1,
    items: [],
    fetchItem: false,
    lastDetail: -1
};
var canvas = document.createElement("canvas");


export class ContentDetail extends React.Component {


    constructor(props) {
        super(props);
        this.resetState();
        state.height = 0;
        state.changed = false;
        this.isFirst = true;

    }

    resetState() {
        state = Object.assign({}, state, {

            startPos: 0,
            // limit: 1,
            items: [],
            fetchItem: false,
            mapItems: []

        });
    }

    updateTitle(lst) {
        lst = lst || this.props.listSites;
        var fo = lst.filter((site) => this.props.match.params.siteId == site.id)[0];
        var n = this.props.match.params.name.split("-").map(o => String.fromCharCode(parseInt(o, 16))).join("");
        this.site = fo;
        this.props.setTitle(this.title);
    }

    getTextWidth(text, font) {
        // re-use canvas object for better performance

        var context = canvas.getContext("2d");
        context.font = font || "normal 16px Roboto";
        var metrics = context.measureText(text);
        return metrics.width;
    }

    getTextHeight(text, font) {
        // re-use canvas object for better performance

        var context = canvas.getContext("2d");
        context.font = font || "normal 16px Roboto";
        var metrics = context.measureText(text);
        return 24;
    }

    getFitLine(arr) {
        var lst = [];
        var lstr = [];
        var w = $(window).width() - 20 - 10;
        arr.filter(r => r != "")
            .map(r => {
                lstr.push(r);
                var text = lstr.join(" ");
                if (this.getTextWidth(text) >= w) {
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

    componentWillReceiveProps(newProps) {
        this.mprops = newProps;
        var changed = false;
        // debugger;
        if (newProps.location && (this.oldLocaltion != newProps.location.pathname)) {

            this.oldLocaltion = newProps.location.pathname;
            this.resetState();
            this.getContentList();
            changed = true;
            this.setState(Object.assign({}, state));
        }
        if (this.mprops.contentList.length) {
            //if (this.isFirst || changed) {
            // console.log(this.isFirst,changed);

            // this.isFirst = false;


            var newRows = this.mprops.contentList.map(row => {
                var lst = [];
                var strs = (row || "").replace(/[\r\n\t]/gi, "").split(' ');
                if (strs.length) {
                    // debugger;
                    lst = this.getFitLine(strs);
                }
                return lst;
            });
            // debugger;
            state.mapItems = [].concat.apply([], newRows);
            this.setState(Object.assign({}, state));

            //}

        }


    }

    getContentList() {
        this.next = null;
        this.prev = null;
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
                name: decodeHex(this.mprops.match.params.name)
            })
        }).then(r => r);

        cachedFetch(url).then((res) => {
            // debugger;
            this.props.setContentList(res.data);
            this.next = res.next;
            this.prev = res.prev;
            this.title = res.title;
            this.updateTitle();
            // console.log(res.data);
        });
    }

    doNext() {
        // console.log("limit item", state.limit);
        if (state.startPos + state.limit < state.mapItems.length) {
            state.startPos = state.startPos + state.limit;

        } else {
            // debugger;
            if (this.next) {
                this.props.history.replace('/content-detail/' + this.site.id + "/" + this.mprops.match.params.name + "/" + encodeHex(this.next));
                this.resetState();
                // this.getContentList();
            }
        }
        this.setState(Object.assign({}, state));
    }

    doPrev() {
        //console.log("limit item",state.limit);
        if (state.startPos - state.limit >= 0) {
            state.startPos = state.startPos - state.limit;
            // this.setState(Object.assign({}, state));
        } else {
            // debugger;
            if (this.prev) {
                this.props.history.replace('/content-detail/' + this.site.id + "/" + this.mprops.match.params.name + "/" + encodeHex(this.prev));
                this.resetState();
                // this.getContentList();
            }
        }
        this.setState(Object.assign({}, state));
    }

    componentDidMount() {
        this.props.setAppIcon({
            icon: "keyboard_arrow_left",
            click: this.props.history.goBack
        });
        this.oldLocaltion = this.props.history.location.pathname;
        this.title = "";
        if (this.props.listSites.length == 0) {
            cachedFetch('/sites').then((res) => {
                // debugger;
                this.props.setSiteList(res);
                this.updateTitle(res);
                this.getContentList();
            });
        } else {
            // debugger;
            this.updateTitle();
            this.getContentList();
        }
        let padding=20;
        state.height = $(this.el).parent().height() - padding;
        state.limit = parseInt(state.height / this.getTextHeight('hg'));
        // console.log(state.height);
        this.setState(Object.assign({}, state));


    }

    renderItem(item, idx, limit) {


        return <div key={state.startPos + idx}>{item}</div>

    }

    onClick(event) {
        event.persist();
        // debugger;
        if (event.clientX > $(window).width() / 2) {
            this.doNext();
        } else {
            this.doPrev();
        }
        // console.log(event.clientX,event.clientY);
    }

    render() {


        return (
            <div ref={el => this.el = el}>
                <div style={{padding: '10px 0px 10px 10px', height: state.height}} onClick={evt => this.onClick(evt)}>
                    <Paging startPos={state.startPos} height={state.height} rows={state.mapItems}
                            renderItem={this.renderItem} limit={state.limit}/>
                </div>
                {/*<Toolbar>*/}
                    {/*<ToolbarGroup firstChild={true}>*/}
                        {/*<RaisedButton label="Prev" onClick={() => this.doPrev()} primary={true}/>*/}
                    {/*</ToolbarGroup>*/}
                    {/*<ToolbarGroup lastChild={true}>*/}
                        {/*<RaisedButton label="Next" onClick={() => this.doNext()} primary={true}/>*/}

                    {/*</ToolbarGroup>*/}
                {/*</Toolbar>*/}
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        listSites: state.sites.list,
        contentList: state.content.list
        //docList:state.doc.list
        // lstDetail:state.app.siteDetail.list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSiteList: (lst) => dispatch(setSiteList(lst)),
        setDocList: (lst) => dispatch(setDocumentList(lst)),
        // setSiteDetailList:(list)=>dispatch(setSiteDetailList(list)),
        setTitle: (data) => dispatch(setAppTitle("" + data || "")),
        setAppIcon: (icon) => dispatch(setAppIcon(icon)),
        setContentList: (lst) => dispatch(setContentList(lst))

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ContentDetail);