import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useThree } from "react-three-fiber";
import { MusicStoreHook } from "scenes/Shirts/stores/music";
import { useEnvironment } from "@spacesvr/core/utils/hooks";

type ShirtsAudioProps = JSX.IntrinsicElements["group"] & {
  useMusicStore: MusicStoreHook;
  url: string;
  muted?: boolean;
};

const ShirtsMusic = (props: ShirtsAudioProps) => {
  const { useMusicStore, url, muted } = props;

  const { container, paused } = useEnvironment();
  const audioRef = useRef<HTMLAudioElement>();
  const speaker = useRef<THREE.PositionalAudio>();
  const { camera, scene } = useThree();
  const listener = useRef<THREE.AudioListener>();
  const setAnalyser = useMusicStore((st) => st.setAnalyser);
  const setAudioRef = useMusicStore((st) => st.setAudioRef);

  useEffect(() => {
    if (container && !audioRef.current) {
      const audio = document.createElement("audio");
      audio.src = `https://d27rt3a60hh1lx.cloudfront.net/audio/portal-shirt/${url}`;
      audio.autoplay = false;
      audio.preload = "auto";
      audio.crossOrigin = "anonymous";
      audio.loop = true;
      container?.appendChild(audio);

      if (muted) {
        audio.muted = true;
      } else {
        audio.muted = false;
      }

      audioRef.current = audio;
      setAudioRef(audioRef);

      return () => {
        audio.pause();

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
      speaker.current.position.set(0, 10, 1);
      speaker.current.setRefDistance(0.5);
      speaker.current.setRolloffFactor(0.2);
      speaker.current.setVolume(10);

      //init audio analyser
      setAnalyser(new THREE.AudioAnalyser(speaker.current, 128));
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

export default ShirtsMusic;
