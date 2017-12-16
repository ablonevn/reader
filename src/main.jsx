import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider} from 'react-redux';
import {createStore} from 'redux';
import appData from './reducers';
import App from './app';




import "./styles.scss";



let store = createStore(appData);


ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <App/>
        </Provider>
    </MuiThemeProvider>
    ,document.getElementById('app')
);

