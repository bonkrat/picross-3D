import React, { useState } from "react";
import * as THREE from "three";
import buildCube from "./puzzles/default";
import { buildFaceMeshes, getClue, vectorsEqual } from "./utils";

const cubeColor = "#888";
const amount = 4;
const offset = (amount - 1) / 2;
const geometry = new THREE.BoxBufferGeometry(1);

const Puzzle = ({ puzzle, onClick }) => {
  // useFrame((state) => console.log(state));

  // FIX this https://github.com/react-spring/react-three-fiber/blob/master/pitfalls.md#-never-ever-setstate-animations-
  const [hoveredObj, setHoveredObj] = useState();
  // const [shape, setShape] = useState(mergedShape);

  /**
   *  Update multiple cubes at once
   * @param {*} cubes An array of updated cubes
   */
  const setCubes = (cubes) => {
    cubes.map((cube) => setCube(cube));
  };

  // TODO Fix this, useFrame
  const onPointerOver = (e) => {
    if (e.intersections.length && e.intersections[0].object) {
      setHoveredObj(e.intersections[0].object);
    } else {
      setHoveredObj(null);
    }
  };

  const onPointerOut = (e) => {
    setHoveredObj(null);
  };

  return (
    <group onClick={onClick} onPointerOut={onPointerOut}>
      {puzzle.map(({ x, y, z, id, clues = [] }) => {
        let color = cubeColor;
        if (hoveredObj && vectorsEqual(hoveredObj.position, { x, y, z })) {
          color = "skyblue";
        }

        const material = buildFaceMeshes(clues, color);

        return (
          <mesh
            // onPointerOver={onPointerOver}
            key={id}
            position={new THREE.Vector3(x, y, z)}
            args={[geometry, material]}
          />
        );
      })}
    </group>
  );
};

Puzzle.defaultProps = {
  puzzle: {
    name: "",
    shape: [],
  },
};

export default Puzzle;
