import Home from "./home";
import * as React from 'react';
import {Route, Router} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
// import {setSiteList} from './actions'
import SiteDetail from './site-detail';
import SiteCategory from './site-category';
import ContentDetail from './content-detail';
import AppHeader from './app-header';
import {darkBlack, white} from 'material-ui/styles/colors';
import {connect} from "react-redux";
// import {FontIcon} from "material-ui";



// import {connect} from "react-redux";




// const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
// const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;

// @autoState()
const mapStateToProps = (state, ownProps) => {
    return {
        // siteLoaded:state.sites.loaded,
        // menuClick:state.app.click,
        // title:state.app.title,
        // icon:state.app.icon,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // setSiteList:(lst)=>dispatch(setSiteList(lst)),
    }
};
// @connect(mapStateToProps,mapDispatchToProps)
class App extends React.Component {



    componentDidMount(){


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
export default connect(mapStateToProps,mapDispatchToProps)(App);