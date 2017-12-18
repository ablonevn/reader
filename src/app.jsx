
import Home from "./home";
import React from "react";
import {Route, Router} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import {setSiteList} from './actions'
import SiteDetail from './site-detail';
import SiteCategory from './site-category';
import AppHeader from './app-header';
import ContentDetail from './content-detail';



import {connect} from "react-redux";

import {
    AppBar, BottomNavigation, BottomNavigationItem, FontIcon, IconButton, Paper,
    RaisedButton
} from 'material-ui';
import appState from "./app-data";


const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
import {indigo700,grey600,darkBlack,white} from 'material-ui/styles/colors';
// @autoState()
class App extends React.Component {



    componentDidMount(){
        // console.log("aare render")
        // let me=this;
        // if (!this.props.siteLoaded) {
            //this.props.siteLoaded=true;

            // debugger;
        // let params=this.props;
        // if (params) {
        //     // debugger;
        //     fetch('/site-detail/'+params.id).then((response)=>response.json()).then((res)=>this.props.setSiteDetailList(res));
        // }
        // appState.title.subscribe(v=>{
        //     me.state.title=v;
        //     this.setState(me.state);
        // });
        // }
        console.log("Event");
        // this.props.getTitle();

    }


    render() {
        let me=this;
        // console.log('app title:',me.props.list)
        return (
            <Router key={Math.random()} history={createBrowserHistory()}>
                <div style={{display: 'flex',lineHeight:'150%', flexDirection: 'column', height: '100vh'}}>

                    <AppHeader/>
                    <div style={{flex: 1, overflowY: 'scroll',backgroundColor:darkBlack,color:white}}>
                        <Route exact path="/" component={Home}/>
                        <Route path="/site/:id" component={SiteDetail}/>
                        <Route path="/site-category/:siteId/:name/:url" component={SiteCategory}/>
                        <Route path="/content-detail/:siteId/:name/:url" component={ContentDetail}/>

                    </div>

                </div>

            </Router>

        );
    }
}
//
// const mapStateToProps = (state, ownProps) => {
//     return {
//         // siteLoaded:state.sites.loaded,
//         // menuClick:state.app.click,
//         // title:state.app.title,
//         // icon:state.app.icon,
//     };
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         // setSiteList:(lst)=>dispatch(setSiteList(lst)),
//     }
// };
export default connect()(App);