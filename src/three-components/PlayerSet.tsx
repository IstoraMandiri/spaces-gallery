import React, { useRef } from "react";
import { Box } from "drei";
import { PlayersStoreHook, PlayersStoreState } from "stores/players";
import { useFrame } from "react-three-fiber";
import { EnvironmentStoreHook } from "stores/environment";
import { useChannel, useEvent } from "@harelpls/use-pusher";
import backend from "services/backend";

function usePlayerUpdates(
  useEnvStore: EnvironmentStoreHook,
  usePlayersStore: PlayersStoreHook
) {
  const { paused } = useEnvStore();
  const { selfId, set } = usePlayersStore();
  const elapsedSeconds = useRef(0);
  useFrame(async ({ camera }, delta) => {
    if (!paused) {
      elapsedSeconds.current += delta;

      if (elapsedSeconds.current > 1) {
        elapsedSeconds.current = 0;

        await backend.post("/event", {
          id: selfId,
          position: camera.position.toArray(),
        });
      }
    }
  });

  const channel = useChannel("multiplayer");
  useEvent<any>(channel, "playerUpdate", ({ id, position }) => {
    console.log(`${id}: ${position}`);
    set((state: PlayersStoreState) => ({
      players: {
        ...state.players,
        [id]: { position },
      },
    }));
  });
}

type PlayersSetProps = {
  useEnvStore: EnvironmentStoreHook;
  usePlayersStore: PlayersStoreHook;
};

const PlayerSet: React.FC<PlayersSetProps> = (props) => {
  const { useEnvStore, usePlayersStore } = props;

  const players = usePlayersStore((store) => store.players);
  usePlayerUpdates(useEnvStore, usePlayersStore);

  return (
    <>
      {Object.entries(players).map(([key, player]) => (
        <Box key={key} position={player.position}>
          <meshBasicMaterial attach="material" color="rebeccapurple" />
        </Box>
      ))}
    </>
  );
};

export default PlayerSet;
