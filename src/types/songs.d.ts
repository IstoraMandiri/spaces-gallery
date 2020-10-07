type SongEvent = {
  time: number;
  open?: boolean;
  hype?: number;
};

type Song = {
  url: string;
  events: Array<SongEvent>;
};
