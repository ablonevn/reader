import React from 'react';
import {connect} from "react-redux";

import {cachedFetch, setAppTitle, setSiteDetailList, setSiteList} from "./actions";
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
        this.props.setTitle(fo.name + " - " + n);
    }

    componentDidMount() {
        if (this.props.listSites.length == 0) {
            cachedFetch('/sites').then((res) => {
                this.props.setSiteList(res);
                this.updateTitle(res);
            });
        } else {
            this.updateTitle(this.props.listSites)
        }

    }

    render() {


        return (
            <div>
                {/*{this.props.lstDetail.map((item,idx)=>{*/}
                {/*return (*/}
                {/*<ListItem key={idx}*/}
                {/*leftAvatar={<Avatar icon={<FileFolder />} />}*/}
                {/*rightIcon={<ActionInfo />}*/}
                {/*primaryText={item.text}*/}
                {/*onClick= {() => {*/}
                {/*// context.history.push === history.push*/}
                {/*this.props.history.push('/site-category/'+state.lastDetail+'/'+$.param({1:item.link}).split('=')[1])*/}
                {/*}}*/}
                {/*secondaryText={item.link}*/}
                {/*/>*/}

                {/*)*/}
                {/*})}*/}


            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        listSites: state.sites.list,
        // lstDetail:state.app.siteDetail.list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSiteList: (lst) => dispatch(setSiteList(lst)),
        // setSiteDetailList:(list)=>dispatch(setSiteDetailList(list)),
        setTitle: (data) => dispatch(setAppTitle("" + data || "")),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteCategory);