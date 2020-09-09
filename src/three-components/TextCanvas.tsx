import React from "react";
import { Text } from "troika-three-text";
import * as THREE from "three";
import { extend, useLoader } from "react-three-fiber";

extend({ Text });

const text = "Hello World";

type TextCanvasProps = {
  size?: 100;
  color?: "white";
  font?: "Ariel";
  bevelEnabled?: true;
  bevelThickness?: 5;
};

const TextCanvas = (props: TextCanvasProps) => {
  const font = useLoader(THREE.FontLoader, "/fonts/Hello_Valentina.ttf");
  console.log(font);
  return (
    <mesh>
      <meshBasicMaterial attach="material" color="red" />
      <textBufferGeometry
        attach="geometry"
        args={["Hello World", { font, size: 30 }]}
      />
    </mesh>
  );
};

export default TextCanvas;
