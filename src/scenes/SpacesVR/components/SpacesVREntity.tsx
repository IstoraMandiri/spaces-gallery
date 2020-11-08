import Floating from "@spacesvr/modifiers/Floating";
import SpacesHome from "./SpacesHome";

const RADIUS = 1.85;
const HEIGHT = RADIUS + 1;
const INNER_RADIUS = RADIUS + 0.01;
const SUBDIVISIONS = 32;

const SpacesVREntity = (props: JSX.IntrinsicElements["group"]) => {
  return (
    <group {...props}>
      <Floating>
        <SpacesHome position-y={HEIGHT} />
        <mesh position-y={HEIGHT} castShadow>
          <sphereBufferGeometry args={[RADIUS, SUBDIVISIONS, SUBDIVISIONS]} />
          <meshStandardMaterial wireframe={true} color={0} />
        </mesh>
        <mesh position-y={HEIGHT} rotation-x={Math.PI} castShadow>
          <sphereBufferGeometry
            args={[
              INNER_RADIUS,
              SUBDIVISIONS,
              SUBDIVISIONS,
              0,
              Math.PI * 2,
              0,
              -Math.PI / 2,
            ]}
          />
          <meshStandardMaterial color={0xffffff} />
        </mesh>
        <mesh position-y={HEIGHT} rotation-x={-Math.PI / 2} castShadow>
          <circleBufferGeometry args={[INNER_RADIUS, SUBDIVISIONS]} />
          <meshStandardMaterial color={0xffffff} />
        </mesh>
      </Floating>
    </group>
  );
};

export default SpacesVREntity;
