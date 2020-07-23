import React from "react";
import { Link } from "react-router-dom";
import Puzzle from "./Puzzle";
import chair from "./puzzles/chair";
import Scene from "./Scene";
import StyledNavigation from "./Navigation";

const Home = () => (
  <div>
    <StyledNavigation>
      <div>Homepage</div>
      <Link to="/builder"> Go to builder</Link>
    </StyledNavigation>
    <Scene>
      <Puzzle puzzle={chair} />
    </Scene>
  </div>
);

export default Home;
