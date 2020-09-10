import React, { useCallback, useRef, useState, useEffect } from "react";
import { Raycaster } from "three";
import { useFrame } from "react-three-fiber";

type EffectProps = {
  position: [number, number, number];
  raycaster: React.MutableRefObject<Raycaster>;
  effect: boolean;
  setEffect: React.Dispatch<React.SetStateAction<boolean>>;
};

const ToggleEffect = (props: EffectProps) => {
  const { position, effect, setEffect, raycaster } = props;

  const button = useRef<THREE.Mesh>();

  const [hovered, setHovered] = useState<boolean>(false);
  const [scale, setScale] = useState<boolean>(false);

  useFrame(() => {
    if (button.current) {
      const intersections = raycaster.current.intersectObject(button.current);
      if (intersections && intersections.length > 0) {
        if (!hovered) {
          setHovered(true);
        }
      } else {
        if (hovered) {
          setHovered(false);
        }
      }
    }
  });

  const onClick = useCallback(() => {
    if (hovered) {
      setScale(!scale);
      setEffect(!effect);
    }
  }, [hovered]);

  useEffect(() => {
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  });

  return (
    <group position={position}>
      <mesh ref={button}>
        <boxBufferGeometry
          attach="geometry"
          args={scale ? [2, 2, 2] : [1, 1, 1]}
        />
        <meshBasicMaterial
          attach="material"
          color={hovered ? "yellow" : "red"}
        />
      </mesh>
    </group>
  );
};

export default ToggleEffect;
