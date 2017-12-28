import * as React from 'react';
import {connect} from "react-redux";
import {ReactHeight} from "react-height";


// let loaded=[];
class Paging extends React.Component<any,any> {
    private rows: any[];
    private startPos: any;
    private limit: any | number;
    private items: any[];
    private fetchItem: boolean;

    constructor(props) {
        super(props);
        this.state= {
            height: 0,
            startPos: 0,
            limit: 1,
            items: [],
            fetchItem: false,
            lastDetail: -1,
            rows: []
        };
    }
    renderItem(lst){
        // var rows=this.rows.slice(this.startPos, this.startPos + this.limit);

        return lst.map((item, idx) => this.props.renderItem(item, idx));
    }

    addMoreRow(height) {
// console.log("more",this.fetchItem);

        if (this.props.limit) {

            return;
        }
        if (height > this.props.height) {
            // console.log("last ",state.limit);
            this.fetchItem=false;
            this.limit=this.limit-1;

            var r=this.rows.slice(this.startPos, this.startPos + this.limit - 1);

            this.setState(Object.assign({},this.state,{
                items:r
            }));
        } else {
            // console.log("axddrow",state.limit,state.fetchItem);

            if (this.fetchItem) {

                this.limit = this.limit + 1;
                var items = this.rows.slice(this.startPos, this.startPos + this.limit);
                let fetchItem = items.length > this.items.length;
                //this.items = items;
                if (!fetchItem) {
                    this.limit = this.limit - 1;
                }
                // var r=this.renderItem(items);
                var st = Object.assign({}, this.state, {
                        items:items
                });
                this.setState(Object.assign({},this.state,st));
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.rows = [].concat(nextProps.rows);
        this.startPos = nextProps.startPos;

        this.limit = nextProps.limit || 1;
        // console.log(state.limit);
        this.items = this.rows.slice(this.startPos, this.startPos + this.limit);
        // if (state.startPos>0) {
        //     debugger;
        // }
        // console.log("items",state.rows);
        // debugger;
        if (this.items.length == 0) {
            this.fetchItem = false;
        } else {
            this.fetchItem = true;
        }
        this.setState(Object.assign({}, this.state,{items:this.renderItem(this.items)}));
        // console.log("props change ",this.state);
    }

    componentDidMount() {
        // console.log("rows ",state.rows);


    }

    render() {
        if (!this.fetchItem && this.limit) {
            this.props.callback(this.limit-1);
        }
        // let me=this;
        // var rows=this.rows.slice(this.startPos, this.startPos + this.limit);
        // var items=rows.map((item, idx) => this.props.renderItem(item, idx, this.limit));
// console.log("items:",this.state.items);
        return (
            <ReactHeight onHeightReady={height => this.addMoreRow.call(this,height)}>
                {this.state.items.map((item,idx)=>this.props.renderItem(item,idx))}
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