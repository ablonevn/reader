import React from 'react';
import {connect} from "react-redux";
import {ReactHeight} from "react-height";

import {
    cachedFetch,
    setAppIcon,
    setAppTitle,
    setSiteDetailList,
    setSiteList,
    setDocumentList,
    encodeHex,
    setContentList
} from "./actions";


let state = {
    height: 0,
    startPos: 0,
    limit: 1,
    items: [],
    fetchItem: false,
    lastDetail: -1,
    rows: []
};

// let loaded=[];
class Paging extends React.Component {

    constructor(props) {
        super(props);
        this.state= state = {
            height: 0,
            startPos: 0,
            limit: 1,
            items: [],
            fetchItem: false,
            lastDetail: -1,
            rows: []
        };
    }

    addMoreRow(height) {

        if (this.props.limit) {

            return;
        }
        if (height > this.props.height) {
            // console.log("last ",state.limit);
            state = Object.assign({}, state, {
                fetchItem: false,
                limit: state.limit - 1,
                items: state.rows.slice(state.startPos, state.startPos + state.limit - 1)
            });
            this.setState(state);
        } else {
            // console.log("axddrow",state.limit,state.fetchItem);
            if (state.fetchItem) {
                state.limit = state.limit + 1;
                var items = state.rows.slice(state.startPos, state.startPos + state.limit);
                let fetchItem = items.length > state.items.length;
                state.items = items;
                if (!fetchItem) {
                    state.limit = state.limit - 1;
                }
                state = Object.assign({}, state, {fetchItem: fetchItem});
                this.setState(state);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        state.rows = [].concat(nextProps.rows);
        state.startPos = nextProps.startPos;

        state.limit = nextProps.limit || 1;
        // console.log(state.limit);
        state.items = state.rows.slice(state.startPos, state.startPos + state.limit);
        // if (state.startPos>0) {
        //     debugger;
        // }
        // console.log("items",state.rows);
        if (state.items.length == 0) {
            state.fetchItem = false;
        } else {
            state.fetchItem = true;
        }
        this.setState(Object.assign({}, state));
        console.log("props change ",this.state);
    }

    componentDidMount() {
        // console.log("rows ",state.rows);


    }

    render() {
        var rows=state.rows.slice(this.state.startPos, state.startPos + state.limit);
        var items=rows.map((item, idx) => this.props.renderItem(item, idx, state.limit));
// console.log("items:",state.rows);
        return (
            <ReactHeight onHeightReady={height => this.addMoreRow(height)}>
                {state.items.map((item,idx)=>this.props.renderItem(item,idx,state.limit))}
            </ReactHeight>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Paging);