import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "@/container/login"
import Container from "@/container"
import Content from "@/container/content"
import Chart from "@/pages/chart"
import Form from "@/pages/formDemo"
import QueryTable from "@/pages/queryTable"
interface Props {
  login: Boolean
}
const Routers: React.FC<Props> = props => {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" render={() =>
            props.login ?
              (<Switch>
                <Route path="/content" render={() =>
                  <Content>
                    <Switch>
                      <Route path="/content/chart" component={Chart} />
                      <Route path="/content/table" component={QueryTable} />
                      <Route path="/content/form" component={Form} />
                      <Redirect to="/content/table" />
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
      </Container>
    </Router>
  );
}
export default Routers