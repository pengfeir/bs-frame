import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "@/container/login"
import App from "@/container"
import Content from "@/container/content"
import Chart from "@/pages/chart"
import Home from "@/pages/home"
interface Props {
  login: Boolean
}
export default class Routers extends Component<Props> {
  public render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/" render={() =>
              this.props.login ?
                (<Switch>
                  <Route path="/content" render={() =>
                    <Content>
                      <Switch>
                        <Route path="/content/chart" component={Chart} />
                        <Route path="/content/home" component={Home} />
                        <Redirect to="/content/home" />
                      </Switch>
                    </Content>
                  } />
                  <Redirect to="/content" />
                </Switch>
                )
                : (
                  <Switch>
                    <Route path="/login" component={Login} />
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