import { Box } from "drei";
import React, { useState } from "react";
import * as THREE from "three";
import { vectorsEqual } from "./utils";

function buildBox(intersection) {
  let x, y, z;
  const faceIndex = intersection.faceIndex;
  const intersectionPosition = intersection.object.position;

  x = intersectionPosition.x;
  y = intersectionPosition.y;
  z = intersectionPosition.z;

  switch (faceIndex) {
    case 0:
    case 1:
      x += 1;
      break;
    case 2:
    case 3:
      x -= 1;
      break;
    case 4:
    case 5:
      y += 1;
      break;
    case 6:
    case 7:
      y -= 1;
      break;
    case 8:
    case 9:
      z += 1;
      break;
    case 10:
    case 11:
      z -= 1;
      break;

    default:
      break;
  }

  return { x, y, z };
}

const Puzzle = ({ puzzle }) => {
  const [hoveredObj, setHoveredObj] = useState();
  const [shape, setShape] = useState(puzzle.shape);

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

    if (e.intersections.length) {
      if (e.shiftKey) {
        setShape([...shape, buildBox(e.intersections[0])]);
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
      {shape.map(({ x, y, z }) => {
        let color = "hotpink";
        if (hoveredObj && vectorsEqual(hoveredObj.position, { x, y, z })) {
          color = "skyblue";
        }
        return (
          <Box
            onPointerOver={onPointerOver}
            key={`${x}${y}${z}`}
            position={new THREE.Vector3(x, y, z)}
          >
            <meshPhongMaterial flatShading attach="material" color={color} />
          </Box>
        );
      })}
    </group>
  );
};

export default Puzzle;
