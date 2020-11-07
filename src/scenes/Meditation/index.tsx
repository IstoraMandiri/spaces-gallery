import { useAnalytics } from "services/analytics";
import StandardEnvironment from "@spacesvr/core/environments/StandardEnvironment";

const Meditation = () => {
  useAnalytics();

  return (
    <StandardEnvironment>
      <fog attach="fog" args={[0xe7e7e7, 1, 10]} />
      <ambientLight intensity={1} />
    </StandardEnvironment>
  );
};

export default Meditation;
