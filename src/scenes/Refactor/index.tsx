import React from "react";

import { useAnalytics } from "services/analytics";
import StandardEnvironment from "@spacesvr/core/environments/StandardEnvironment";

const Refactor = () => {
  useAnalytics();

  return (
    <StandardEnvironment>
      <fog attach="fog" args={[0xe7e7e7, 1, 10]} />
      <ambientLight intensity={1} />
      <pointLight intensity={5} color={"white"} distance={55} />
    </StandardEnvironment>
  );
};

export default Refactor;
