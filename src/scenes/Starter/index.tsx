import { useAnalytics } from "services/analytics";
import { StandardEnvironment } from "spacesvr/core";
import { Background, Logo } from "spacesvr/components";
import { Vector3 } from "three";

const Starter = () => {
  useAnalytics();

  const INITIAL_POSITION = new Vector3(0, 1, 4);

  return (
    <StandardEnvironment player={{ pos: INITIAL_POSITION }}>
      <Background color={0xffffff} />
      <ambientLight intensity={1} />
      <pointLight intensity={1} position={[0, 10, 0]} />
      <Logo floating rotating />
    </StandardEnvironment>
  );
};

export default Starter;
