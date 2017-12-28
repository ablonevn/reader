import * as React from 'react';
import {Avatar, List, ListItem, Subheader} from "material-ui";
import {ActionInfo, FileFolder} from "material-ui/svg-icons";
import {connect} from "react-redux";
import {cachedFetch, setAppIcon, setAppTitle, setSiteList} from "./actions";

class Home extends React.Component<any,any> {

      constructor(props,context?) {
          super(props,context);
          this.state={
              list:[]
          }

      }
    componentDidMount() {
        this.props.setTitle();
        this.props.setAppIcon({icon:"home",click:()=>{}});
        cachedFetch('/sites').then((res) => {
            this.setState(Object.assign({},this.state,{list:res}));
        });
    }

    render() {
        // let me = this;

        return (
            <div>
                <List>
                    <Subheader inset={true}>List sites</Subheader>
                    {this.state.list.map((o) => {
                        {if (o.reading){
                            return <ListItem key={o.id}
                                      leftAvatar={<Avatar icon={<FileFolder/>}/>}
                                      rightIcon={<ActionInfo/>}
                                      primaryText={o.name}
                                      onClick={() => {
                                          // context.history.push === history.push
                                          this.props.history.push(o.url)
                                      }}
                                      secondaryText={o.url}/>
                        } else {
                            return <ListItem key={o.id}
                                         leftAvatar={<Avatar icon={<FileFolder/>}/>}
                                         rightIcon={<ActionInfo/>}
                                         primaryText={o.name}
                                         onClick={() => {
                                             // context.history.push === history.push
                                             this.props.history.push('/site/' + o.id)
                                         }}
                                         secondaryText={o.url}
                        />}}
                    })}

                </List>

            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
// debugger;
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);