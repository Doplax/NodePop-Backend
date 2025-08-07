import dotenv from "dotenv";
import { Artist, Duration, Track } from "@/modules/Tracks/Tracks.model";

dotenv.config();

const PUBLIC_URL = `${process.env.PUBLIC_URL}/public/music/lofi-music`;

// Helper function to convert duration string to seconds
const durationToSeconds = (durationStr: string): number => {
  const [minutes, seconds] = durationStr.split(':').map(Number);
  return minutes * 60 + seconds;
};

export const tracksList: Track[] = [
  {
    _id: 1,
    name: "Moonlit Walk",
    album: "Chill Lo-Fi Music",
    cover: "https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353",
    artist: {
      name: "LoFi Dreamer",
      nickname: "LoFi Dreamer",
      nationality: "US",
    },
    duration: {
      start: 0,
      end: durationToSeconds("3:12"),
    },
    url: `${PUBLIC_URL}/moonlit-walk.mp3`,
  },
  {
    _id: 2,
    name: "Coffee Daze",
    album: "Chill Lo-Fi Music",
    cover: "https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353",
    artist: {
      name: "LoFi Dreamer",
      nickname: "LoFi Dreamer",
      nationality: "US",
    },
    duration: {
      start: 0,
      end: durationToSeconds("4:07"),
    },
    url: `${PUBLIC_URL}/coffee-daze.mp3`,
  },
  {
    _id: 3,
    name: "Skyline Serenade",
    album: "Chill Lo-Fi Music",
    cover: "https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353",
    artist: {
      name: "LoFi Dreamer",
      nickname: "LoFi Dreamer",
      nationality: "US",
    },
    duration: {
      start: 0,
      end: durationToSeconds("3:50"),
    },
    url: `${PUBLIC_URL}/skyline-serenade.mp3`,
  },
  {
    _id: 4,
    name: "Urban Echoes",
    album: "Chill Lo-Fi Music",
    cover: "https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353",
    artist: {
      name: "LoFi Dreamer",
      nickname: "LoFi Dreamer",
      nationality: "US",
    },
    duration: {
      start: 0,
      end: durationToSeconds("3:30"),
    },
    url: `${PUBLIC_URL}/urban-echoes.mp3`,
  },
  {
    _id: 5,
    name: "Night's End",
    album: "Chill Lo-Fi Music",
    cover: "https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353",
    artist: {
      name: "LoFi Dreamer",
      nickname: "LoFi Dreamer",
      nationality: "US",
    },
    duration: {
      start: 0,
      end: durationToSeconds("4:20"),
    },
    url: `${PUBLIC_URL}/nights-end.mp3`,
  },
  {
    _id: 6,
    name: "Silent Rain",
    album: "Midnight Tales",
    cover: "https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187",
    artist: {
      name: "Urban Nocturne",
      nickname: "Urban Nocturne",
      nationality: "US",
    },
    duration: {
      start: 0,
      end: durationToSeconds("3:40"),
    },
    url: `${PUBLIC_URL}/silent-rain.mp3`,
  },
  {
    _id: 7,
    name: "Lost Pages",
    album: "Midnight Tales",
    cover: "https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187",
    artist: {
      name: "Urban Nocturne",
      nickname: "Urban Nocturne",
      nationality: "US",
    },
    duration: {
      start: 0,
      end: durationToSeconds("3:20"),
    },
    url: `${PUBLIC_URL}/lost-pages.mp3`,
  },
  {
    _id: 8,
    name: "Midnight Tales",
    album: "Midnight Tales",
    cover: "https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187",
    artist: {
      name: "Urban Nocturne",
      nickname: "Urban Nocturne",
      nationality: "US",
    },
    duration: {
      start: 0,
      end: durationToSeconds("3:50"),
    },
    url: `${PUBLIC_URL}/midnight-tales.mp3`,
  },
  {
    _id: 9,
    name: "City Lights",
    album: "Midnight Tales",
    cover: "https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187",
    artist: {
      name: "Urban Nocturne",
      nickname: "Urban Nocturne",
      nationality: "US",
    },
    duration: {
      start: 0,
      end: durationToSeconds("3:30"),
    },
    url: `${PUBLIC_URL}/city-lights.mp3`,
  },
  {
    _id: 10,
    name: "Night Drive",
    album: "Midnight Tales",
    cover: "https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187",
    artist: {
      name: "Urban Nocturne",
      nickname: "Urban Nocturne",
      nationality: "US",
    },
    duration: {
      start: 0,
      end: durationToSeconds("4:20"),
    },
    url: `${PUBLIC_URL}/night-drive.mp3`,
  },
  {
    _id: 11,
    name: "Lunar",
    album: "Study Session",
    cover: "https://f4.bcbits.com/img/a1435058381_65.jpg",
    artist: {
      name: "Tenno",
      nickname: "Tenno",
      nationality: "JP",
    },
    duration: {
      start: 0,
      end: durationToSeconds("3:40"),
    },
    url: `${PUBLIC_URL}/lunar.mp3`,
  },
  {
    _id: 12,
    name: "Go go go!",
    album: "Study Session",
    cover: "https://f4.bcbits.com/img/a1435058381_65.jpg",
    artist: {
      name: "Tenno",
      nickname: "Tenno",
      nationality: "JP",
    },
    duration: {
      start: 0,
      end: durationToSeconds("3:20"),
    },
    url: `${PUBLIC_URL}/go-go-go.mp3`,
  },
  {
    _id: 13,
    name: "Keep focus!",
    album: "Study Session",
    cover: "https://f4.bcbits.com/img/a1435058381_65.jpg",
    artist: {
      name: "Tenno",
      nickname: "Tenno",
      nationality: "JP",
    },
    duration: {
      start: 0,
      end: durationToSeconds("2:40"),
    },
    url: `${PUBLIC_URL}/keep-focus.mp3`,
  },
  {
    _id: 14,
    name: "JavaScript is the way",
    album: "Study Session",
    cover: "https://f4.bcbits.com/img/a1435058381_65.jpg",
    artist: {
      name: "Tenno",
      nickname: "Tenno",
      nationality: "JP",
    },
    duration: {
      start: 0,
      end: durationToSeconds("3:10"),
    },
    url: `${PUBLIC_URL}/javascript-is-the-way.mp3`,
  },
  {
    _id: 15,
    name: "No more TypeScript for me",
    album: "Study Session",
    cover: "https://f4.bcbits.com/img/a1435058381_65.jpg",
    artist: {
      name: "Tenno",
      nickname: "Tenno",
      nationality: "JP",
    },
    duration: {
      start: 0,
      end: durationToSeconds("2:10"),
    },
    url: `${PUBLIC_URL}/no-more-typescript.mp3`,
  },
];