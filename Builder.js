import { some } from "lodash";
import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import Puzzle from "./Puzzle";
import buildCube from "./puzzles/default";
import Scene from "./Scene";
import Tools from "./Tools";
import { buildBox, getClue, vectorsEqual } from "./utils";

const showShape = (shape) => shape.filter((cube) => cube.keep);

const mergeShape = (shape) =>
  buildCube(4).shape.map((coords, index) =>
    some(shape, coords)
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

const Builder = () => {
  const [shape, setShape] = useState(buildCube(4).shape);
  const [mode, setMode] = useState("create");
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (mode === "create") {
      setShape(showShape(shape));
    } else if (mode === "clue") {
      setShape(mergeShape(shape));
    }
  }, [mode]);

  const onSaveShape = () => {
    console.log(JSON.stringify({ name: "A", shape }));
  };

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

  const onClick = (e) => {
    // Only propagate the closest object.
    e.stopPropagation();

    const position = e.intersections[0].object.position;

    if (e.intersections.length) {
      if (mode === "create") {
        // Adds a new box, for building!
        if (e.shiftKey) {
          setShape([...shape, buildBox(e.intersections[0])]);
        } else {
          // Remove box!
          setShape([
            ...shape.filter(
              (box) => !vectorsEqual(box, e.intersections[0].object.position)
            ),
          ]);
        }
      } else if (mode === "clue") {
        // Adds a clue number
        const faceVector = e.intersections[0].face.normal;
        const clue = getClue(shape, position, faceVector);
        const constantCoords = ["x", "y", "z"].filter(
          (c) => c !== Object.keys(clue.face)[0]
        );

        setCubes(
          shape
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
      } else if (mode === "paint") {
        console.log("paintmode");
      }
    }
  };
  /**
   *  Update multiple cubes at once
   * @param {*} cubes An array of updated cubes
   */
  const setCubes = (cubes) => {
    cubes.map((cube) => setCube(cube));
  };

  return (
    <div>
      <Navigation>
        <div>Builder</div>
        <Link to="/"> Go Home</Link>
      </Navigation>
      <Scene>
        <Suspense fallback={null}>
          <Puzzle puzzle={shape} onClick={onClick} />
        </Suspense>
      </Scene>
      <Tools
        onSaveShape={() => onSaveShape()}
        setMode={(e) => setMode(e.target.value)}
        mode={mode}
        onShowAnswer={() => setShowAnswer(!showAnswer)}
      />
    </div>
  );
};

export default Builder;
