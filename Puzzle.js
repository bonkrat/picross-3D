import { some } from "lodash";
import React, { useState } from "react";
import * as THREE from "three";
import buildCube from "./puzzles/default";
import { buildFaceMeshes, getClue, vectorsEqual } from "./utils";

const cubeColor = "#7A93AC";
const amount = 4;
const offset = (amount - 1) / 2;
const geometry = new THREE.BoxBufferGeometry(1);

const Puzzle = ({ puzzle }) => {
  // useFrame((state) => console.log(state));
  // A merged shape of the puzzle and the default, to fill in cubes for the user to solve
  const mergedShape = buildCube(4).shape.map((coords, index) =>
    some(puzzle.shape, coords)
      ? {
          ...coords,
          keep: true,
          id: index,
        }
      : {
          ...coords,
          keep: false,
          id: index,
        }
  );

  // FIX this https://github.com/react-spring/react-three-fiber/blob/master/pitfalls.md#-never-ever-setstate-animations-
  const [hoveredObj, setHoveredObj] = useState();
  const [shape, setShape] = useState(mergedShape);

  /**
   * Updates a single cube in the puzzle
   * @param {*} cube
   */
  const setCube = (cube) => {
    const prevCube = shape.filter((v) => vectorsEqual(v, cube))[0];

    const mergedCube = {
      ...prevCube,
      ...cube,
      clues: [...cube.clues, ...(prevCube?.clues ? prevCube.clues : [])],
    };

    setShape((prevShape) => [
      ...prevShape.filter((v) => !vectorsEqual(v, cube)),
      {
        ...mergedCube,
      },
    ]);
  };

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

  const onClick = (e) => {
    // Only propagate the closest object.
    e.stopPropagation();

    const position = e.intersections[0].object.position;
    const faceVector = e.intersections[0].face.normal;

    const clue = getClue(mergedShape, position, faceVector);

    if (e.intersections.length) {
      if (e.shiftKey) {
        // Adds a new box, for building!
        // setShape([...shape, buildBox(e.intersections[0])]);

        // Adds a clue number
        const constantCoords = ["x", "y", "z"].filter(
          (c) => c !== Object.keys(clue.face)[0]
        );

        setCubes(
          mergedShape
            .filter(
              (cube) =>
                cube[constantCoords[0]] === position[constantCoords[0]] &&
                cube[constantCoords[1]] === position[constantCoords[1]]
            )
            .map((cube) => {
              return {
                ...cube,
                clues: [clue],
              };
            })
        );
      } else {
        setShape([
          ...shape.filter(
            (box) => !vectorsEqual(box, e.intersections[0].object.position)
          ),
        ]);
      }
    }
  };

  return (
    <group onClick={onClick} onPointerOut={onPointerOut}>
      {shape.map(({ x, y, z, id, keep, clues = [] }) => {
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
