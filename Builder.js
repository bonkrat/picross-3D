import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import Puzzle from "./Puzzle";
import buildCube from "./puzzles/default";
import chair from "./puzzles/chair";
import Scene from "./Scene";
import Navigation from "./Navigation";
import Tools from "./Tools";

const Builder = () => (
  <div>
    <Navigation>
      <div>Builder</div>
      <Link to="/"> Go Home</Link>
    </Navigation>
    <Scene>
      <Suspense fallback={null}>
        <Puzzle puzzle={chair} />
      </Suspense>
    </Scene>
    <Tools />
  </div>
);

export default Builder;
