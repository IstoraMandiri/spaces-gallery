import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "react-three-fiber";
import { Vector2 } from "three";
import { EnvironmentStoreHook } from "stores/environment";
import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper";

type FramedVideoProps = JSX.IntrinsicElements["group"] & {
  useEnvStore: EnvironmentStoreHook;
  src: string;
  ratio: [number, number];
  sizeScale: number;
  frameless?: boolean;
};

const frameWidth = 0.3;
const frameDepth = 0.1;
const meshOffset = 0.0005;

const FramedMutedVideo = (props: FramedVideoProps) => {
  const {
    src,
    sizeScale,
    ratio,
    useEnvStore,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    frameless = false,
  } = props;

  const { camera, scene } = useThree();

  // video state
  const videoRef = useRef<HTMLVideoElement>();
  const textureRef = useRef<THREE.VideoTexture>();
  const [texReady, setTexReady] = useState(false);

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
      video.autoplay = false;
      video.muted = true;
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

        setTexReady(false);
      };
    }
  }, [container?.current, videoRef?.current]);

  // play video if player closes menu
  useEffect(() => {
    if (!paused && videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
    }
  }, [paused, videoRef.current]);

  return (
    <group {...props}>
      {texReady && (
        <mesh>
          <planeBufferGeometry attach="geometry" args={[width, height]} />
          <meshStandardMaterial attach="material" map={textureRef.current} />
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

export default FramedMutedVideo;
