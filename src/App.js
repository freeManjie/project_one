import React, { useState, useEffect } from "react"
import { HashRouter, Route, Switch, Redirect } from "react-router-dom"
import "antd/dist/antd.less"
import "./App.scss"
import "./assets/styles/iconfont.css"
import Login from "./pages/Login";
import ProjectBackLayout from "./layOuts/Project/ProjectBackLayout";
import axios from "axios";

let loadingCount = 0;
let tokenCount = 0;
let dom = document.querySelector('#loading');
const showLoading = () => {
    dom.setAttribute('class', 'global-loading');
}

const hideLoading = () => {
    dom.setAttribute('class', 'loading-hide');
}

function App() {

    return (
        <div>
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={ Login } />
                    <Route path="/login" component={ Login } />
                    <Route path="/project" component={ ProjectBackLayout } />
                </Switch>
            </HashRouter>
        </div>
    )
}

export default App
