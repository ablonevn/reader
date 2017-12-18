import React from 'react';
import {connect} from "react-redux";

import {
    cachedFetch,
    setAppIcon,
    setAppTitle,
    setSiteDetailList,
    setSiteList,
    setDocumentList,
    encodeHex
} from "./actions";
import {Avatar, FontIcon, ListItem, RaisedButton, Toolbar, ToolbarGroup, ToolbarTitle} from "material-ui";
import {ActionInfo, FileFolder} from "material-ui/svg-icons/index";
import {Subject} from "rxjs";

import Paging from "./paging";


let state = {
    height: 0,
    startPos: 0,
    limit:1,
    items: [],
    fetchItem:false,
    lastDetail: -1
};

// let loaded=[];
class SiteCategory extends React.Component {


    constructor(props) {
        super(props);
        state = {
            height: 0,
            startPos: 0,
            limit:1,
            items: [],
            fetchItem:false,
            lastDetail: -1,
            rows:[],

        };
        this.state = {
            height: 0
        }
        //     // this.title=new Subject();
        //     // this.title.subscribe((text)=>this.props.setTitle(text))
        //
    }

    updateTitle(lst) {
        var fo = lst.filter((site) => this.props.match.params.siteId == site.id)[0];
        var n = this.props.match.params.name.split("-").map(o => String.fromCharCode(parseInt(o, 16))).join("");
        this.site = fo;
        this.props.setTitle(fo.name + " - " + n);
    }

    getDocumentList() {

        cachedFetch('/doc-list/' + this.site.id + "/" + this.props.match.params.url).then((res) => {

            this.props.setDocList(res.data);
            // state.items = res.data.slice(state.startPos, 1);
            // state=Object.assign({},state,{fetchItem:true,limit:1});
            // this.setState(state);
            //
            // console.log('items:', state.items);
        });
    }


    componentDidMount() {
        this.props.setAppIcon({
            icon: "keyboard_arrow_left",
            click: this.props.history.goBack
        });
        if (this.props.listSites.length == 0) {
            cachedFetch('/sites').then((res) => {
                // debugger;
                this.props.setSiteList(res);
                this.updateTitle(res);
                this.getDocumentList();
            });
        } else {
            // debugger;
            this.updateTitle(this.props.listSites);
            this.getDocumentList();
        }
        state.me=this;
        state.height = $(this.el).parent().height()-56;


    }
    renderItem(item,idx,limit){
        state.limit=limit;


        return <ListItem

            key={idx}
            // leftAvatar={<Avatar icon={<FileFolder/>}/>}
            // rightIcon={<ActionInfo/>}
            primaryText={item.title}
            onClick={() => {
                // context.history.push === history.push
                state.me.props.history.push('/content-detail/' + state.me.props.match.params.siteId + '/' + state.me.props.match.params.name + "/" + encodeHex(item.link))
            }}
            secondaryText={item.link||" "}
        />
    }
    doNext(){
        console.log("limit item",state.limit);
        if (state.startPos+state.limit<this.props.docList.length) {
            state.startPos=state.startPos+state.limit;
            this.setState(Object.assign({},state));
        }
    }
    doPrev(){
        //console.log("limit item",state.limit);
        if (state.startPos-state.limit>=0) {
            state.startPos=state.startPos-state.limit;
            this.setState(Object.assign({},state));
        }
    }

    render() {



        return (

            <div style={{'display': 'flex', 'flexDirection': 'column'}} ref={el => this.el = el}>
                <div style={{height:state.height}}>
                    <Paging startPos={state.startPos} height={state.height} rows={this.props.docList} renderItem={this.renderItem} />
                </div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>

                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarTitle text="Options"/>
                        <FontIcon className="muidocs-icon-custom-sort"/>
                        <RaisedButton label="Prev" onClick={()=>this.doPrev()} primary={true}/>

                        <RaisedButton label="Next" onClick={()=>this.doNext()} primary={true}/>

                    </ToolbarGroup>
                </Toolbar>
            </div>

        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        listSites: state.sites.list,
        docList: state.doc.list
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

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteCategory);