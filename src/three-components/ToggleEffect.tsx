import React, { useCallback, useRef, useState, useEffect } from "react";
import { Raycaster } from "three";
import { useFrame } from "react-three-fiber";
import { Text } from "drei";

type EffectProps = {
  position: [number, number, number];
  rotation?: [number, number, number];
  raycaster: React.MutableRefObject<Raycaster>;
  effect: boolean;
  setEffect: React.Dispatch<React.SetStateAction<boolean>>;
  color?: string;
  label?: string;
};

const ToggleEffect = (props: EffectProps) => {
  const {
    position,
    rotation,
    effect,
    setEffect,
    raycaster,
    color,
    label = "",
  } = props;

  const button = useRef<THREE.Mesh>();

  const [hovered, setHovered] = useState<boolean>(false);

  useFrame(({ clock }) => {
    if (button.current) {
      button.current.rotation.x = clock.getElapsedTime() / 10;
      button.current.rotation.y = clock.getElapsedTime() / 10;
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
  }, [hovered, effect]);

  useEffect(() => {
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 1.25, 0]} ref={button}>
        <sphereBufferGeometry attach="geometry" args={[0.25, 50, 50]} />
        <meshStandardMaterial
          attach="material"
          color={hovered ? "yellow" : color}
        />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <boxBufferGeometry attach="geometry" args={[0.5, 1, 0.5]} />
        <meshStandardMaterial attach="material" color="white" />
      </mesh>
      <group>
        <Text>{label}</Text>
      </group>
    </group>
  );
};

export default ToggleEffect;
