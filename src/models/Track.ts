export interface Artist {
  name: string;
  nickname: string;
  nationality: string;
}

export interface Duration {
  start: number;
  end: number;
}

export interface Track {
  _id: number;
  name: string;
  album: string;
  cover: string;
  artist: Artist;
  duration: Duration;
  url: string;
}