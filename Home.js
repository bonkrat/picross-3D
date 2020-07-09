import React from "react";
import { Link } from "react-router-dom";
import Scene from "./Scene";
import Puzzle from "./Puzzle";
import chair from "./puzzles/chair";

const Home = () => (
  <div>
    <Link to="/builder"> Go to builder</Link>
    <div>Homepage</div>
    <Scene>{(props) => <Puzzle {...props} puzzle={chair} />}</Scene>
  </div>
);

export default Home;
