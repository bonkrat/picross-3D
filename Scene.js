import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Stars } from "drei";

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
      {children}
      <Stars />
    </Canvas>
  );
};

export default Scene;
