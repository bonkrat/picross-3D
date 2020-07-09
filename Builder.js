import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "./OrbitControls";
import { Link } from "react-router-dom";

function buildBox(intersection, object) {
  const faceIndex = intersection[0].faceIndex;
  const intersectionPosition = intersection[0].object.position;
  object.position.x = intersectionPosition.x;
  object.position.y = intersectionPosition.y;
  object.position.z = intersectionPosition.z;

  switch (faceIndex) {
    case 0:
    case 1:
      object.position.x += 1;
      break;
    case 2:
    case 3:
      object.position.x -= 1;
      break;
    case 4:
    case 5:
      object.position.y += 1;
      break;
    case 6:
    case 7:
      object.position.y -= 1;
      break;
    case 8:
    case 9:
      object.position.z += 1;
      break;
    case 10:
    case 11:
      object.position.z -= 1;
      break;

    default:
      break;
  }
}

const amount = 4;
const raycaster = new THREE.Raycaster();
var deleteMatrix = new THREE.Matrix4().scale(new THREE.Vector3(0, 0, 0));
const skyblue = new THREE.Color("skyblue");
let state = [];
let INTERSECTED, currentColor;

const Builder = ({ camera, scene, renderer, mouse }) => {
  if (camera && scene && renderer) {
    var geometry = new THREE.BoxBufferGeometry(1);

    var offset = (amount - 1) / 2;

    for (var x = 0; x < amount; x++) {
      for (var y = 0; y < amount; y++) {
        for (var z = 0; z < amount; z++) {
          const material = new THREE.MeshPhongMaterial({ flatShading: true });
          let object = new THREE.Mesh(geometry, material);

          object.position.x = offset - x;
          object.position.y = offset - y;
          object.position.z = offset - z;

          state = [
            ...state,
            {
              object,
              position: {
                x: offset - x,
                y: offset - y,
                z: offset - z,
              },
            },
          ];

          scene.add(object);
        }
      }
    }

    var drag = false;

    renderer.domElement.ownerDocument.addEventListener(
      "mouseup",
      onMouseUp,
      false
    );

    renderer.domElement.ownerDocument.addEventListener(
      "mousedown",
      () => (drag = false),
      false
    );

    renderer.domElement.ownerDocument.addEventListener(
      "mousemove",
      () => (drag = true),
      false
    );

    function onMouseUp(e) {
      if (!drag) {
        raycaster.setFromCamera(mouse, camera);

        var intersection = raycaster.intersectObjects(scene.children);
        if (intersection.length > 0) {
          // Add a box when shift key is pressed.
          if (e.shiftKey) {
            const material = new THREE.MeshPhongMaterial({
              flatShading: true,
            });
            let object = new THREE.Mesh(geometry, material);

            buildBox(intersection, object);

            state = [
              ...state,
              {
                object,
                position: {
                  x: object.position.x,
                  y: object.position.y,
                  z: object.position.z,
                },
              },
            ];

            scene.add(object);
          } else {
            const intersectionObject = intersection[0].object;

            //   Remove it from the state.
            state = [
              ...state.filter((object) => object.object !== intersectionObject),
            ];

            // Delete the box.
            intersectionObject.applyMatrix4(deleteMatrix);
          }
        }
      }
    }

    function render() {
      raycaster.setFromCamera(mouse, camera);

      var intersection = raycaster.intersectObjects(scene.children);
      if (intersection.length > 0) {
        if (INTERSECTED != intersection[0].object) {
          currentColor = intersection[0].object.material.color.clone();
          if (INTERSECTED) INTERSECTED.material.color = currentColor;
          intersection[0].object.material.color = skyblue;
          INTERSECTED = intersection[0].object;
        }
      } else {
        if (INTERSECTED) INTERSECTED.material.color = currentColor;
        INTERSECTED = null;
      }

      renderer.render(scene, camera);
    }

    function animate() {
      requestAnimationFrame(animate);

      render();
    }

    animate();
  }

  return <Link to="/">Home</Link>;
};

export default Builder;
