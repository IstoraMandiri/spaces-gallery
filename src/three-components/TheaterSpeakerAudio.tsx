import React, { MutableRefObject, useEffect, useRef } from "react";
import * as THREE from "three";
// import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper";
import { useThree } from "react-three-fiber";
import { EnvironmentStoreHook } from "stores/environment";

type VideoPositionalAudioProps = {
  useEnvStore: EnvironmentStoreHook;
  videoScreen: MutableRefObject<HTMLVideoElement | null>;
};

const TheaterSpeakerAudio = (props: VideoPositionalAudioProps) => {
  const { videoScreen, useEnvStore } = props;

  const { camera, scene } = useThree();

  const paused = useEnvStore((st) => st.paused);
  const listener = useRef<THREE.AudioListener>();
  const speaker = useRef<THREE.PositionalAudio>();

  useEffect(() => {
    if (!paused && camera && videoScreen.current && !speaker.current) {
      listener.current = new THREE.AudioListener();
      camera.add(listener.current);

      speaker.current = new THREE.PositionalAudio(listener.current);
      speaker.current.setMediaElementSource(videoScreen.current);
      speaker.current.setRefDistance(2);
      speaker.current.setDirectionalCone(180, 230, 0.1);
      speaker.current.position.set(0, 2.5, 2);
      speaker.current.rotation.set(0, Math.PI, 0);

      // const helper = new PositionalAudioHelper(speaker.current);
      // speaker.current.add(helper);

      scene.add(speaker.current);
    }
  }, [videoScreen.current, camera, speaker.current, listener.current, paused]);

  return null;
};

export default TheaterSpeakerAudio;
