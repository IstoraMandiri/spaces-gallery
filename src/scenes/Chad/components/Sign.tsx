import { useRef } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "react-three-fiber";

type SignProps = {
  text: string;
  signSize?: [number, number, number];
  dark?: boolean;
  floating?: boolean;
} & JSX.IntrinsicElements["group"];

const Sign = (props: SignProps) => {
  const { text, signSize = [2, 0.6, 0.25], dark, ...restProps } = props;

  const group = useRef<THREE.Group>();

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y =
        signSize[1] * 0.2 * (Math.sin(clock.getElapsedTime() * 0.5) - 0.5);
    }
  });

  return (
    <group {...restProps}>
      <group ref={group}>
        <Text color={dark ? "white" : "black"}>{text}</Text>
        <mesh position={[0, 0, -signSize[2] / 2 - 0.001]}>
          <boxBufferGeometry args={signSize} attach="geometry" />
          <meshStandardMaterial
            color={dark ? "black" : "white"}
            attach="material"
          />
        </mesh>
      </group>
    </group>
  );
};

export default Sign;
