import React, { MutableRefObject, useEffect, useRef } from "react";
import { default as THREE, Quaternion, Vector3 } from "three";
import { useFrame } from "react-three-fiber";
import { EnvironmentStoreHook } from "stores/environment";

const VELOCITY_FACTOR = 350;

type VelocityControllerType = {
  useEnvStore: EnvironmentStoreHook;
  quaternion: MutableRefObject<Quaternion>;
  direction: MutableRefObject<Vector3>;
  body: React.MutableRefObject<THREE.Object3D | undefined>;
  bodyApi: any;
};

const VelocityController = (props: VelocityControllerType) => {
  const { direction, body, bodyApi, useEnvStore, quaternion } = props;

  // get pause status
  const paused = useEnvStore((st) => st.paused);

  // refs
  const prevTime = useRef(performance.now());
  const velocity = useRef(new Vector3(0, 0, 0));

  // update velocity ref every frame
  useEffect(
    () =>
      bodyApi.velocity.subscribe((v: any) =>
        velocity.current.set(v[0], v[1], v[2])
      ),
    []
  );

  useFrame(() => {
    // update time
    const time = performance.now();

    if (!paused) {
      // get time since last computation
      const delta = (time - prevTime.current) / 1000;

      // get forward/back movement and left/right movement velocities
      const inputVelocity = new Vector3(0, 0, 0);
      inputVelocity.x = direction.current.x * delta * 0.75 * VELOCITY_FACTOR;
      inputVelocity.z = direction.current.y * delta * VELOCITY_FACTOR;

      // apply quaternion to get adjusted direction based on camera
      const moveQuaternion = quaternion.current.clone();
      moveQuaternion.x = 0;
      moveQuaternion.z = 0;
      inputVelocity.applyQuaternion(moveQuaternion);

      // keep y velocity intact
      inputVelocity.add(new Vector3(0, velocity.current.y, 0));

      // update velocity
      bodyApi?.velocity.set(inputVelocity.x, inputVelocity.y, inputVelocity.z);
    } else {
      // stop player from moving when paused
      bodyApi?.velocity.set(0, 0, 0);
    }

    // update prev time
    prevTime.current = time;
  });

  return null;
};

export default VelocityController;
