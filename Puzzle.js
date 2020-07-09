import React from "react";
import * as THREE from "three";

const amount = 4;
const offset = (amount - 1) / 2;
let object;

const Puzzle = ({ camera, scene, renderer, mouse, puzzle }) => {
  const material = new THREE.MeshPhongMaterial({ flatShading: true });
  puzzle.shape.forEach((box) => {
    const geometry = new THREE.BoxBufferGeometry(1);
    object = new THREE.Mesh(geometry, material);

    object.position.x = box.x;
    object.position.y = box.y;
    object.position.z = box.z;

    scene.add(object);
  });

  function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  }

  animate();
  return <div>asdf</div>;
};

export default Puzzle;
