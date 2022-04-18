const { range } = require("lodash");

const amount = 4; // calculate this based on shape length
const offset = (amount - 1) / 2;

// Only need half of the range to get everything, since - and + values that are equal are the same line
const cubeRange = range(-offset, offset + 1).filter((val) => val > 0); // [.5, 1.5]

export const getLines = ({ shape }) => {
  const result = [];

  cubeRange.forEach((val) => {
    cubeRange.forEach((val2) => {
      [
        // TODO This is jank and could be better
        ["x", "y", "z"],
        ["y", "z", "x"],
        ["x", "z", "y"],
      ].forEach(([coord1, coord2]) => {
        result.push({
          row: {
            [coord1]: val,
            [coord2]: val2,
          },
          cubes: [
            ...shape.filter(
              (cube) => cube[coord1] === val && cube[coord2] === val2
            ),
          ],
        });
      });
    });
  });

  return result;
};

/**
 * Gets the clue for a row, like {number: 0, face: {x -1}}
 * @param {*} param0
 */
export const getLineClue = ({ row, cubes }) => {
  const rowCoords = Object.keys(row); // x, y
  return cubes.reduce((acc, curr) => {
    if (acc) return;
    const { clues } = curr;
    if (clues) {
      acc = clues.filter((clue) => {
        const faceCoord = Object.keys(clue.face)[0];
        return faceCoord !== rowCoords[0] && faceCoord !== rowCoords[1];
      })[0];
      return acc;
    }
  }, {});
};

/**
 * Run recursively until the previous set of possible combinations is the same as the current.
 *
 * @param {*} puzzle
 */
export const isPuzzleSolvable = (puzzle) => {
  const lines = getLines(puzzle);
  lines.forEach((line) => {
    const clue = getLineClue(line);

    // If 0, delete entire line.

    // If !0, mark combination of possible cubes to keep
  });
};
