type SongEvent = {
  time: number;
  open?: boolean;
  hype?: number;
};

type Song = {
  url: string;
  credits: string;
  events: Array<SongEvent>;
};
