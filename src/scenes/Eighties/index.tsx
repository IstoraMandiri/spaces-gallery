import { Logo } from "@spacesvr/components/";
import { useAnalytics } from "services/analytics";
import Grid from "./components/Grid";
import { StandardEnvironment } from "@spacesvr/core";

const Eighties = () => {
  useAnalytics();

  return (
    <StandardEnvironment>
      <Grid />
      <Grid position-y={8} />
      <Logo floating rotating position={[0, 1.25, 0]} />
      <fog attach="fog" args={[0x000000, 1, 100]} />
      <ambientLight intensity={1} />
      <pointLight intensity={5} color={"white"} distance={55} />
    </StandardEnvironment>
  );
};

export default Eighties;
