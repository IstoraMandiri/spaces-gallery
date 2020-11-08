import { Suspense, useMemo } from "react";
import Video from "@spacesvr/components/Video";
import JustinSkull from "scenes/Opening/models/JustinSkull";
import { SpotLight } from "three";

const JustinRoom = () => {
  const light = useMemo(() => new SpotLight(), []);
  const lightArgs = {
    distance: 8,
    color: 0xffffff,
    intensity: 7,
    angle: Math.PI / 2.4,
    penumbra: 0.1,
  };

  return (
    <group rotation={[0, (Math.PI * 6) / 3, 0]}>
      <group position={[0, 5.5, -42]}>
        <Video
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/justin/skullfloral-final.mp4"
          ratio={[1, 1]}
          sizeScale={6.25}
          rotation={[0, -Math.PI / 3, 0]}
          position={[6, 0, -3]}
          muted
          framed
        />
        <group position={[0, -1, 0]}>
          <Suspense fallback={null}>
            <JustinSkull
              position={[-4, 0, -4]}
              rotation={[0, Math.PI / 2, 0]}
            />
          </Suspense>
          <group position={[-1, 1, 0]}>
            <primitive object={light} {...lightArgs} />
            <primitive object={light.target} position={[-1, -1, -1]} />
          </group>
        </group>
      </group>
    </group>
  );
};

export default JustinRoom;
