const RADIUS = 1.85;
const INNER_RADIUS = RADIUS - 0.01;

const SpacesVREntity = (props: JSX.IntrinsicElements["group"]) => {
  return (
    <group {...props}>
      <mesh position-y={RADIUS}>
        <sphereBufferGeometry args={[RADIUS, 20, 20]} />
        <meshBasicMaterial wireframe={true} color={0} />
      </mesh>
      <mesh position-y={RADIUS} rotation-x={Math.PI}>
        <sphereBufferGeometry
          args={[INNER_RADIUS, 20, 20, 0, Math.PI * 2, 0, -Math.PI / 2]}
        />
        <meshBasicMaterial color={0xffffff} />
      </mesh>
      <mesh position-y={RADIUS} rotation-x={-Math.PI / 2}>
        <circleBufferGeometry args={[INNER_RADIUS, 20]} />
        <meshBasicMaterial color={0xffffff} />
      </mesh>
    </group>
  );
};

export default SpacesVREntity;
