import { Box } from "drei";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as THREE from "three";
import Home from "./Home";
import buildCube from "./puzzles/default";
import Scene from "./Scene";
import Puzzle from "./Puzzle";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/builder">
          <Scene>
            <Puzzle puzzle={buildCube(4)} />
          </Scene>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
