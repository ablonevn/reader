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
import {Avatar, ListItem, RaisedButton, Toolbar, ToolbarGroup} from "material-ui";
import {ActionInfo, FileFolder} from "material-ui/svg-icons/index";
// import {Subject} from "rxjs";
import Paging from './paging';

let state = {
    height: 0,
    startPos: 0,
    limit: 1,
    items: [],
    fetchItem: false,
    lastDetail: -1
};
var heightRow=new Promise(resolve => $(function(){

    $('body').append('<div id="doc-sample" class="doc-content" style="padding: 10px;display: block;line-height: 150%">Agh</div>');
    resolve({el:$('#doc-sample'),h:$('#doc-sample').height()+1});
})).catch((err)=>console.log(err));
var canvas =  document.createElement("canvas");

// let loaded=[];
class ContentDetail extends React.Component {


    constructor(props) {
        super(props);
        this.resetState();
        state.height = 0;
        state.changed=false;
        this.isFirst=true;

    }

    resetState() {
        state = Object.assign({}, state, {

            startPos: 0,
            limit: 1,
            items: [],
            fetchItem: false,
            mapItems:[]

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
    getFitLine(sample,h,arr) {
        var lst=[];
        var lstr=[];
        var w=$(window).width()-40;
        arr.filter(r=>r!="")
            .map(r=>{
            lstr.push(r);
            var text=lstr.join(" ");
            if (this.getTextWidth(text)>=w) {
                // debugger;
                lstr.pop();
                // sample.text(lstr.join(" "));
                // debugger;
                lst.push(lstr.join(" "));
                lstr=[r];
            }
            // sample.text();
            // if (lstr.length<=2) {
            //     // h=$(sample).height();
            //
            // }
            // //console.log($(sample).width(),"==========",$(window).width());
            // if (sample.height()>h) {
            //
            // }
        });
        if (lstr.length) {
            lst.push(lstr.join(" "));
        }
        return lst;

    }

    componentWillReceiveProps(newProps) {
        this.mprops = newProps;
        var changed=false;
        // debugger;
        if (newProps.location && (this.oldLocaltion != newProps.location.pathname)) {

            this.oldLocaltion = newProps.location.pathname;
            this.resetState();
            this.getContentList();
            changed=true;
            this.setState(Object.assign({}, state));
        }
        if (this.mprops.contentList.length) {
            if (this.isFirst || changed) {
                // console.log(this.isFirst,changed);

                this.isFirst=false;
                heightRow.then((rsa)=>{

                    var newRows=this.mprops.contentList.map(row=>{
                        var lst=[];
                        var strs=(row||"").replace(/[\r\n\t]/gi,"").split(' ');
                        if (strs.length) {
                            // debugger;
                            lst=this.getFitLine(rsa.el,rsa.h,strs);
                        }
                        return lst;
                    });
                    // debugger;
                    state.mapItems=[].concat.apply([],newRows);
                    this.setState(Object.assign( {},state));
                })
            }

        }



    }

    getContentList() {
        this.next = null;
        this.prev = null;
        this.mprops = this.mprops || this.props;
        var url='/doc-content/' + this.site.id + "/" + this.mprops.match.params.name + "/" + this.mprops.match.params.url;
        fetch('/save',{
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:this.site.id,
                url:'/content-detail/' + this.site.id + "/" + this.mprops.match.params.name + "/" + this.mprops.match.params.url,
                name: decodeHex(this.mprops.match.params.name)
            })
        }).then(r=>r);

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
        console.log("limit item", state.limit);
        if (state.startPos + state.limit < this.props.contentList.length) {
            state.startPos = state.startPos + state.limit;
            this.setState(Object.assign({}, state));
        } else {
            // debugger;
            if (this.next) {
                this.props.history.replace('/content-detail/' + this.site.id + "/" + this.props.match.params.name + "/" + encodeHex(this.next));
                // this.getContentList();
            }
        }
    }

    doPrev() {
        //console.log("limit item",state.limit);
        if (state.startPos - state.limit >= 0) {
            state.startPos = state.startPos - state.limit;
            this.setState(Object.assign({}, state));
        }else {
            // debugger;
            if (this.prev) {
                this.props.history.replace('/content-detail/' + this.site.id + "/" + this.props.match.params.name + "/" + encodeHex(this.prev));
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
        state.height = $(this.el).parent().height() - 56 - 20;
        // console.log(state.height);
        this.setState(Object.assign({}, state));


    }

    renderItem(item, idx, limit) {
        state.limit = limit;


        return <div key={idx}>{item}</div>

    }

    render() {


        return (
            <div ref={el => this.el = el}>
                <div style={{padding: '10px 0px 10px 10px', height: state.height}}>
                    <Paging startPos={state.startPos} height={state.height} rows={state.mapItems}
                            renderItem={this.renderItem}/>
                </div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <RaisedButton label="Prev" onClick={() => this.doPrev()} primary={true}/>
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true}>
                        <RaisedButton label="Next" onClick={() => this.doNext()} primary={true}/>

                    </ToolbarGroup>
                </Toolbar>
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