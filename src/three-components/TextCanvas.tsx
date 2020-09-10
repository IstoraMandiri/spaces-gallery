import React from "react";
import { Text } from "drei";

type TextCanvasProps = {
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: number;
  color?: string;
  frameColor?: string;
  font?: string;
  maxWidth?: number;
  maxHeight?: number;
  frameWidth?: number;
  frameHeight?: number;
  textAlign?: "center" | "left" | "right" | "justify";
  content?: string;
};

const TextCanvas = (props: TextCanvasProps) => {
  const {
    position,
    rotation = [0, 0, 0],
    maxWidth = 2,
    maxHeight = 5,
    frameWidth = 3,
    frameHeight = 2,
    size = 0.3,
    color = "black",
    frameColor = "white",
    font,
    textAlign = "center",
    content = "Hello World",
  } = props;

  return (
    <group position={position} rotation={rotation}>
      <group position={[0, 0, -0.06]}>
        <mesh>
          <boxBufferGeometry attach="geometry" args={[3, 2, 0.1]} />
          <meshBasicMaterial attach="material" color={frameColor} />
        </mesh>
      </group>
      <Text
        fontSize={size}
        maxWidth={maxWidth}
        font={font}
        color={color}
        textAlign={textAlign}
        anchorX="center"
        anchorY="middle"
      >
        {content}
      </Text>
    </group>
  );
};

export default TextCanvas;
