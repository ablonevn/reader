import React from 'react';
import {connect} from "react-redux";
import {
    cachedFetch, decodeHex, encodeHex, setAppIcon, setAppTitle, setContentList, setDocumentList,
    setSiteList
} from './actions'

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
        state.lastRows="";
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
        context.font = font || "normal 16px 'Segoe UI'";
        var metrics = context.measureText(text);
        return metrics.width;
    }

    getTextHeight(text, font) {
        // re-use canvas object for better performance

        var context = canvas.getContext("2d");
        context.font = font || "normal 16px 'Segoe UI'";
        var metrics = context.measureText(text);
        return 24;
    }

    getFitLine(arr) {
        var lst = [];
        var lstr = [];
        var w = $(window).width() - 20 - 10;
        arr.filter(r => (r||"") !== "")
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
    buildRow(list) {
        var newRows = list.map(row => {
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
        var js=JSON.stringify(this.mprops.contentList);
        if (this.mprops.contentList.length && (js!==state.lastRows) ) {
            // console.log("props changed");
            state.lastRows=js;

            //if (this.isFirst || changed) {
            // console.log(this.isFirst,changed);

            // this.isFirst = false;


            this.buildRow(this.mprops.contentList);

            if (this.isPrev) {
                this.isPrev=false;
                var pages=parseInt((state.mapItems.length+state.limit-1)/state.limit);
                state.startPos=(pages-1)*state.limit;
            }
            this.setState(Object.assign({}, state));
            // console.log("update ",state.mapItems.length);


            //}

        }


    }

    getContent(){
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
                name: decodeHex(this.mprops.match.params.name)
            })
        }).then(r => r);

        return cachedFetch(url).then((res) => {
            // debugger;

            this.next = res.next;
            this.prev = res.prev;
            this.title = res.title;
            if (res.next) cachedFetch('/doc-content/' + this.site.id + "/" + this.mprops.match.params.name + "/"+encodeHex(res.next)); // cache next page
            if (res.prev) cachedFetch('/doc-content/' + this.site.id + "/" + this.mprops.match.params.name + "/"+encodeHex(res.prev)); // cache prev page
            this.updateTitle();
            // console.log(res.data);
            return res;
        });
    }


    getContentList() {
        //if (this.isFirst) {
            this.next = null;
            this.prev = null;
            this.getContent().then((res)=>this.props.setContentList(res.data));
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

    doNext() {
        // console.log("limit item", state.limit);
        if (state.startPos + state.limit < state.mapItems.length) {
            state.startPos = state.startPos + state.limit;
            // console.log(state.startPos);
            this.setState(Object.assign({}, state));
        } else {
            // debugger;
            if (this.next) {
                // this.isPrev=false;
                this.props.history.replace('/content-detail/' + this.site.id + "/" + this.mprops.match.params.name + "/" + encodeHex(this.next));
                // this.resetState();
                // this.getContent().then(res=>{
                //     this.buildRow(res.data);
                //     // this.setState(Object.assign({}, state));
                // })
                // this.getContentList();
            }
        }

    }

    doPrev() {
        //console.log("limit item",state.limit);
        if (state.startPos - state.limit >= 0) {
            state.startPos = state.startPos - state.limit;
            this.setState(Object.assign({}, state));
        } else {
            // debugger;
            if (this.prev) {
                this.isPrev=true;
                this.props.history.replace('/content-detail/' + this.site.id + "/" + this.mprops.match.params.name + "/" + encodeHex(this.prev));
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
        var paging=<div/>;
        if (state.mapItems && state.mapItems.length) {
            // console.log("render changed",state.mapItems,state.startPos , state.limit);
            var items=state.mapItems.slice(state.startPos, state.startPos + state.limit);
            paging=
                <div style={{padding: '10px 0px 10px 10px', height: state.height}} onClick={evt => this.onClick(evt)}>
                    {items.map((item,idx)=><div key={state.startPos + idx}>{item}</div>)}

            </div>;

        } else {
            // console.log("render blank");
            // return (<div ref={el => this.el = el}></div>)
            //<Paging startPos={state.startPos} height={state.height} rows={state.mapItems}
            //renderItem={this.renderItem} limit={state.limit}/>
        }
        return (
            <div ref={el => this.el = el}>
                {paging}
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