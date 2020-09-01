import * as THREE from "three";
import React, { useRef, useEffect, MutableRefObject } from "react";
import { extend, useFrame, useThree } from "react-three-fiber";
import { Quaternion, Vector3 } from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { EnvironmentStoreHook } from "stores/environment";

extend({ PointerLockControls });

type MouseFPSCameraProps = {
  quaternion: MutableRefObject<Quaternion>;
  position: MutableRefObject<Vector3>;
  useEnvStore: EnvironmentStoreHook;
};

/**
 * MouseFPSCamera controls the camera rotation, set up as a first
 * person view. It takes care of user input to set the camera rotation
 * and passed the quaternion of the camera up. Its position is attached
 * to the passed position, probably the player's position.
 *
 * @param props
 * @constructor
 */
const MouseFPSCamera = (props: MouseFPSCameraProps) => {
  const { quaternion, position, useEnvStore } = props;

  const setPaused = useEnvStore((st) => st.setPaused);
  const paused = useEnvStore((st) => st.paused);
  const addEvent = useEnvStore((st) => st.addEvent);
  const { scene, camera, gl } = useThree();

  const controls = useRef<PointerLockControls>();
  const clickContainer = document.getElementById("click-container");
  const pauseButton = document.getElementById("pause-button");

  useFrame(() => {
    if (controls?.current?.isLocked === true) {
      const lookAt = new THREE.Vector3(0, 0, -1);
      lookAt.applyQuaternion(camera.quaternion);
      lookAt.multiply(new THREE.Vector3(1, 0, 1)).normalize();
      quaternion.current = camera.quaternion;
    }
    if (position.current) {
      const { x: pX, y: pY, z: pZ } = position.current;
      camera?.position?.set(pX, pY, pZ);
    }
  });

  // pointer locking events
  const onLock = () => {
    // dont't need to set if it's already set
    if (paused) {
      setPaused(false);
    }
  };
  const onUnlock = () => {
    // dont't need to set if it's already set
    if (!paused) {
      setPaused(true);
    }
  };
  const lockCamera = () => controls?.current?.lock();
  const unlockCamera = () => controls?.current?.unlock();

  useEffect(() => {
    // initial camera rotation
    if (camera && quaternion) {
      camera?.lookAt(0, 2, 0);
      quaternion.current = camera.quaternion;
    }

    // lock and unlock controls based on set paused value
    addEvent("paused", (pausedVal: boolean, overlayVal: string | undefined) => {
      if (pausedVal) {
        unlockCamera();
      } else {
        lockCamera();
      }
    });
  }, []);

  useEffect(() => {
    clickContainer?.addEventListener("click", lockCamera);
    pauseButton?.addEventListener("click", lockCamera);
    controls?.current?.addEventListener("lock", onLock);
    controls?.current?.addEventListener("unlock", onUnlock);

    return () => {
      clickContainer?.removeEventListener("click", lockCamera);
      pauseButton?.removeEventListener("click", lockCamera);
      controls?.current?.removeEventListener("lock", onLock);
      controls?.current?.removeEventListener("unlock", onUnlock);
    };
  }, [paused]);

  // @ts-ignore
  return <pointerLockControls ref={controls} args={[camera, gl.domElement]} />;
};

export default MouseFPSCamera;
