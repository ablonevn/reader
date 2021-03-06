import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {createStore} from 'redux';
import appData from './reducers';
import {indigo500, white} from 'material-ui/styles/colors';
import "./styles.scss";
import App from "./app";

const muiTheme = {
    palette: {
        primary1Color: indigo500,
        primary2Color: indigo500,
        primary3Color: white,
        textColor: white,
        secondaryTextColor: white,
        alternateTextColor: white,
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

