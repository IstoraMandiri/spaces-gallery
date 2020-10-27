import React, { MutableRefObject, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import TouchFPSCamera from "./TouchFPSCamera";
import NippleMovement from "./NippleMovement";
import { EnvironmentStoreHook } from "stores/environment";

type MobileControlsProps = {
  direction: MutableRefObject<Vector3>;
  quaternion: MutableRefObject<Quaternion>;
  position: MutableRefObject<Vector3>;
  useEnvStore: EnvironmentStoreHook;
};

const MobileControls = (props: MobileControlsProps) => {
  const { direction, useEnvStore, quaternion, position } = props;

  const nippleContainer = useRef<HTMLElement>(null);

  return (
    <>
      <NippleMovement
        useEnvStore={useEnvStore}
        direction={direction}
        nippleContainer={nippleContainer}
      />
      <TouchFPSCamera
        quaternion={quaternion}
        position={position}
        nippleContainer={nippleContainer}
      />
    </>
  );
};

export default MobileControls;
