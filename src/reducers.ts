import { combineReducers } from 'redux'
import {
    GET_TITLE, SET_SITE_LIST, SET_APP_TITLE, SET_DETAIL_LIST, SET_APP_ICON, cachedFetch,
    SET_SITE_LOADING, SET_DOCUMENT_LIST
} from './actions'

let initState = {
    title: "",
    icon: "home",
    click: () => {
        console.log("default on click")
    },

};

function app(state = initState, action) {
    var res = action.type.split('|').map((type) => {
        switch (type) {
            case SET_APP_TITLE:
                return Object.assign({}, state, {
                    title: action.text
                });
            case SET_APP_ICON:
                var r = action.info;
                var p: any = {};
                if (r.icon) p.icon = r.icon;
                if (r.click) p.click = r.click;

                return Object.assign({}, state, p);
            case GET_TITLE:
                return Object.assign({}, state, {
                    title: "List site"
                });


            default:
                return state;
        }
    });
    return Object.assign.apply({}, res);

}

function sites(state = {
    loading: false,
    list: []
}, action) {
    switch (action.type) {
        case SET_SITE_LOADING:
            return Object.assign({}, state, {
                loading: action.state
            });
        case SET_SITE_LIST:
            return Object.assign({}, state, {

                list: action.list
            });
        default:
            return state;
    }
}

function siteDetail(state = {
    list: []
}, action) {
    switch (action.type) {
        case SET_DETAIL_LIST:
            return Object.assign({}, state, {
                list: action.list

            });


        default:
            return state;
    }
}

function doc(state = {
    list: []
}, action) {
    switch (action.type) {
        case SET_DOCUMENT_LIST:
            return Object.assign({},state,{
                list:action.list
            });
        default:
            return state;
    }
}


const appData = combineReducers({
    app,
    sites,
    siteDetail,
    doc
});

export default appData