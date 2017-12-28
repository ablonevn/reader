import * as React from 'react';
import {connect} from "react-redux";

import {cachedFetch, encodeHex, setAppIcon, setAppTitle, setDocumentList, setSiteList} from "./actions";
import {ListItem, RaisedButton, Toolbar, ToolbarGroup} from "material-ui";
import {ActionInfo, FileFolder} from "material-ui/svg-icons/index";
import Paging from "./paging";
// import {Subject} from "rxjs";


// let loaded=[];
class SiteCategory extends React.Component<any,any> {
    private site: any;
    private el: any;
    private documentList: any;
    private height: number;
    private limit: any;


    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            startPos: 0,
            limit:1,
            items: [],
            fetchItem:false,
            lastDetail: -1,
            rows:[],
            docList:[],
            postList:[]
        };

    }

    updateTitle(lst) {
        var fo = lst.filter((site) => this.props.match.params.siteId == site.id)[0];
        var n = this.props.match.params.name.split("-").map(o => String.fromCharCode(parseInt(o, 16))).join("");
        this.site = fo;
        this.props.setTitle(fo.name + " - " + n);
    }

    getDocumentList() {

        return cachedFetch('/doc-list/' + this.site.id + "/" + this.props.match.params.url).then((res) => {

            return this.documentList=res.data;
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
        this.height = $(this.el).parent().height()-56;
        // debugger;
        // if (this.props.listSites.length == 0) {
            cachedFetch('/sites').then((res) => {
                // debugger;
                //this.props.setSiteList(res);

                this.updateTitle(res);
                this.getDocumentList().then(res=>{
                    this.setState(Object.assign( {},this.state,{
                        height:this.height,
                        docList:res
                    }));
                });
            });
        // } else {
        //     // debugger;
        //     this.updateTitle(this.props.listSites);
        //     this.getDocumentList();
        // }
        // state.me=this;



    }
    renderItem(item,idx){
        // this.limit=limit;


        return <ListItem

            key={idx}
            // leftAvatar={<Avatar icon={<FileFolder/>}/>}
            // rightIcon={<ActionInfo/>}
            primaryText={item.title}
            onClick={() => {
                // context.history.push === history.push
                this.props.history.push('/content-detail/' + this.props.match.params.siteId + '/' + this.props.match.params.name + "/" + encodeHex(item.link))
            }}
            secondaryText={item.link||" "}
        />
    }
    setLimit(limit){
        this.limit=limit;
        // console.log(this,limit);
    }
    doNext(){
        // console.log("limit item",state.limit);
        if (this.state.startPos+this.limit<this.state.docList.length) {


            var n={
                startPos:this.state.startPos,
                postList:this.state.postList
            };
            n.postList.push(n.startPos);
            n.startPos=n.startPos+this.limit;


            this.setState(Object.assign({},this.state,n));
        }
    }
    doPrev(){
         if (this.state.startPos>0) {
             var p=this.state.postList.pop()||0;

             var n={
                 startPos:p,
                 postList:this.state.postList
             };
             this.setState(Object.assign({},this.state,n));
         }
    }

    render() {
        console.log("render");

        var first=<span></span>
        var last=<span></span>
        if (this.state.startPos>0) {

            first=(
                <ToolbarGroup firstChild={true}>
                    <RaisedButton label="Prev" onClick={()=>this.doPrev()} primary={true}/>
                </ToolbarGroup>
            )
        }
        // if (this.state.startPos+this.state.limit>0) {
        //
        // }
        return (

            <div style={{'display': 'flex', 'flexDirection': 'column'}} ref={el => this.el = el}>
                <div style={{height:this.state.height}}>
                    <Paging startPos={this.state.startPos} height={this.state.height} rows={this.state.docList} renderItem={(it,idx)=>this.renderItem(it,idx)} callback={(limit)=>this.setLimit(limit)} />
                </div>
                <Toolbar>
                    {first}

                    <ToolbarGroup lastChild={true}>

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
        // docList: state.doc.list
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