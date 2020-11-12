import { Text } from "@react-three/drei";
import { Arrow } from "spacesvr/components";

const Statement = () => {
  return (
    <group
      name="back-wall"
      rotation={[0, 0, 0]}
      position={[-0.4, 1.7, -9.2]}
      scale={[0.7, 0.7, 0.7]}
    >
      <group position={[-2.75, -1.75, 0]} scale={[2, 2, 2]}>
        <Text
          position={[-0.15, 1, 0]}
          scale={[4.5 * 1.6, 6 * 1.6, 4.5 * 1.6]}
          anchorY="middle"
          maxWidth={3}
          textAlign="left"
          color="black"
        >
          {"VIRTUAL GENESIS"}
        </Text>
        <Text
          position={[0, -0.2, 0]}
          scale={[2, 2, 2]}
          anchorY="middle"
          maxWidth={3}
          textAlign="left"
          color="black"
        >
          {
            "Virtual Genesis is about God breathing life into a virtual universe.\
                        It's a representation of the first code defined, digitally enabled,\
                        virtual volumetric space. It represents the skin or peripheral\
                        exoskeleton humans inhabit to enter the virtual world."
          }
        </Text>
        <group position={[0.4, -0.15, 0]}>
          <Text
            position={[-3, -1, 0]}
            scale={[1.5, 1.5, 1.5]}
            anchorY="middle"
            maxWidth={3}
            textAlign="left"
            color="black"
          >
            @chadknight
          </Text>
          <Text
            position={[0.28, -1, 0]}
            scale={[1.5, 1.5, 1.5]}
            anchorY="middle"
            maxWidth={3}
            textAlign="left"
            color="black"
          >
            ENTER HERE
          </Text>
          <Arrow position={[1, -1.01, 0]} rotation={[0, 0, Math.PI]} dark />
        </group>
      </group>
    </group>
  );
};

export default Statement;
