import React from "react";
import { Link } from "react-router-dom";
import Scene from "./Scene";
import * as THREE from "three";
import Puzzle from "./Puzzle";
import { Box, OrbitControls, Stars } from "drei";
import chair from "./puzzles/chair";

const Home = () => (
  <div>
    <Link to="/builder"> Go to builder</Link>
    <div>Homepage</div>
    {/* <Scene>{(props) => <Puzzle {...props} puzzle={chair} />}</Scene> */}
    <Scene>
      <OrbitControls />
      {chair.shape.map(({ x, y, z }) => (
        <Box key={`${x}${y}${z}`} position={new THREE.Vector3(x, y, z)}>
          <meshPhongMaterial flatShading attach="material" color="hotpink" />
        </Box>
      ))}
    </Scene>
  </div>
);

export default Home;
