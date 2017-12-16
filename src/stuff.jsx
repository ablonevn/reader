import React,{Component} from 'react';
import {Avatar,  List, ListItem, Subheader} from "material-ui";
import ActionInfo from 'material-ui/svg-icons/action/info';
import FileFolder from "material-ui/svg-icons/file/folder";
import {connect} from "react-redux";

class Stuff extends React.Component {
    componentDidMount(){
        this.props.setAppTitle();
    }
    render() {

        return (
            <List>
                <Subheader inset={true}>Folders</Subheader>
                <ListItem
                    leftAvatar={<Avatar icon={<FileFolder />} />}
                    rightIcon={<ActionInfo />}
                    primaryText="Photos"
                    secondaryText="Jan 9, 2014"
                />
                <ListItem
                    // leftAvatar={<Avatar icon={<FileFolder />} />}
                    // rightIcon={<ActionInfo />}
                    primaryText="Recipes"
                    secondaryText="Jan 17, 2014"
                />
                <ListItem
                    // leftAvatar={<Avatar icon={<FileFolder />} />}
                    // rightIcon={<ActionInfo />}
                    primaryText="Work"
                    secondaryText="Jan 28, 2014"
                />
            </List>

        );

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        // title: state.app.title,
        // someComponentValue : state.things[ownProps.someIdProp]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // same effect
        setAppTitle : () => dispatch({
            type:"GET_TITLE2"
        }),
        // secondAction : bindActionCreators(()=>{}, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Stuff);