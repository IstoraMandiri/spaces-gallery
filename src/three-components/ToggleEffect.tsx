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
      <mesh position={[0, 1, 0]} ref={button}>
        <sphereBufferGeometry attach="geometry" args={[0.25, 50, 50]} />
        <meshBasicMaterial
          attach="material"
          color={hovered ? "yellow" : "red"}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[0.5, 1.5, 0.5]} />
        <meshBasicMaterial attach="material" color="white" />
      </mesh>
    </group>
  );
};

export default ToggleEffect;
