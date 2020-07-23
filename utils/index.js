import { range, times } from "lodash";
import * as THREE from "three";

export const vectorsEqual = (v1, v2) =>
  v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;

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
   * Returns something like {z: -1} or {y: 0}
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
    .filter((cube) => {
      return (
        cube[constantCoords[0]] === intersectedPosition[constantCoords[0]] &&
        cube[constantCoords[1]] === intersectedPosition[constantCoords[1]]
      );
    })
    .reduce((sum, cube) => {
      if (cube.keep) {
        sum += 1;
      }

      return sum;
    }, 0);

  // console.log("face", face);

  return { number, face };
};

export const getTexture = (color) => {
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.fillRect(4, 4, canvas.width - 8, canvas.height - 8);

  return new THREE.CanvasTexture(ctx.canvas);
};

export const getClueCanvas = (text, cubeColor) => {
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = cubeColor;
  ctx.fillRect(4, 4, canvas.width - 8, canvas.height - 8);
  ctx.font = "89px Helvetica";

  ctx.fillStyle = "#6C5656";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  return ctx;
};

export const buildFaceMeshes = (face, clueTexture, defaultTexture) => {
  const faceDirection = Object.keys(face)[0];
  const faceCoord = face[faceDirection];
  let cubeIndex;
  console.log(face);

  switch (faceDirection) {
    case "x":
      if (faceCoord === 1) {
        cubeIndex = 0; // good
      } else {
        cubeIndex = 1;
      }
      break;
    case "y":
      if (faceCoord === 1) {
        cubeIndex = 2; // good
      } else {
        cubeIndex = 3;
      }
      break;
    case "z":
      if (faceCoord === 1) {
        cubeIndex = 4; // good
      } else {
        cubeIndex = 5; //
      }
      break;
    default:
      cubeIndex = 0;
      break;
  }

  let faces = [];
  times(6, (index) => {
    index === cubeIndex
      ? (faces[index] = new THREE.MeshStandardMaterial({
          map: clueTexture,
        }))
      : (faces[index] = new THREE.MeshStandardMaterial({
          map: defaultTexture,
        }));
  });

  return faces;
};
