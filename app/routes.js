import React from "react";
import Home from "./components/views/Home/home.js";
import Form from "./components/views/Form/form.js";
import "./style.css";
import NotFound from "./components/views/notFound/notFound.js";
import Todo from "./components/views/Todo/Todo.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group"; // ES6

const pageComponent = Page => {
  return props => (
    <ReactCSSTransitionGroup
      transitionEnter={true}
      transitionLeave={true}
      transitionAppear={true}
      transitionExit={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
      transitionExitTimeout={300}
      transitionName="example"
    >
      <Page className="animated-page-wrapper" key={Page} {...props} />
    </ReactCSSTransitionGroup>
  );
};

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={pageComponent(Home)} />
        <Route path="/form" component={pageComponent(Form)} />
        <Route path="/todo" component={pageComponent(Todo)} />
        <Route path="*" component={pageComponent(Form)} />
      </Switch>
    </div>
  );
};

export default Routes;
