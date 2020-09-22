import React, { Suspense, useMemo } from "react";
import Simpleballoon from "models/Simpleballoon";
import { EnvironmentStoreHook } from "stores/environment";

type BallonPos = {
  angle: number;
  dist: number;
  seed: number;
};

const NUM_BALLOONS = 500;

const Balloon = (props: { useEnvStore: EnvironmentStoreHook } & BallonPos) => {
  const { useEnvStore, angle, dist, seed } = props;

  return (
    <group rotation={[0, angle, 0]}>
      <group position={[0, 0, -dist]}>
        <Suspense fallback={null}>
          <Simpleballoon useEnvStore={useEnvStore} seed={seed} />
        </Suspense>
      </group>
    </group>
  );
};

const Balloons = (props: { useEnvStore: EnvironmentStoreHook }) => {
  const { useEnvStore } = props;

  const positions: BallonPos[] = useMemo(() => {
    const arr = [];
    for (let i = 0; i < NUM_BALLOONS; i++) {
      arr.push({
        angle: Math.random() * Math.PI * 2,
        dist: Math.random() * 50 + 5,
        seed: Math.random(),
      });
    }
    return arr;
  }, []);

  console.log(positions);

  if (!positions) {
    return <></>;
  }

  return (
    <>
      {positions.map((pos) => (
        <Balloon
          key={pos.seed}
          useEnvStore={useEnvStore}
          angle={pos.angle}
          dist={pos.dist}
          seed={pos.seed}
        />
      ))}
    </>
  );
};

export default Balloons;
