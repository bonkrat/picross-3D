import React, { useState } from "react";
import { Link } from "react-router-dom";
import Puzzle from "./Puzzle";
import chair from "./puzzles/chair";
import letterA from "./puzzles/letter_a";
import Scene from "./Scene";
import StyledNavigation from "./Navigation";
import { buildBox, getClue, vectorsEqual } from "./utils";

const Home = () => {
  const [shape, setShape] = useState(letterA.shape);

  const onClick = (e) => {
    e.stopPropagation();

    if (e.intersections.length) {
      console.log(
        ...shape.filter((box) =>
          vectorsEqual(box, e.intersections[0].object.position)
        )
      );
      setShape([
        ...shape.filter(
          (box) => !vectorsEqual(box, e.intersections[0].object.position)
        ),
      ]);
    }
  };
  return (
    <div>
      <StyledNavigation>
        <div>Homepage</div>
        <Link to="/builder"> Go to builder</Link>
      </StyledNavigation>
      <Scene>
        <Puzzle onClick={onClick} puzzle={shape} />
      </Scene>
    </div>
  );
};

export default Home;
