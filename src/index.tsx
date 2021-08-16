import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/Dashboard/App";
import History from "./pages/History/History";
import Series from "./pages/Series/Series";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "../node_modules/semantic-ui-css/semantic.min.css";
// import 'semantic-ui-css/semantic.min.css';

const ROUTES = [
  {
    component: App,
    route: "/",
    exact: true
  },
  {
    component: History,
    route: "/history",
    exact: true
  },
  {
    component: Series,
    route: "/history/:id",
  },
];

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* <App /> */}
      <Switch>
        {ROUTES.map((route) => <Route path={route.route} exact={route.exact} component={route.component} />)}
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
