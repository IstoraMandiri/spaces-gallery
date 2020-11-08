import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useThree } from "react-three-fiber";
import { useEnvironment } from "@spacesvr/core/utils/hooks";
import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper";

type OutsideAudioProps = JSX.IntrinsicElements["group"] & {
  url: string;
  pos?: [number, number, number];
  dCone?: [number, number, number];
  rollOff?: number;
  volume?: number;
  helper?: boolean;
};

const OutsideAudio = (props: OutsideAudioProps) => {
  const {
    url,
    pos = [0, 0, 0],
    dCone,
    rollOff = 1,
    volume = 7,
    helper,
  } = props;
  const { paused, container } = useEnvironment();

  const audioRef = useRef<HTMLAudioElement>();
  const speaker = useRef<THREE.PositionalAudio>();
  const { camera, scene } = useThree();
  const listener = useRef<THREE.AudioListener>();

  useEffect(() => {
    if (container && !audioRef.current) {
      const audio = document.createElement("audio");
      audio.src = url;
      audio.autoplay = false;
      audio.preload = "auto";
      audio.crossOrigin = "anonymous";
      audio.loop = true;
      container?.appendChild(audio);

      audioRef.current = audio;

      return () => {
        audio.pause();
        // audio.remove();
        // audioRef.current = undefined;

        if (speaker.current) {
          speaker.current.disconnect();
          speaker.current = undefined;
        }
        if (listener.current) {
          camera.remove(listener.current);
        }
      };
    }
  }, [container, audioRef.current]);

  // audio
  useEffect(() => {
    if (!paused && camera && audioRef.current && !speaker.current) {
      listener.current = new THREE.AudioListener();
      camera.add(listener.current);

      speaker.current = new THREE.PositionalAudio(listener.current);
      speaker.current.setMediaElementSource(audioRef.current);
      speaker.current.position.set(pos[0], pos[1], pos[2]);
      if (dCone) {
        speaker.current.setDirectionalCone(dCone[0], dCone[1], dCone[2]);
      }
      speaker.current.setRolloffFactor(rollOff);
      speaker.current.setVolume(volume);

      if (helper) {
        const helper = new PositionalAudioHelper(speaker.current);
        speaker.current.add(helper);
      }

      scene.add(speaker.current);
    }
  }, [audioRef.current, camera, speaker.current, listener.current, paused]);

  useEffect(() => {
    if (!paused && audioRef.current && audioRef.current.paused) {
      audioRef.current.play();
    }
  }, [paused, audioRef.current]);

  return <></>;
};

export default OutsideAudio;
