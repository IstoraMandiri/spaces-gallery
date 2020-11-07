const SpacesVREntity = () => {
  return (
    <mesh>
      <sphereBufferGeometry args={[5, 20, 20]} />
      <meshBasicMaterial wireframe={true} wireframeLinewidth={8} color={0} />
    </mesh>
  );
};

export default SpacesVREntity;
