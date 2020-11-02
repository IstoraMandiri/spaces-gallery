import React, { useMemo } from "react";
import { EnvironmentStoreHook } from "@spacesvr/core/stores/environment";
import { Color } from "three";

type BallonPos = {
  angle: number;
  dist: number;
  seed: number;
};

const NUM_BALLOONS = 500;

const Balloon = (props: BallonPos) => {
  const { angle, dist, seed } = props;

  return (
    <group rotation={[0, angle, 0]}>
      <group position={[0, 0, -dist]}>
        <mesh>
          <sphereBufferGeometry args={[seed * 1.8 + 0.3, 30, 30]} />
          <meshBasicMaterial color={new Color().setHSL(seed * 360, 0.8, 0.8)} />
        </mesh>
      </group>
    </group>
  );
};

const Balloons = () => {
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
          angle={pos.angle}
          dist={pos.dist}
          seed={pos.seed}
        />
      ))}
    </>
  );
};

export default Balloons;
