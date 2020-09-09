import React, { useRef, useEffect, MutableRefObject } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Quaternion, Raycaster, Vector3 } from "three";
import { isMobile } from "react-device-detect";

import MobileControls from "core/Controls/MobileControls";
import DesktopControls from "core/Controls/DesktopControls";
import { EnvironmentStoreHook } from "stores/environment";
import RaycasterUtil from "core/RaycasterUtil";
import {
  useCapsuleCollider,
  VisibleCapsuleCollider,
} from "./components/CapsuleCollider";
import VelocityController from "./components/VelocityController";

const SHOW_PLAYER_HITBOX = true;

type PlayerProps = {
  useEnvStore: EnvironmentStoreHook;
  initPos?: [number, number, number];
  initLook?: [number, number, number];
  raycaster?: MutableRefObject<Raycaster>;
};

/**
 * Player represents a physics-enabled player in the environment, complete with a
 * control scheme and a physical representation that interacts with other physics-
 * enabled objects.
 *
 * There should only be one player per environment.
 *
 * @constructor
 */
const Player = (props: PlayerProps) => {
  const { useEnvStore, initPos, initLook = [0, 2, 0], raycaster } = props;
  const { camera } = useThree();

  // physical body
  const [bodyRef, bodyApi] = useCapsuleCollider({ initPos });

  // producer
  const position = useRef(new Vector3(0, 0, 0));

  // consumer (from camera controls)
  const direction = useRef(new Vector3());
  const quaternion = useRef(new Quaternion(0, 0, 0, 0)); // rad on y axis

  useEffect(() => {
    // store position and velocity
    bodyApi.position.subscribe((p) => position.current.set(p[0], p[1], p[2]));
    camera?.lookAt(initLook[0], initLook[1], initLook[2]);
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileControls
          quaternion={quaternion}
          position={position}
          useEnvStore={useEnvStore}
          direction={direction}
        />
      ) : (
        <DesktopControls
          quaternion={quaternion}
          position={position}
          useEnvStore={useEnvStore}
          direction={direction}
        />
      )}
      {raycaster && raycaster.current && (
        <RaycasterUtil
          quaternion={quaternion}
          position={position}
          raycaster={raycaster}
        />
      )}
      <VelocityController
        useEnvStore={useEnvStore}
        direction={direction}
        quaternion={quaternion}
        body={bodyRef}
        bodyApi={bodyApi}
      />
      <mesh ref={bodyRef} name="player">
        {SHOW_PLAYER_HITBOX && <VisibleCapsuleCollider />}
      </mesh>
    </>
  );
};

export default Player;
