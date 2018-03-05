import React from "react";
import Home from "./components/views/Home/home.js";
import Form from "./components/views/Form/form.js";
import NotFound from "./components/views/notFound/notFound.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/form" component={Form} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
