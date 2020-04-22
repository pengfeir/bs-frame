import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";
import Login from "@/container/login"
import App from "@/container"
import Content from "@/container/content"
import Chart from "@/pages/chart"
import Home from "@/pages/home"
let a =1
let b =1
export default class Routers extends Component{
  public render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/login"  component={ Login } />
            <Route path="/" render={ () =>
              a===b ?
              (<Switch>
                <Route path="/content" render={ () =>
                  <Content>
                    <Switch>
                      <Route path="/content/permission" component={ Chart } />
                      <Route path="/content/home" component={ Home } />
                      <Redirect to="/content/home" />
                    </Switch>
                  </Content>
                } />
                <Redirect to="/content" />
              </Switch>
              )
              : (
                <Switch>
                    <Redirect to="/login" />
                </Switch>
              )
            } />
          </Switch>
        </App>
      </Router>
    );
  }
}