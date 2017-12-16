
import Home from "./home";
import React from "react";
import {Route, Router} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import {setSiteList} from './actions'
import SiteDetail from './site-detail';
import SiteCategory from './site-category';



import {connect} from "react-redux";

import {
    AppBar, BottomNavigation, BottomNavigationItem, FontIcon, IconButton, Paper,
    RaisedButton
} from 'material-ui';
import appState from "./app-data";


const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;

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
        //console.log("Event");
        // this.props.getTitle();

    }


    render() {
        let me=this;
        // console.log('app title:',me.props.list)
        return (
            <Router key={Math.random()} history={createBrowserHistory()}>
                <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
                    <AppBar
                        title={this.props.title}
                        iconElementLeft={<IconButton onClick={()=>this.props.menuClick(this.props)}><i className="material-icons">{this.props.icon}</i></IconButton>}
                        // onClick={this.props.firstAction}
                        // iconClassNameRight="muidocs-icon-navigation-expand-more"
                        iconElementRight={<div><IconButton><i className="material-icons">settings</i></IconButton></div>}
                    />
                    <div style={{flex: 1, overflowY: 'scroll'}}>
                        <Route exact path="/" component={Home}/>
                        <Route path="/site/:id" component={SiteDetail}/>
                        <Route path="/site-category/:siteId/:name/:url" component={SiteCategory}/>

                    </div>
                    <Paper zDepth={1}>
                        <div>{recentsIcon}{favoritesIcon}</div>


                    </Paper>
                </div>

            </Router>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        // siteLoaded:state.sites.loaded,
        menuClick:state.app.click,
        title:state.app.title,
        icon:state.app.icon,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // setSiteList:(lst)=>dispatch(setSiteList(lst)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);