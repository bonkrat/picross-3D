import { OrbitControls, Stars } from "drei";
import React, { useState } from "react";
import { Canvas } from "react-three-fiber";

const Scene = ({ children }) => {
  return (
    <Canvas>
      <hemisphereLight
        skyColor={0xffffff}
        groundColor={0x000088}
        position={[-1, 1.5, 1]}
      />

      <hemisphereLight
        skyColor={0xffffff}
        groundColor={0x880000}
        intensity={0.5}
        position={[-1, -1.5, -1]}
      />
      <OrbitControls />
      {children}
      <Stars />
    </Canvas>
  );
};

export default Scene;
