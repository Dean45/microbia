import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from "./welcome";
import {App} from "./app.js";
import {init} from "./socket";
import axios from "./axios";

import {Provider} from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from "./reducer";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

let element;
let pass;

axios.get("/cookiecheck")
    .then(res => {
        if (res.data === true) {
            pass = true;
        }
    }).catch(err => {
        console.log("error cook", err);
    }).then(()=> {
        if (location.pathname === "/welcome") {
            element = <Welcome />;
        } else if (pass != true) {
            element = <Welcome />;
        } else {
            init(store);
            element = (
                <Provider store={store}>
                    <App />
                </Provider>
            );
        }

        ReactDOM.render(
            element,
            document.querySelector('main')
        );
    }).catch(err => {
        console.log("error cook2", err);
    });
