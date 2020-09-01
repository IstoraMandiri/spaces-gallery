import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "react-three-fiber";
import { Color, Vector2 } from "three";
import { EnvironmentStoreHook } from "stores/environment";
import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper";
import { Group } from "three";

type FramedVideoProps = JSX.IntrinsicElements["group"] & {
  useEnvStore: EnvironmentStoreHook;
  src: string;
  ratio: [number, number];
  sizeScale: number;
  audioPosition?: [number, number, number];
  audioRotation?: [number, number, number];
  frameless?: boolean;
  emissive?: boolean;
  floating?: boolean;
};

const frameWidth = 0.3;
const frameDepth = 0.1;
const borderThickness = 0.2;
const borderDepth = 0.2;
const meshOffset = 0.0005;
const floatHeight = 0.05;

const FramedVideo = (props: FramedVideoProps) => {
  const {
    src,
    sizeScale,
    ratio,
    useEnvStore,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    frameless,
    emissive,
    audioPosition,
    audioRotation,
    floating,
  } = props;

  const { camera, scene } = useThree();
  const group = useRef<Group>();
  const uuid = useRef(Math.random());

  // video state
  const videoRef = useRef<HTMLVideoElement>();
  const textureRef = useRef<THREE.VideoTexture>();
  const [texReady, setTexReady] = useState(false);

  // audio refs
  const listener = useRef<THREE.AudioListener>();
  const speaker = useRef<THREE.PositionalAudio>();

  const container = useEnvStore((st) => st.container);
  const paused = useEnvStore((st) => st.paused);

  useFrame(({ clock }) => {
    if (!texReady && videoRef?.current && videoRef?.current?.currentTime > 0) {
      setTexReady(true);
    }

    if (group.current && floating) {
      group.current.position.y =
        floatHeight *
        2 *
        (Math.sin(
          clock.getElapsedTime() * (uuid.current / 10 + 0.9) +
            uuid.current * 1000
        ) -
          0.5);
    }
  });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.8,
        metalness: 0.05,
      }),
    []
  );

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
      speaker.current.setRefDistance(0.75);
      speaker.current.setRolloffFactor(1);
      speaker.current.setVolume(1);
      speaker.current.setDirectionalCone(180, 230, 0.1);
      if (audioPosition) {
        // @ts-ignore due to bad types, it's an array though
        speaker.current.position.set(
          audioPosition[0],
          audioPosition[1],
          audioPosition[2]
        );
      } else {
        // @ts-ignore due to bad types, it's an array though
        speaker.current.position.set(position[0], position[1], position[2]);
      }
      if (audioRotation) {
        // @ts-ignore due to bad types, it's an array though
        speaker.current.rotation.set(
          audioRotation[0],
          audioRotation[1],
          audioRotation[2]
        );
      } else {
        // @ts-ignore due to bad types, it's an array though
        speaker.current.rotation.set(position[0], position[1], position[2]);
      }

      // const helper = new PositionalAudioHelper(speaker.current);
      // speaker.current.add(helper);

      scene.add(speaker.current);
    }
  }, [videoRef.current, camera, speaker.current, listener.current, paused]);

  // play video if player closes menu
  useEffect(() => {
    console.log("=====REFRESH=====");
    console.log("Paused: " + paused);
    console.log("videoRefPaused: " + videoRef.current.paused);
    if (!paused && videoRef.current && videoRef.current.paused) {
      console.log("play");
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
      <group ref={group}>
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
          <>
            <mesh position={[0, 0, -0.1 - meshOffset]} material={material}>
              <boxBufferGeometry
                attach="geometry"
                args={[width + frameWidth, height + frameWidth, frameDepth]}
              />
            </mesh>
            {/* top */}
            <mesh
              position={[
                0,
                height / 2 + frameWidth / 2 - borderThickness / 2,
                0,
              ]}
              material={material}
            >
              <boxBufferGeometry
                attach="geometry"
                args={[width + frameWidth, borderThickness, borderDepth]}
              />
            </mesh>
            {/* bottom */}
            <mesh
              position={[
                0,
                -height / 2 - frameWidth / 2 + borderThickness / 2,
                0,
              ]}
              material={material}
            >
              <boxBufferGeometry
                attach="geometry"
                args={[width + frameWidth, borderThickness, borderDepth]}
              />
            </mesh>
            {/* left */}
            <mesh
              position={[
                -width / 2 - frameWidth / 2 + borderThickness / 2,
                0,
                0,
              ]}
              material={material}
            >
              <boxBufferGeometry
                attach="geometry"
                args={[borderThickness, height + frameWidth, borderDepth]}
              />
            </mesh>
            {/* right */}
            <mesh
              position={[
                width / 2 + frameWidth / 2 - borderThickness / 2,
                0,
                0,
              ]}
              material={material}
            >
              <boxBufferGeometry
                attach="geometry"
                args={[borderThickness, height + frameWidth, borderDepth]}
              />
            </mesh>
          </>
        )}
      </group>
    </group>
  );
};

export default FramedVideo;
