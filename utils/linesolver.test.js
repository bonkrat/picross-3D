import { getLines, getLineClue } from "./linesolver";
import letterA from "../puzzles/letter_a";

const result = [
  {
    row: { x: 0.5, y: 0.5 },
    cubes: [
      {
        x: 0.5,
        y: 0.5,
        z: 1.5,
        keep: true,
        id: 20,
        clues: [{ number: 2, face: { z: 1 } }],
      },
      {
        x: 0.5,
        y: 0.5,
        z: -1.5,
        keep: true,
        id: 23,
        clues: [{ number: 2, face: { z: 1 } }],
      },
      {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        id: 21,
        keep: false,
        clues: [
          { number: 2, face: { z: 1 } },
          { number: 0, face: { x: -1 } },
        ],
      },
      {
        x: 0.5,
        y: 0.5,
        z: -0.5,
        id: 22,
        keep: false,
        clues: [
          { number: 2, face: { z: 1 } },
          { number: 0, face: { x: -1 } },
        ],
      },
    ],
  },
  {
    row: { y: 0.5, z: 0.5 },
    cubes: [
      {
        x: -0.5,
        y: 0.5,
        z: 0.5,
        id: 37,
        keep: false,
        clues: [
          { number: 2, face: { z: 1 } },
          { number: 0, face: { x: -1 } },
        ],
      },
      {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        id: 21,
        keep: false,
        clues: [
          { number: 2, face: { z: 1 } },
          { number: 0, face: { x: -1 } },
        ],
      },
      {
        x: -1.5,
        y: 0.5,
        z: 0.5,
        id: 53,
        keep: false,
        clues: [
          { number: 0, face: { y: 1 } },
          { number: 0, face: { x: -1 } },
        ],
      },
      {
        x: 1.5,
        y: 0.5,
        z: 0.5,
        id: 5,
        keep: false,
        clues: [
          { number: 0, face: { y: 1 } },
          { number: 0, face: { x: -1 } },
        ],
      },
    ],
  },
  {
    row: { x: 0.5, z: 0.5 },
    cubes: [
      { x: 0.5, y: 1.5, z: 0.5, keep: true, id: 17 },
      { x: 0.5, y: -0.5, z: 0.5, keep: true, id: 25 },
      { x: 0.5, y: -1.5, z: 0.5, id: 29, keep: false },
      {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        id: 21,
        keep: false,
        clues: [
          { number: 2, face: { z: 1 } },
          { number: 0, face: { x: -1 } },
        ],
      },
    ],
  },
  {
    row: { x: 0.5, y: 1.5 },
    cubes: [
      { x: 0.5, y: 1.5, z: 1.5, id: 16, keep: false },
      { x: 0.5, y: 1.5, z: 0.5, keep: true, id: 17 },
      { x: 0.5, y: 1.5, z: -0.5, keep: true, id: 18 },
      { x: 0.5, y: 1.5, z: -1.5, id: 19, keep: false },
    ],
  },
  {
    row: { y: 0.5, z: 1.5 },
    cubes: [
      { x: 1.5, y: 0.5, z: 1.5, id: 4, keep: false },
      { x: -1.5, y: 0.5, z: 1.5, id: 52, keep: false },
      {
        x: -0.5,
        y: 0.5,
        z: 1.5,
        keep: true,
        id: 36,
        clues: [{ number: 2, face: { z: 1 } }],
      },
      {
        x: 0.5,
        y: 0.5,
        z: 1.5,
        keep: true,
        id: 20,
        clues: [{ number: 2, face: { z: 1 } }],
      },
    ],
  },
  {
    row: { x: 0.5, z: 1.5 },
    cubes: [
      { x: 0.5, y: 1.5, z: 1.5, id: 16, keep: false },
      {
        x: 0.5,
        y: 0.5,
        z: 1.5,
        keep: true,
        id: 20,
        clues: [{ number: 2, face: { z: 1 } }],
      },
      {
        x: 0.5,
        y: -0.5,
        z: 1.5,
        keep: true,
        id: 24,
        clues: [{ number: 2, face: { x: -1 } }],
      },
      {
        x: 0.5,
        y: -1.5,
        z: 1.5,
        keep: true,
        id: 28,
        clues: [{ number: 2, face: { x: -1 } }],
      },
    ],
  },
  {
    row: { x: 1.5, y: 0.5 },
    cubes: [
      { x: 1.5, y: 0.5, z: 1.5, id: 4, keep: false },
      { x: 1.5, y: 0.5, z: -1.5, id: 7, keep: false },
      {
        x: 1.5,
        y: 0.5,
        z: -0.5,
        id: 6,
        keep: false,
        clues: [
          { number: 0, face: { y: 1 } },
          { number: 0, face: { x: -1 } },
        ],
      },
      {
        x: 1.5,
        y: 0.5,
        z: 0.5,
        id: 5,
        keep: false,
        clues: [
          { number: 0, face: { y: 1 } },
          { number: 0, face: { x: -1 } },
        ],
      },
    ],
  },
  {
    row: { y: 1.5, z: 0.5 },
    cubes: [
      { x: 0.5, y: 1.5, z: 0.5, keep: true, id: 17 },
      { x: -0.5, y: 1.5, z: 0.5, keep: true, id: 33 },
      {
        x: -1.5,
        y: 1.5,
        z: 0.5,
        id: 49,
        keep: false,
        clues: [{ number: 0, face: { y: 1 } }],
      },
      {
        x: 1.5,
        y: 1.5,
        z: 0.5,
        id: 1,
        keep: false,
        clues: [{ number: 0, face: { y: 1 } }],
      },
    ],
  },
  {
    row: { x: 1.5, z: 0.5 },
    cubes: [
      {
        x: 1.5,
        y: 1.5,
        z: 0.5,
        id: 1,
        keep: false,
        clues: [{ number: 0, face: { y: 1 } }],
      },
      {
        x: 1.5,
        y: 0.5,
        z: 0.5,
        id: 5,
        keep: false,
        clues: [
          { number: 0, face: { y: 1 } },
          { number: 0, face: { x: -1 } },
        ],
      },
      {
        x: 1.5,
        y: -0.5,
        z: 0.5,
        id: 9,
        keep: false,
        clues: [
          { number: 0, face: { y: 1 } },
          { number: 0, face: { z: -1 } },
        ],
      },
      {
        x: 1.5,
        y: -1.5,
        z: 0.5,
        id: 13,
        keep: false,
        clues: [
          { number: 0, face: { y: 1 } },
          { number: 0, face: { z: -1 } },
        ],
      },
    ],
  },
  {
    row: { x: 1.5, y: 1.5 },
    cubes: [
      { x: 1.5, y: 1.5, z: 1.5, id: 0, keep: false },
      { x: 1.5, y: 1.5, z: -1.5, id: 3, keep: false },
      {
        x: 1.5,
        y: 1.5,
        z: -0.5,
        id: 2,
        keep: false,
        clues: [{ number: 0, face: { y: 1 } }],
      },
      {
        x: 1.5,
        y: 1.5,
        z: 0.5,
        id: 1,
        keep: false,
        clues: [{ number: 0, face: { y: 1 } }],
      },
    ],
  },
  {
    row: { y: 1.5, z: 1.5 },
    cubes: [
      { x: 1.5, y: 1.5, z: 1.5, id: 0, keep: false },
      { x: 0.5, y: 1.5, z: 1.5, id: 16, keep: false },
      { x: -0.5, y: 1.5, z: 1.5, id: 32, keep: false },
      { x: -1.5, y: 1.5, z: 1.5, id: 48, keep: false },
    ],
  },
  {
    row: { x: 1.5, z: 1.5 },
    cubes: [
      { x: 1.5, y: 1.5, z: 1.5, id: 0, keep: false },
      { x: 1.5, y: 0.5, z: 1.5, id: 4, keep: false },
      {
        x: 1.5,
        y: -0.5,
        z: 1.5,
        id: 8,
        keep: false,
        clues: [
          { number: 0, face: { z: -1 } },
          { number: 2, face: { x: -1 } },
        ],
      },
      {
        x: 1.5,
        y: -1.5,
        z: 1.5,
        id: 12,
        keep: false,
        clues: [
          { number: 0, face: { z: -1 } },
          { number: 2, face: { x: -1 } },
        ],
      },
    ],
  },
];

describe("getLines", () => {
  it("builds an array of lines", () => {
    const lines = getLines(letterA);

    const lineCount = lines.reduce((acc, curr) => {
      acc += curr.cubes.length;
      return acc;
    }, 0);

    expect(lines).toMatchObject(result);
    expect(lineCount).toBe(48);
  });
});

describe("getLineClue", () => {
  it("gets the clue for a row", () => {
    expect(
      getLineClue({
        row: { y: 0.5, z: 0.5 },
        cubes: [
          {
            x: -0.5,
            y: 0.5,
            z: 0.5,
            id: 37,
            keep: false,
            clues: [
              { number: 2, face: { z: 1 } },
              { number: 0, face: { x: -1 } },
            ],
          },
          {
            x: 0.5,
            y: 0.5,
            z: 0.5,
            id: 21,
            keep: false,
            clues: [
              { number: 2, face: { z: 1 } },
              { number: 0, face: { x: -1 } },
            ],
          },
          {
            x: -1.5,
            y: 0.5,
            z: 0.5,
            id: 53,
            keep: false,
            clues: [
              { number: 0, face: { y: 1 } },
              { number: 0, face: { x: -1 } },
            ],
          },
          {
            x: 1.5,
            y: 0.5,
            z: 0.5,
            id: 5,
            keep: false,
            clues: [
              { number: 0, face: { y: 1 } },
              { number: 0, face: { x: -1 } },
            ],
          },
        ],
      })
    ).toMatchObject({
      number: 0,
      face: { x: -1 },
    });
  });
});
