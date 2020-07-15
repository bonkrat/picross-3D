import React from "react";
import { Link } from "react-router-dom";
import Puzzle from "./Puzzle";
import chair from "./puzzles/chair";
import Scene from "./Scene";

const Home = () => (
  <div>
    <Link to="/builder"> Go to builder</Link>
    <div>Homepage</div>
    <Scene>
      <Puzzle puzzle={chair} />
    </Scene>
  </div>
);

export default Home;
