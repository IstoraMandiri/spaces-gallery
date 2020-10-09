import React, { useEffect, useRef } from "react";
import { MusicStoreHook } from "stores/music";
import { Group } from "three";
import { useFrame } from "react-three-fiber";
import { useSpring, config } from "react-spring";

type HypeLifterProps = {
  useMusicStore: MusicStoreHook;
  children: React.ReactNode;
};

const HypedAsset = (props: HypeLifterProps) => {
  const { useMusicStore, children } = props;

  const song = useMusicStore((st) => st.song);
  const eventIndex = useMusicStore((st) => st.eventIndex);

  const group = useRef<Group>();
  const [spring, set] = useSpring(() => ({
    scale: 0,
    config: config.wobbly,
  }));

  useEffect(() => {
    if (song) {
      const event = song.events[eventIndex];
      if (event.hype) {
        set({ scale: event.hype });
      }
    }
  }, [eventIndex]);

  useFrame(() => {
    if (group.current) {
      const newVals = spring.scale.interpolate((sc) => sc);
      // @ts-ignore
      const scale = newVals.payload[0].value;
      group.current.scale.set(scale, scale, scale);
    }
  });

  return <group ref={group}>{children}</group>;
};

export default HypedAsset;
