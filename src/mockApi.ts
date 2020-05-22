export type Song = {
  id: number;
  title: string;
  artist: string;
  url: string;
};

const songList: Song[] = [
  {
    id: 2,
    title: "Rollie",
    artist: "Yung Kartz",
    url:
      "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Yung_Kartz/July_2019/Yung_Kartz_-_01_-_Rollie.mp3",
  },

  {
    id: 3,
    title: "Is this fruit edible ?",
    artist: "Soft and Furious",
    url:
      "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Music_for_Video/Soft_and_Furious/You_know_where_to_find_me/Soft_and_Furious_-_01_-_Is_this_fruit_edible_.mp3",
  },
  {
    id: 4,
    title: "Panda",
    artist: "Bisou",
    url:
      "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Ziklibrenbib/Bisou/Musical_spaceshift/Bisou_-_09_-_Panda.mp3",
  },

  {
    id: 5,
    title: "springtide",
    artist: "We Are Heading to the East",
    url:
      "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Music_for_Video/springtide/Sounds_strange_weird_but_unmistakably_romantic_Vol1/springtide_-_03_-_We_Are_Heading_to_the_East.mp3",
  },
];

export const mockApi = {
  fetchSongs: async (): Promise<Song[]> => {
    await delay(500);

    return songList;
  },
  fetchSong: async (id: number): Promise<Song> => {
    await delay(500);

    const song = songList.find((song) => song.id === id);

    if (song) {
      return song;
    } else {
      throw new Error("Song not found");
    }
  },
};

/** for simulating network latency in async fns */
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
