import React, { Suspense } from "react";
import { EnvironmentStoreHook } from "stores/environment";
import SantiRoomA from "models/SantiRoomA";

type SantiProps = {
  useEnvStore: EnvironmentStoreHook;
};

const SantiRoom = (props: SantiProps) => {
  const { useEnvStore } = props;

  return (
    <group rotation={[0, (Math.PI * 5) / 3, 0]}>
      <Suspense fallback={null}>
        <SantiRoomA useEnvStore={useEnvStore} />
      </Suspense>
    </group>
  );
};

export default SantiRoom;
