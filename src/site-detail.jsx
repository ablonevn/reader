import React from 'react';
import {connect} from "react-redux";

import {cachedFetch, setAppTitle, setSiteDetailList, setSiteList, setAppIcon, SET_SITE_LOADING} from "./actions";
import {Avatar, ListItem} from "material-ui";
import {ActionInfo, FileFolder} from "material-ui/svg-icons/index";
import {Subject} from "rxjs";
import {ReactHeight} from "react-height";

let state = {
    first: true,
    lastDetail: -1,
    inst: null
};

// let loaded=[];
class SiteDetail extends React.Component {


    constructor(props) {
        super(props);
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

    componentWillMount() {
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

    incItems(height) {
        let h = $(this.el).parent().height();
        if (height == 0) return;
        if (this.isLast) return;
        if ((height < h)) {
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

    componentDidMount() {

        console.log("render site detail");
        this.props.setAppIcon({
            icon:"keyboard_arrow_left",
            click:this.props.history.goBack
        });

        let params = this.props.match.params;
        cachedFetch('/site-detail/' + params.id).then((res) => this.props.setSiteDetailList(res.data));
        if ((this.props.listSites.length == 0) ) {
            // this.props.setLoading(true);
            cachedFetch('/sites').then((res) => {
                var fo = res.filter((o) => o.id == params.id)[0];
                // console.log('name',fo)
                this.props.setTitle(fo.name);
                this.props.setSiteList(res)
            });
            // this.props.setLoading(false);

        } else {
            var fo = this.props.listSites.filter((o) => o.id == params.id)[0];
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

    goBack(props) {

        // console.log("click click");
        state.inst.props.history.goBack();


    }

    norm(text) {
        var arr = text.split('').map(function (c) {
            return c.charCodeAt(0).toString(16);
        });
        return arr.join("-");
    }

    render() {

// console.log(this.props.lstDetail);

        return (
            <div ref={(el) => this.el = el}>
                {/*<ReactHeight onHeightReady={height => this.incItems(height)}>*/}

                    {this.props.lstDetail.map((item, idx) => {
                        // if (idx + 1 > this.state.limit) return;
                        return (
                            <ListItem

                                key={idx}
                                leftAvatar={<Avatar icon={<FileFolder/>}/>}
                                rightIcon={<ActionInfo/>}
                                primaryText={item.text}
                                onClick={() => {
                                    // context.history.push === history.push
                                    this.props.history.push('/site-category/' + this.props.match.params.id + '/' + this.norm(item.text) + '/' + this.norm(item.link))
                                }}
                                secondaryText={item.link}
                            />

                        )
                    })}


                {/*</ReactHeight>*/}
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.sites.loading,
        listSites: state.sites.list,
        lstDetail: state.app.siteDetail.list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSiteList: (lst) => dispatch(setSiteList(lst)),
        setSiteDetailList: (list) => dispatch(setSiteDetailList(list)),
        setTitle: (data) => dispatch(setAppTitle("Site detail " + data || "")),
        setAppIcon: (icon) => dispatch(setAppIcon(icon)),
        setLoading: (state) => dispatch({type: SET_SITE_LOADING, state: state})

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteDetail);