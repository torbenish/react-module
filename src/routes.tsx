import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./views/Home"
import Contact from "./views/Contact"
import SignIn from "./views/SignIn"
import SignUp from "./views/SignUp"

const Routes: React.FC = () => {
  return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/contact" component={Contact}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
        </Switch>
      </BrowserRouter>
  );
}

export default Routes;