import React, { MutableRefObject } from "react";
import { EnvironmentStoreHook } from "@spacesvr/core/stores/environment";
import RightWall from "./components/RightWall";
import Credits from "./components/Credits";
import Statement from "./components/Statement";
import ButtonTest from "./components/ButtonTest";
import { Raycaster } from "three";

type EntranceType = {
  raycaster: MutableRefObject<Raycaster>;
};

const ChadEntrance = (props: EntranceType) => {
  const { raycaster } = props;

  // light in button test

  return (
    <group position={[-2, -2, 65]}>
      <Statement />
      <Credits />
      <RightWall />
      <ButtonTest raycaster={raycaster} />
    </group>
  );
};

export default ChadEntrance;
