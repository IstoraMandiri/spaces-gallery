import create, { StoreApi, UseStore } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type PlayersStoreState = {
  players: {
    [key: string]: {
      position: [number, number, number];
    };
  };
  selfId: string;
};

type PlayersStoreReducers = {
  set(_: any): any;
};

type PlayersStoreType = PlayersStoreState & PlayersStoreReducers;
type PlayersStoreInstance = [
  UseStore<PlayersStoreType>,
  StoreApi<PlayersStoreType>
];
export type PlayersStoreHook = PlayersStoreInstance[0];
export type PlayersStoreAPI = PlayersStoreInstance[1];

const defaultState: PlayersStoreState = {
  players: {},
  selfId: uuidv4(),
};

function createPlayersStore(
  initialState?: Partial<PlayersStoreState>
): PlayersStoreInstance {
  return create((set, get) => ({
    ...defaultState,
    ...initialState,
    set,
  }));
}

let storeInstance: PlayersStoreInstance;

export function getPlayersStore(
  initialStateFunction: () => Partial<PlayersStoreState> = () => ({})
): PlayersStoreInstance {
  if (!process.browser) {
    return createPlayersStore(initialStateFunction());
  }

  if (!storeInstance) {
    storeInstance = createPlayersStore(initialStateFunction());
  }

  return storeInstance;
}
