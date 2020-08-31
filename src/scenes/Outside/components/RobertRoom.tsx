import React from "react";
import FramedImage from "three-components/FramedImage";

const RobertRoom = () => {
  return (
    <group rotation={[0, Math.PI / 3, 0]}>
      <group position={[0, 5, -45]}>
        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/getsusall.jpg"
          ratio={[1, 1]}
          sizeScale={5}
          position={[8.5, 0, 8]}
          rotation={[0, -Math.PI / 2, 0]}
          floating
        />
        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/cottoncandy.jpg"
          ratio={[1, 1]}
          sizeScale={5}
          position={[6.5, 0, 0]}
          rotation={[0, -Math.PI / 3, 0]}
          floating
        />
        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/rapture.jpg"
          ratio={[2, 2.5]}
          sizeScale={5}
          position={[0, 0, -4]}
          floating
        />
        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/dontgoin.jpg"
          ratio={[1, 1]}
          sizeScale={5}
          position={[-6.5, 0, 0]}
          rotation={[0, Math.PI / 3, 0]}
          floating
        />
        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/spaceship.jpg"
          ratio={[1, 1]}
          sizeScale={5}
          position={[-8.5, 0, 8]}
          rotation={[0, Math.PI / 2, 0]}
          floating
        />
      </group>
    </group>
  );
};

export default RobertRoom;
