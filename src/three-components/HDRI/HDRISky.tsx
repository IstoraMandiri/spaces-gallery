import React, { useEffect } from "react";

import { useThree } from "react-three-fiber";
import { PMREMGenerator, UnsignedByteType } from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const HDRIImg =
  "https://dwvo2npct47gg.cloudfront.net/hdr/PaintedSky_Dawn_Aurora_bigger.hdr";

const HDRISky = () => {
  const { gl, scene } = useThree();

  // pmrem generator for hdri loading
  const pmremGenerator = new PMREMGenerator(gl);
  pmremGenerator.compileEquirectangularShader();

  // actual file loader
  const loader = new RGBELoader();
  loader.setDataType(UnsignedByteType);

  useEffect(() => {
    loader.load(HDRIImg, (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;

      // sent envmap onto scene env and background
      scene.environment = envMap;
      scene.background = envMap;

      texture.dispose();
      pmremGenerator.dispose();
    });
  }, [scene, loader, pmremGenerator]);

  return null;
};

export default HDRISky;
