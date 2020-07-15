const buildCube = (amount) => {
  let shape = [];

  var offset = (amount - 1) / 2;

  for (var x = 0; x < amount; x++) {
    for (var y = 0; y < amount; y++) {
      for (var z = 0; z < amount; z++) {
        shape = [
          ...shape,
          {
            x: offset - x,
            y: offset - y,
            z: offset - z,
          },
        ];
      }
    }
  }

  return {
    name: "default",
    shape,
  };
};

export default buildCube;
