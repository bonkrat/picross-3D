import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "./OrbitControls";

const onWindowResize = (camera, renderer) => () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

function onMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

const mouse = new THREE.Vector2(1, 1);

const cameraPosition = {
  x: 5,
  y: 5,
  z: 5,
};

const Scene = ({ children }) => {
  let scene, renderer;

  useEffect(() => {
    scene = new THREE.Scene();
    return () => scene.dispose();
  }, []);

  scene = new THREE.Scene();

  var light = new THREE.HemisphereLight(0xffffff, 0x000088);
  light.position.set(-1, 1.5, 1);
  scene.add(light);

  var light = new THREE.HemisphereLight(0xffffff, 0x880000, 0.5);
  light.position.set(-1, -1.5, -1);
  scene.add(light);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  camera.lookAt(0, 0, 0);
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const sceneDomElement = document.getElementById("scene");

  if (sceneDomElement.childNodes.length)
    sceneDomElement.removeChild(sceneDomElement.childNodes[0]);

  sceneDomElement.appendChild(renderer.domElement);

  new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize(camera, renderer), false);
  document.addEventListener("mousemove", onMouseMove, false);

  return children({ camera, scene, renderer, mouse });
};

export default Scene;
