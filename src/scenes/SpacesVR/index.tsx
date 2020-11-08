import { useAnalytics } from "services/analytics";
import SpacesVREntity from "./components/SpacesVREntity";
import Floor from "./components/Floor";
import { softShadows } from "@react-three/drei";
import Entities from "./components/Entities";
import StandardEnvironment from "@spacesvr/core/environments/StandardEnvironment";
import Background from "@spacesvr/components/Background";

const RENDER_DIST = 50;

softShadows({
  frustrum: 3.75, // Frustrum width (default: 3.75)
  size: 0.001, // World size (default: 0.005)
  near: 7.5, // Near plane (default: 9.5)
  samples: 17, // Samples (default: 17)
  rings: 11, // Rings (default: 11)
});

const SpacesVR = () => {
  useAnalytics();

  return (
    <StandardEnvironment>
      <fog attach="fog" args={[0xfffffff, 0, RENDER_DIST]} />
      <Background color={0xffffff} />
      <SpacesVREntity />
      <Floor />
      <Entities renderdist={RENDER_DIST} />
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[0, RENDER_DIST, 0]}
        intensity={2}
        castShadow
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
        shadow-camera-left={-RENDER_DIST}
        shadow-camera-right={RENDER_DIST}
        shadow-camera-top={RENDER_DIST}
        shadow-camera-bottom={-RENDER_DIST}
      />
    </StandardEnvironment>
  );
};

export default SpacesVR;
