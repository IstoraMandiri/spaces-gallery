import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { MusicStoreHook } from "scenes/Shirts/stores/music";
import { getOpenIndex } from "../services/musicManager";
import { useEnvironment } from "@spacesvr/core/utils/hooks";

const Container = styled.div<{ open: boolean }>`
  position: absolute;
  z-index: 50;
  width: 100%;
  height: 100%;
  background: white;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.open && "opacity: 0;"}
`;

const Message = styled.h1`
  font-family: "Lato", sans-serif;
  color: black;
  opacity: 0.9;
  text-align: center;
  margin: 0 10%;
`;

const INTRO_MESSAGES = [
  "damn, sick t-shirt",
  "we're glad you're here️",
  "have you ever seen shit like this?",
  "oh hello",
  "we've been expecting you",
];

type CreditProps = {
  useMusicStore: MusicStoreHook;
};

const Credits = (props: CreditProps) => {
  const { useMusicStore } = props;

  const { paused, portal } = useEnvironment();
  const name = (portal && portal.firstName) || "❤";
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState<string>();
  const [open, setOpen] = useState(false);

  const song = useMusicStore((st) => st.song);
  const eventIndex = useMusicStore((st) => st.eventIndex);
  const audioRef = useMusicStore((st) => st.audioRef);

  useEffect(() => {
    if (
      song &&
      audioRef?.current &&
      audioRef.current.currentTime > 0 &&
      !message
    ) {
      // Shuffle array
      const shuffled = INTRO_MESSAGES.sort(() => 0.5 - Math.random());
      // Get sub-array of first n elements after shuffled
      const selected = shuffled.slice(0, 1);

      const openIndex = getOpenIndex(song);
      const openTime = song.events[openIndex].time;

      const timeLeft = openTime * 1000 - audioRef.current.currentTime;
      const messages = [
        selected[0],
        `music provided by ${song.credits}`,
        "welcome to your space",
        `Spaces x ${name}`,
      ];

      for (let i = 0; i < messages.length; i++) {
        setTimeout(
          () => setMessage(messages[i]),
          (timeLeft / messages.length) * i
        );
      }
    } else if (!message) {
      const interval = setInterval(() => {
        setCounter((counter) => counter + 1);
      }, 50);

      return () => {
        clearInterval(interval);
      };
    }
  }, [paused, message, song, counter, audioRef?.current?.paused]);

  const event = song ? song.events[eventIndex] : undefined;

  useEffect(() => {
    if (event && event.open && event.open !== open) {
      setOpen(event.open);
    }
  }, [eventIndex]);

  return (
    <Container open={open}>
      <Message>{message || ""}</Message>
    </Container>
  );
};

export default Credits;
