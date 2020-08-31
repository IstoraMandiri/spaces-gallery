import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "react-three-fiber";
import { Color, Vector2 } from "three";
import { EnvironmentStoreHook } from "stores/environment";
import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper";

type FramedVideoProps = JSX.IntrinsicElements["group"] & {
  useEnvStore: EnvironmentStoreHook;
  src: string;
  ratio: [number, number];
  sizeScale: number;
  audioPosition: [number, number, number];
  audioRotation: [number, number, number];
  frameless?: boolean;
  emissive?: boolean;
};

const frameWidth = 0.3;
const frameDepth = 0.1;
const meshOffset = 0.0005;

const FramedVideo = (props: FramedVideoProps) => {
  const {
    src,
    sizeScale,
    ratio,
    useEnvStore,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    frameless = false,
    emissive,
    audioPosition,
    audioRotation,
  } = props;

  const { camera, scene } = useThree();

  // video state
  const videoRef = useRef<HTMLVideoElement>();
  const textureRef = useRef<THREE.VideoTexture>();
  const [texReady, setTexReady] = useState(false);

  // audio refs
  const listener = useRef<THREE.AudioListener>();
  const speaker = useRef<THREE.PositionalAudio>();

  const container = useEnvStore((st) => st.container);
  const paused = useEnvStore((st) => st.paused);

  useFrame(() => {
    if (!texReady && videoRef?.current && videoRef?.current?.currentTime > 0) {
      setTexReady(true);
    }
  });

  // sizing
  const normalizedRatio = new Vector2(ratio[0], ratio[1]).normalize();
  const width = normalizedRatio.x * sizeScale;
  const height = normalizedRatio.y * sizeScale;

  // video textures use effect
  useEffect(() => {
    if (container?.current && !videoRef.current) {
      // build video dom element
      const video = document.createElement("video");
      const source = document.createElement("source");
      source.src = src;
      video.loop = true;
      //@ts-ignore
      video.playsInline = true;
      video.crossOrigin = "anonymous";
      video.preload = "auto";
      video.autoplay = true;
      video.style.position = "absolute";
      video.style.opacity = "0";
      video.style.pointerEvents = "none";
      video.style.visibility = "hidden";

      // add to parent container
      container.current.appendChild(video);
      video.appendChild(source);

      // create video texture
      const texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBFormat;
      texture.matrixAutoUpdate = false;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      videoRef.current = video;
      textureRef.current = texture;

      return () => {
        video.pause();
        video.remove();
        videoRef.current = undefined;

        texture.dispose();
        textureRef.current = undefined;

        if (speaker.current) {
          speaker.current.disconnect();
          speaker.current = undefined;
        }
        if (listener.current) {
          camera.remove(listener.current);
        }

        setTexReady(false);
      };
    }
  }, [container?.current, videoRef?.current]);

  // audio useeffect
  useEffect(() => {
    if (!paused && camera && videoRef.current && !speaker.current) {
      listener.current = new THREE.AudioListener();
      camera.add(listener.current);

      speaker.current = new THREE.PositionalAudio(listener.current);
      speaker.current.setMediaElementSource(videoRef.current);
      speaker.current.setRefDistance(1);
      speaker.current.setRolloffFactor(1);
      speaker.current.setVolume(1);
      speaker.current.setDirectionalCone(180, 230, 0.1);
      // @ts-ignore due to bad types, it's an array though
      speaker.current.position.set(
        audioPosition[0],
        audioPosition[1],
        audioPosition[2]
      );
      // @ts-ignore due to bad types, it's an array though
      speaker.current.rotation.set(
        audioRotation[0],
        audioRotation[1],
        audioRotation[2]
      );

      // const helper = new PositionalAudioHelper(speaker.current);
      // speaker.current.add(helper);

      scene.add(speaker.current);
    }
  }, [videoRef.current, camera, speaker.current, listener.current, paused]);

  // play video if player closes menu
  useEffect(() => {
    if (!paused && videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
    }
  }, [paused, videoRef.current]);

  const materialProps = {
    emissive: emissive ? new Color(0xffffff) : undefined,
    emissiveIntensity: emissive ? 0.4 : undefined,
    emissiveMap: emissive ? textureRef.current : undefined,
  };

  return (
    <group {...props}>
      {texReady && (
        <mesh>
          <planeBufferGeometry attach="geometry" args={[width, height]} />
          <meshStandardMaterial
            attach="material"
            map={textureRef.current}
            {...materialProps}
          />
        </mesh>
      )}
      {!frameless && (
        <mesh position={[0, 0, -0.1 - meshOffset]}>
          <boxBufferGeometry
            attach="geometry"
            args={[width + frameWidth, height + frameWidth, frameDepth]}
          />
          <meshStandardMaterial attach="material" color="#4a4a4a" />
        </mesh>
      )}
    </group>
  );
};

export default FramedVideo;
