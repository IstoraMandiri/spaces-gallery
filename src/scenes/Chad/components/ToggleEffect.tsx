import { Dispatch, SetStateAction, useRef } from "react";
import { MeshStandardMaterial } from "three";
import { useFrame } from "react-three-fiber";
import { Text } from "@react-three/drei";
import { Interactable } from "spacesvr/modifiers";

type EffectProps = {
  position: [number, number, number];
  rotation?: [number, number, number];
  effect: boolean;
  setEffect: Dispatch<SetStateAction<boolean>>;
  color?: string;
  label?: string;
};

const ToggleEffect = (props: EffectProps) => {
  const { position, rotation, effect, setEffect, color, label = "" } = props;

  const button = useRef<THREE.Mesh>();

  useFrame(({ clock }) => {
    if (button.current) {
      button.current.rotation.x = clock.getElapsedTime() / 10;
      button.current.rotation.y = clock.getElapsedTime() / 10;
      button.current.position.y = Math.sin(clock.getElapsedTime()) / 15 + 1.25;
    }
  });

  const onHover = () =>
    (button?.current?.material as MeshStandardMaterial).color.set("yellow");
  const onUnHover = () =>
    color &&
    (button?.current?.material as MeshStandardMaterial).color.set(color);

  return (
    <group position={position} rotation={rotation}>
      <Interactable
        onClick={() => setEffect(!effect)}
        onHover={onHover}
        onUnHover={onUnHover}
      >
        <mesh position={[0, 1.25, 0]} ref={button}>
          <sphereBufferGeometry attach="geometry" args={[0.25, 50, 50]} />
          <meshStandardMaterial attach="material" color={color} />
        </mesh>
      </Interactable>
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
