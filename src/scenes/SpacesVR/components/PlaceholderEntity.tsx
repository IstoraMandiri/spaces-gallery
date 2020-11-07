const PlaceholderEntity = (props: any) => {
  const color = Math.random() * 0xffffff;
  const dist = Math.random() * 100 + 20;
  const angle1 = Math.random() * Math.PI * 2;
  const angle2 = Math.random() * Math.PI - Math.PI / 2;

  console.log(dist, angle1, angle2);

  return (
    <group rotation-x={angle2} rotation-y={angle1} {...props}>
      <group position-z={dist}>
        <mesh>
          <sphereBufferGeometry args={[5, 20, 20]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </group>
    </group>
  );
};

export default PlaceholderEntity;
