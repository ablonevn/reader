import React from 'react';
import {connect} from "react-redux";

import {cachedFetch, setAppIcon, setAppTitle, setSiteDetailList, setSiteList,setDocumentList,encodeHex} from "./actions";
import {Avatar, ListItem} from "material-ui";
import {ActionInfo, FileFolder} from "material-ui/svg-icons/index";
import {Subject} from "rxjs";

let state = {

    lastDetail: -1
};

// let loaded=[];
class SiteCategory extends React.Component {


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
    getDocumentList() {

        cachedFetch('/doc-list/'+this.site.id+"/"+this.props.match.params.url).then((res) => {
            // debugger;
            this.props.setDocList(res.data);
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
                this.getDocumentList();
            });
        } else {
            // debugger;
            this.updateTitle(this.props.listSites);
            this.getDocumentList();
        }
        console.log($(this.el).height());


    }

    render() {


        return (
            <div style={{'height':'100vh'}} ref={el=>this.el=el}>
                {this.props.docList.map((item,idx)=>{
                    return <ListItem

                        key={idx}
                        // leftAvatar={<Avatar icon={<FileFolder/>}/>}
                        // rightIcon={<ActionInfo/>}
                        primaryText={item.title}
                        onClick={() => {
                            // context.history.push === history.push
                            this.props.history.push('/content-detail/' + this.props.match.params.siteId + '/' +this.props.match.params.name+"/"+ encodeHex(item.link))
                        }}
                        secondaryText={item.link}
                    />

                })}
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        listSites: state.sites.list,
        docList:state.doc.list
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

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteCategory);