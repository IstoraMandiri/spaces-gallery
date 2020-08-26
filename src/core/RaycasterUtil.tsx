import React, { MutableRefObject } from "react";
import { Quaternion, Raycaster, Vector3 } from "three";
import { useFrame, useThree } from "react-three-fiber";

type RaycasterProps = {
  position: MutableRefObject<Vector3>;
  quaternion: MutableRefObject<Quaternion>;
  raycaster: MutableRefObject<Raycaster>;
  initPos?: [number, number, number];
};

const RaycasterUtil: React.FC<RaycasterProps> = (props) => {
  const { position, quaternion, raycaster } = props;

  const { scene } = useThree();

  useFrame(() => {
    if (position.current && quaternion.current) {
      raycaster.current.ray.origin.copy(position.current);
      const lookAt = new Vector3(0, 0, -1);
      lookAt.applyQuaternion(quaternion.current);
      raycaster.current.ray.direction.copy(lookAt);
    }
  });

  return <></>;
};

export default RaycasterUtil;
