const PLANE_WIDTH = 200;
const PLANE_HEIGHT = 200;

const Floor = () => {
  return (
    <group>
      <mesh receiveShadow rotation-x={-Math.PI / 2}>
        <planeBufferGeometry args={[PLANE_WIDTH, PLANE_HEIGHT]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>
      <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-0.01}>
        <planeBufferGeometry args={[PLANE_WIDTH, PLANE_HEIGHT]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  );
};

export default Floor;
