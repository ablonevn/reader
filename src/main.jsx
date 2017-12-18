import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider} from 'react-redux';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {createStore} from 'redux';
import appData from './reducers';
import App from './app';

import {indigo700,grey600,white} from 'material-ui/styles/colors';


import "./styles.scss";

const muiTheme = {
    palette: {
        primary1Color: indigo700,
        primary2Color: indigo700,
        primary3Color: white,
        textColor: white,
        secondaryTextColor: white,
        alternateTextColor: white,
    },
    appBar: {
        //height: 50,
    },
};

let store = createStore(appData);


ReactDOM.render(
    <MuiThemeProvider  muiTheme={getMuiTheme(muiTheme)}>
        <Provider store={store}>
            <App/>
        </Provider>
    </MuiThemeProvider>
    ,document.getElementById('app')
);

