import React, { MutableRefObject } from "react";
import { Quaternion, Vector3 } from "three";
import KeyboardMovement from "./KeyboardMovement";
import MouseFPSCamera from "./MouseFPSCamera";
import { EnvironmentStoreHook } from "stores/environment";

type DesktopControlsProps = {
  direction: MutableRefObject<Vector3>;
  quaternion: MutableRefObject<Quaternion>;
  position: MutableRefObject<Vector3>;
  useEnvStore: EnvironmentStoreHook;
};

const DesktopControls = (props: DesktopControlsProps) => {
  const { direction, useEnvStore, quaternion, position } = props;

  return (
    <>
      <KeyboardMovement direction={direction} />
      <MouseFPSCamera
        quaternion={quaternion}
        position={position}
        useEnvStore={useEnvStore}
      />
    </>
  );
};

export default DesktopControls;
