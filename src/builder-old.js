import * as THREE from "three";
import { OrbitControls } from "./OrbitControls";

var camera, scene, renderer, currentColor;

var INTERSECTED;
var amount = 4;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(1, 1);

var deleteMatrix = new THREE.Matrix4().scale(new THREE.Vector3(0, 0, 0));
const skyblue = new THREE.Color("skyblue");
let state = [];

init();
animate();

function init() {
  document.getElementById("export").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const exportedState = JSON.stringify({
      name,
      shape: state.map((obj) => obj.position),
    });
    console.log(exportedState);
  });

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(amount, amount, amount);
  camera.lookAt(0, 0, 0);

  scene = new THREE.Scene();

  var light = new THREE.HemisphereLight(0xffffff, 0x000088);
  light.position.set(-1, 1.5, 1);
  scene.add(light);

  var light = new THREE.HemisphereLight(0xffffff, 0x880000, 0.5);
  light.position.set(-1, -1.5, -1);
  scene.add(light);

  var geometry = new THREE.BoxBufferGeometry(1);

  var i = 0;
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

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize, false);
  document.addEventListener("mousemove", onMouseMove, false);

  let drag = false;

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
          const material = new THREE.MeshPhongMaterial({ flatShading: true });
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
    renderer.render(scene, camera);
  }
}

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

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
  requestAnimationFrame(animate);

  render();
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
