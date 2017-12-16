import React from 'react';
import {Link} from 'react-router-dom';
import {Avatar, List, ListItem, Subheader} from "material-ui";
import {ActionInfo, FileFolder} from "material-ui/svg-icons/index";
import {connect} from "react-redux";
import {setAppTitle, setSiteList, cachedFetch, gInit, setAppIcon, SET_SITE_LOADING} from "./actions";
import appState from "./app-data";
// import {bindActionCreators} from "redux";

// var first=true;

class Home extends React.Component {

    //  constructor(props,context) {
    //      super(props,context);
    //      // appState.title.next("Home")
    //      // this.props.setTitle();
    //      // this.props.setAppIcon({icon:"home"});
    //      // cachedFetch('/sites').then((res) =>this.props.setSiteList(res));
    //
    // //     // this.state = {
    // //     //     counter : 100
    // //     // };
    // //
    // //     // const {counter }=props;
    // //     //const {firstAction, secondAction} = props;
    //  }
    componentDidMount() {
        this.props.setTitle();
        const click=()=>{};
        this.props.setAppIcon({icon:"home",click:click});
        console.log("render Home", JSON.stringify(this.props.list));
        if ((this.props.list.length == 0)) {
            // this.props.setLoading(true);
            cachedFetch('/sites').then((res) => this.props.setSiteList(res));
            // this.props.setLoading(false);

        }



    }

    render() {
        let me = this;

        return (
            <div>
                <List>
                    <Subheader inset={true}>List sites</Subheader>
                    {this.props.list.map((o) => {
                        return <ListItem key={o.id}
                                         leftAvatar={<Avatar icon={<FileFolder/>}/>}
                                         rightIcon={<ActionInfo/>}
                                         primaryText={o.name}
                                         onClick={() => {
                                             // context.history.push === history.push
                                             me.props.history.push('/site/' + o.id)
                                         }}
                                         secondaryText={o.url}
                        />;
                    })}

                </List>

            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
// debugger;
    return {
        loading: state.sites.loading,
        list: state.sites.list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // same effect
        setTitle: () => dispatch(setAppTitle("Home")),
        setSiteList: (lst) => dispatch(setSiteList(lst)),
        setAppIcon: (icon) => dispatch(setAppIcon(icon)),


        // secondAction : bindActionCreators(()=>{}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);