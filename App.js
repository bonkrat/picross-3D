import React, { useEffect } from "react";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Scene from "./Scene";
import Puzzle from "./Puzzle";
import Builder from "./builder";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/builder">
          {/* <Scene>{(props) => <Builder {...props} />}</Scene> */}
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
