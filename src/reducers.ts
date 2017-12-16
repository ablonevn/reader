import { combineReducers } from 'redux'
import {
    GET_TITLE, SET_SITE_LIST, SET_APP_TITLE, SET_DETAIL_LIST, SET_APP_ICON
} from './actions'

let initState = {
    title: "",
    icon:"home",
    click:()=>{console.log("default on click")},
    sites: {
        list: []
    },
    siteDetail: {
        list: []
    }
};

function app(state = initState, action) {
    var res=action.type.split('|').map((type)=>{
        switch (type) {
            case SET_APP_TITLE:
                return Object.assign({}, state, {
                    title: action.text
                });
            case SET_APP_ICON:
                var r=action.info;
                var p:any={};
                if (r.icon) p.icon=r.icon;
                if (r.click) p.click=r.click;

                return Object.assign({}, state, p);
            case GET_TITLE:
                return Object.assign({}, state, {
                    title: "List site"
                });

            case SET_SITE_LIST:

                return Object.assign({},state,{
                    sites:Object.assign({},state.sites,{
                        list: action.list
                    })
                });
            case SET_DETAIL_LIST:
                return Object.assign({},state,{
                    siteDetail:Object.assign({},state.siteDetail,{
                        list: action.list
                    })
                });


            default:
                return state;
        }
    });
    return Object.assign.apply({},res);

}
function sites(data){

}


const appData = combineReducers({
    app
});

export default appData