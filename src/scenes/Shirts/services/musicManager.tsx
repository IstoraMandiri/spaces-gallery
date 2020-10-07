import React from "react";
import { useFrame } from "react-three-fiber";
import { MusicStoreHook } from "stores/music";

type MusicManagerProps = {
  useMusicStore: MusicStoreHook;
};

export const MusicManager = (props: MusicManagerProps) => {
  const { useMusicStore } = props;

  const audioRef = useMusicStore((st) => st.audioRef);
  const song = useMusicStore((st) => st.song);
  const eventIndex = useMusicStore((st) => st.eventIndex);
  const setEventIndex = useMusicStore((st) => st.setEventIndex);

  useFrame(() => {
    if (audioRef?.current && song) {
      const events = song.events;
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        if (audioRef?.current.currentTime > event.time && i > eventIndex) {
          setEventIndex(i);
          return;
        }
      }
    }
  });

  return <></>;
};

export const getSong = (seed: string, music: Array<Song>) => {
  const index = Math.abs(parseInt(seed) || getNumFromString(seed));
  return music[index % music.length];
};

// returns a number hashed from the input string
const getNumFromString = (input: string) => {
  let hash = 0,
    i,
    chr;
  for (i = 0; i < input.length; i++) {
    chr = input.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export const getOpenIndex = (song: Song) => {
  for (let i = 0; i < song.events.length; i++) {
    if (song.events[i].open) {
      return i;
    }
  }
  return -1;
};
