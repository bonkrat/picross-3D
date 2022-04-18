import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Home from "./Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/builder">
          <Builder />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
