import ToggleEffect from "scenes/Chad/components/ToggleEffect";
import { useState } from "react";
import { Color } from "three";
import { Text } from "@react-three/drei";
import Arrow from "@spacesvr/components/Arrow";

const ButtonTest = () => {
  const [effect, setEffect] = useState(false);

  const color = new Color().setHSL(Math.random(), 1, 0.7);

  return (
    <group position={[0, 0, -0.5]}>
      <ToggleEffect
        position={[-6.5, -2, -5]}
        effect={effect}
        setEffect={setEffect}
        color="purple"
      />
      <group position={[-6.5, -0.7, -3.5]} rotation={[0, Math.PI / 2, 0]}>
        <Text fontSize={0.2} color="black">
          Click Me
        </Text>
        <Arrow rotation={[0, 0, Math.PI]} position={[0.65, -0.01, 0]} dark />
      </group>
      <pointLight
        position={[-2, 2, -6]}
        intensity={0.5}
        distance={10}
        color={color}
      />
    </group>
  );
};

export default ButtonTest;
