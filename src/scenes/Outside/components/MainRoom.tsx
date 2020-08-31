import React from "react";
import FramedImage from "three-components/FramedImage";

const MainRoom = () => {
  return (
    <group>
      <FramedImage
        src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/cottoncandy.jpg"
        ratio={[1, 1]}
        sizeScale={5}
        position={[4, 2, 0]}
        floating
      />
    </group>
  );
};

export default MainRoom;
