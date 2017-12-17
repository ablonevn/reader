import React from 'react';
import {connect} from "react-redux";

import {cachedFetch, setAppIcon, setAppTitle, setSiteDetailList, setSiteList,setDocumentList,encodeHex,setContentList} from "./actions";
import {Avatar, ListItem} from "material-ui";
import {ActionInfo, FileFolder} from "material-ui/svg-icons/index";
// import {Subject} from "rxjs";

let state = {

    lastDetail: -1
};

// let loaded=[];
class ContentDetail extends React.Component {


    // constructor(props) {
    //     super(props);
    //     // this.title=new Subject();
    //     // this.title.subscribe((text)=>this.props.setTitle(text))
    //
    // }
    updateTitle(lst) {
        var fo = lst.filter((site) => this.props.match.params.siteId == site.id)[0];
        var n = this.props.match.params.name.split("-").map(o => String.fromCharCode(parseInt(o, 16))).join("");
        this.site=fo;
        this.props.setTitle(fo.name + " - " + n);
    }
    getContentList() {

        cachedFetch('/doc-content/'+this.site.id+"/"+this.props.match.params.name+"/"+this.props.match.params.url).then((res) => {
            // debugger;
            this.props.setContentList(res.data);
            console.log(res.data);
        });
    }

    componentDidMount() {
        this.props.setAppIcon({
            icon:"keyboard_arrow_left",
            click:this.props.history.goBack
        });
        if (this.props.listSites.length == 0) {
            cachedFetch('/sites').then((res) => {
                // debugger;
                this.props.setSiteList(res);
                this.updateTitle(res);
this.getContentList();
            });
        } else {
            // debugger;
            this.updateTitle(this.props.listSites);
            this.getContentList();
        }



    }

    render() {


        return (
            <div>
                {this.props.contentList.map((o,idx)=>{
                    return <p>{o}</p>
                })}
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        listSites: state.sites.list,
        contentList:state.content.list
        //docList:state.doc.list
        // lstDetail:state.app.siteDetail.list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSiteList: (lst) => dispatch(setSiteList(lst)),
        setDocList:(lst)=>dispatch(setDocumentList(lst)),
        // setSiteDetailList:(list)=>dispatch(setSiteDetailList(list)),
        setTitle: (data) => dispatch(setAppTitle("" + data || "")),
        setAppIcon: (icon) => dispatch(setAppIcon(icon)),
        setContentList:(lst)=>dispatch(setContentList(lst))

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentDetail);