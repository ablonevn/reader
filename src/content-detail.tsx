import * as React from 'react';
import {connect} from "react-redux";
import {
    cachedFetch, decodeHex, encodeHex, setAppIcon, setAppTitle, setContentList, setDocumentList,
    setSiteList
} from './actions'

// let state = {
//     height: 0,
//     startPos: 0,
//     limit: 1,
//     items: [],
//     fetchItem: false,
//     lastDetail: -1
// };
var canvas = document.createElement("canvas");


class ContentDetail extends React.Component<any, any> {
    private el: any;
    private site: any;
    private height: number;
    private lastRows: string;
    private startPos: number;
    // private items: any[];
    private fetchItem: boolean;
    private mapItems: any[];
    private title: any;
    private next: any;
    private prev: any;
    private oldLocaltion: any;
    private mprops: Readonly<any>;
    private limit: number;
    private lstSites: any[];
    //private contentList: any[];
    private isPrev: any;
    private canUpdate: boolean;


    constructor(props) {
        super(props);
        this.resetState();
        this.height = 0;
        this.lastRows = "";
        this.canUpdate=false;
        this.state={
            mapItems:[]
        }
    }

    resetState() {
        this.startPos = 0;
        // this.items = [];
        this.fetchItem = false;
        this.mapItems = [];



    }

    updateTitle(lst?) {
        lst = lst || this.lstSites;
        var fo = lst.filter((site) => this.props.match.params.siteId == site.id)[0];
        var n = this.props.match.params.name.split("-").map(o => String.fromCharCode(parseInt(o, 16))).join("");
        this.site = fo;
        this.props.setTitle(this.title);
    }

    getTextWidth(text, font?) {
        // re-use canvas object for better performance

        var context = canvas.getContext("2d");
        context.font = font || "normal 16px 'Segoe UI'";
        var metrics = context.measureText(text);
        return metrics.width;
    }

    getTextHeight(text, font?) {
        // re-use canvas object for better performance

        let context = canvas.getContext("2d");
        context.font = font || "normal 16px 'Segoe UI'";
        let metrics = context.measureText(text);
        return 24;
    }

    getFitLine(arr) {
        let lst = [];
        let lstr = [];
        let w = $(window).width() - 20 - 10;
        arr.filter(r => (r || "") !== "")
            .map(r => {
                lstr.push(r);
                let text = lstr.join(" ");
                if (this.getTextWidth(text, null) >= w) {
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
        let newRows = list.map(row => {
            let lst = [];
            let strs = (row || "").replace(/[\r\n\t]/gi, "").split(' ');
            if (strs.length) {
                // debugger;
                lst = this.getFitLine(strs);
            }
            return lst;
        });
        // debugger;
        this.mapItems = [].concat.apply([], newRows).filter(m => (m || "") !== "");
    }

    componentWillReceiveProps(newProps) {
        this.mprops = newProps;
        this.canUpdate=false;

        if (newProps.location && (this.oldLocaltion != newProps.location.pathname)) {

            this.oldLocaltion = newProps.location.pathname;
            this.resetState();
            debugger;
            this.getContentList().then((lst)=>{
                // console.log("get content in rec props");
                this.buildRow(lst);
                if (this.isPrev) {
                    this.isPrev = false;
                    let pages = parseInt(((this.mapItems.length + this.limit - 1) / this.limit)+"");
                    this.startPos = (pages - 1) * this.limit;
                }
                this.doRender();
            });
            // changed = true;
            // this.setState(Object.assign({}, state));
        }



    }

     getContent() {
        console.log("get content called");

        this.mprops = this.mprops || this.props;
        let url = '/doc-content/' + this.site.id + "/" + this.mprops.match.params.name + "/" + this.mprops.match.params.url;
        let hd = new Headers();
        hd.set('Accept','application/json');
        hd.set('Content-Type', 'application/json');


        fetch('/save', {
            method: 'post',
            headers: hd,
            body: JSON.stringify({
                id: this.site.id,
                url: '/content-detail/' + this.site.id + "/" + this.mprops.match.params.name + "/" + this.mprops.match.params.url,
                name: decodeHex(this.mprops.match.params.name)
            })
        });

        return cachedFetch(url).then((res) => {
            // debugger;

            this.next = res.next;
            this.prev = res.prev;
            this.title = res.title;
            if (res.next) cachedFetch('/doc-content/' + this.site.id + "/" + this.mprops.match.params.name + "/" + encodeHex(res.next)); // cache next page
            if (res.prev) cachedFetch('/doc-content/' + this.site.id + "/" + this.mprops.match.params.name + "/" + encodeHex(res.prev)); // cache prev page
            this.updateTitle();
            console.log(res.data);
            return res;
        });
    }


    getContentList() {
        this.canUpdate=false;
        //if (this.isFirst) {
        this.next = null;
        this.prev = null;
        return this.getContent().then((res) => {

            return res.data;
        });
        // this.isFirst = false;
        //}


    }

    doNext() {
        this.canUpdate=true;
        if (this.startPos + this.limit < this.mapItems.length) {
            this.startPos = this.startPos + this.limit;
            this.setState(Object.assign({}, this.state));
        } else {
            if (this.next) {
                this.props.history.replace('/content-detail/' + this.site.id + "/" + this.mprops.match.params.name + "/" + encodeHex(this.next));

            }
        }

    }

    doPrev() {
        this.canUpdate=true;
        if (this.startPos - this.limit >= 0) {
            this.startPos = this.startPos - this.limit;
            this.setState(Object.assign({}, this.state));
        } else {
            if (this.prev) {
                this.isPrev = true;
                this.props.history.replace('/content-detail/' + this.site.id + "/" + this.mprops.match.params.name + "/" + encodeHex(this.prev));
            }
        }

    }

    doRender(){

        if (!this.mapItems) return;
        if (this.mapItems.length==0) return;
        let js = JSON.stringify(this.mapItems);
        if (js !== this.lastRows) {
            this.lastRows=js;
            console.log(this.lastRows==js,"rrrrrrrr");
            this.setState(Object.assign({}, this.state,{
                mapItems:this.mapItems
            }));
        }

    }


    componentDidMount() {

        this.props.setAppIcon({
            icon: "keyboard_arrow_left",
            click: this.props.history.goBack
        });
        // debugger;
        this.oldLocaltion = this.props.history.location.pathname;
        this.title = "";
        let padding = 20;
        this.height = $(this.el).parent().height() - padding;
        this.limit = parseInt((this.height / this.getTextHeight('hg')) + "");
// return;
        // new Promise(resolve=>{

            cachedFetch('/sites').then((res) => {
                // debugger;
                this.lstSites = res;
                this.updateTitle(res);
                this.getContentList()
                    .then((lst)=>{
            //             // console.log("get content in did mount");
                        this.buildRow(lst);
                        this.doRender()
                    });
            });
// console.log("xxxxxxxxxxxxx");

            // console.log(state.height);


        // }).then(()=>{
        //     this.doRender()
        // });

        // return 0;


    }


    onClick(event) {
        event.persist();
        if (event.clientX > $(window).width() / 2) {
            this.doNext();
        } else {
            this.doPrev();
        }

    }

    render() {
        console.log("render called");
        let paging = <div/>;

        if (this.state.mapItems && this.state.mapItems.length) {
            // console.log("render changed",state.mapItems,state.startPos , state.limit);
            let items = this.state.mapItems.slice(this.startPos, this.startPos + this.limit);
            paging =
                <div style={{padding: '10px 0px 10px 10px', height: this.height}} onClick={evt => this.onClick(evt)}>
                    {items.map((item, idx) => <div key={this.startPos + idx}>{item}</div>)}

                </div>

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
        // listSites: state.sites.list,
        // contentList: state.content.list
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