import { OrbitControls } from "drei";
import React from "react";
import { Canvas } from "react-three-fiber";

const Scene = ({ children }) => {
  return (
    <Canvas camera={{ position: [6, 6, 6] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <OrbitControls />
      {children}
    </Canvas>
  );
};

export default Scene;
