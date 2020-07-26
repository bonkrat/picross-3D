import { times } from "lodash";
import * as THREE from "three";

/**
 * Compares to vectors to see if their properties are equal
 * @param {*} v1
 * @param {*} v2
 */
export const vectorsEqual = (v1, v2) =>
  v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;

/**
 * Builds a box to add to the current model.
 *
 * @param {object} intersection the intersection object to add the box to
 */
export const buildBox = (intersection) => {
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
};

/**
 *
 *
 * z faceIndex === 1
 *  x, y remain constant
 * you want z = -1.5, -0.5, 0.5, 1.5
 *
 * @param {*} puzzle
 * @param {*} intersectedPosition
 * @param {*} intersectedFace
 */
export const getClue = (puzzle, intersectedPosition, intersectedFaceVector) => {
  /**
   * Returns something like {z: -1}
   * @param {*} intersectedFace
   */
  const getFace = (intersectedFace) =>
    Object.keys(intersectedFace).reduce((acc, curr) => {
      if (intersectedFace[curr]) acc = { [curr]: intersectedFace[curr] };
      return acc;
    }, "");

  const face = getFace(intersectedFaceVector);
  const direction = Object.keys(face)[0];
  const constantCoords = ["x", "y", "z"].filter((c) => c !== direction);

  const number = puzzle
    .filter(
      (cube) =>
        cube[constantCoords[0]] === intersectedPosition[constantCoords[0]] &&
        cube[constantCoords[1]] === intersectedPosition[constantCoords[1]]
    )
    .reduce((sum, cube) => {
      if (cube.keep) {
        sum += 1;
      }

      return sum;
    }, 0);

  return { number, face };
};

const getCanvasContext = (color) => {
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.fillRect(4, 4, canvas.width - 8, canvas.height - 8);
  return { canvas, ctx };
};

export const getClueCanvas = (text, cubeColor) => {
  const { canvas, ctx } = getCanvasContext(cubeColor);
  ctx.font = "128px Helvetica";

  ctx.fillStyle = "#6C5656";
  ctx.fillText(text, canvas.width / 2 - 35, canvas.height / 2 + 40);
  return ctx;
};

export const getTexture = (color) => {
  const { ctx } = getCanvasContext(color);
  return new THREE.CanvasTexture(ctx.canvas);
};

/**
 * Builds an array of meshes to display a clue on a certain face of a box geometry.
 * @param {*} face An object like {z: -1} for which face was intersected
 * @param {*} clueTexture
 * @param {*} defaultTexture
 */
export const buildFaceMeshes = (face, clueTexture, defaultTexture) => {
  const faceDirection = Object.keys(face)[0];
  const faceCoord = face[faceDirection];
  let cubeIndecies = [];

  switch (faceDirection) {
    case "x":
      cubeIndecies = [0, 1];
      break;
    case "y":
      cubeIndecies = [2, 3];
      break;
    case "z":
      cubeIndecies = [4, 5];
      break;
    default:
      cubeIndex = [];
      break;
  }

  let faces = [];
  times(6, (index) => {
    cubeIndecies.some((i) => i === index)
      ? (faces[index] = new THREE.MeshStandardMaterial({
          map: clueTexture,
        }))
      : (faces[index] = new THREE.MeshStandardMaterial({
          map: defaultTexture,
        }));
  });

  return faces;
};
