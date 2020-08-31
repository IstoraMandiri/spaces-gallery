import React from "react";
import FramedImage from "three-components/FramedImage";

const RobertRoom = () => {
  return (
    <group rotation={[0, Math.PI + Math.PI / 6, 0]}>
      <group position={[0, 0, 0]}>
        <mesh>
          <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial attach="material" color="red" />
        </mesh>
        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/cottoncandy.jpg"
          ratio={[1, 1]}
          sizeScale={5}
          position={[4, 2.5, 0]}
          floating
        />
        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/dontgoin.jpg"
          ratio={[1, 1]}
          sizeScale={5}
          position={[-4, 2.5, 0]}
          floating
        />
        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/getsusall.jpg"
          ratio={[1, 1]}
          sizeScale={5}
          position={[0, 2.5, 0]}
          floating
        />
      </group>
    </group>
  );
};

export default RobertRoom;
