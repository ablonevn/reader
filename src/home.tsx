import * as React from 'react';
import {Avatar, List, ListItem, Subheader} from "material-ui";
import {ActionInfo, FileFolder} from "material-ui/svg-icons";
import {connect} from "react-redux";
import {setAppIcon, setAppTitle, setSiteList} from "./actions";


const mapStateToProps = (state, ownProps) => {

    return {
        // loading: state.sites.loading,
        // list: state.sites.list
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

//@autoState(mapStateToProps, mapDispatchToProps)
export class Home extends React.Component<any, any> {
    private list: any=[];


    // constructor(props, context?) {
    //     super(props, context);
    //     // debugger;
    //     // this.state = {
    //     //     list: []
    //     // }
    //
    //
    // }

     async componentDidMount() {
        this.props.setTitle();
        this.props.setAppIcon({
            icon: "home", click: () => {}
        });

         await fetch('/sites').then(res => res.json()).then((res) => {
            this.list=res;

        });
         this.setState(Object.assign({}, this.state));


    }


    render() {
        // console.log("xxxxxx");
        if (this.list.length == 0) return null;

        return (
            <div>
                <List>
                    <Subheader inset={true}>List sites</Subheader>
                    {this.list.map((o) => {
                        {
                            if (o.reading) {
                                return <ListItem
                                    key={o.id}
                                    leftAvatar={<Avatar icon={<FileFolder/>}/>}
                                    rightIcon={<ActionInfo/>}
                                    primaryText={o.name}
                                    onClick={() => {
                                        // context.history.push === history.push
                                        this.props.history.push(o.url)
                                    }}
                                    secondaryText={o.url}/>
                            } else {
                                return <ListItem
                                    key={o.id}
                                    leftAvatar={<Avatar icon={<FileFolder/>}/>}
                                    rightIcon={<ActionInfo/>}
                                    primaryText={o.name}
                                    onClick={() => {
                                        // context.history.push === history.push
                                        this.props.history.push('/site/' + o.id)
                                    }}
                                    secondaryText={o.url}
                                />
                            }
                        }
                    })}

                </List>

            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);

//export exp as Home;