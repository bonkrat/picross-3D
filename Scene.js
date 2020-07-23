import { OrbitControls, Stars } from "drei";
import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";

const Scene = ({ children }) => {
  return (
    <Canvas camera={{ position: [4, 4, 4] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <OrbitControls />
      {children}
      {/* <Stars /> */}
    </Canvas>
  );
};

export default Scene;
