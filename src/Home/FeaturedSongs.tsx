import { b, machine, emit, VNode } from "baahu";
import { Song, mockApi } from "../mockApi";
import { songEmit, SongEvent } from "../emitters";
import { FeaturedSong } from "./FeaturedSong";

type FeaturedSongsState = "loading" | "loaded" | "error";

export type FeaturedSongsEvent = { type: "LOADED_SONGS"; songs: Song[] };

interface FeaturedSongsContext {
  songs: Song[];
}

export const FeaturedSongs = machine<
  {},
  FeaturedSongsState,
  SongEvent,
  FeaturedSongsContext
>({
  id: "featuredSongs",
  initial: "loading",
  context: () => ({
    songs: [],
  }),
  when: {
    loading: {
      entry: () => {
        mockApi
          .fetchSongs()
          .then((songs) => {
            songEmit({ type: "LOADED_SONGS", songs });
          })
          .catch(() => emit({ type: "ERROR" }, "featuredSongs"));
      },
      on: {
        LOADED_SONGS: {
          to: "loaded",
          do: (ctx, e) => (ctx.songs = e.songs),
        },
      },
    },
    loaded: {},
    error: {},
  },
  render: (state, ctx): VNode => {
    if (state === "loaded") {
      return (
        <div>
          {ctx.songs.map((song) => (
            <FeaturedSong song={song} key={song.id} />
          ))}
        </div>
      );
    }

    return <div>{state === "loading" ? <p>loading...</p> : <p>error</p>}</div>;
  },
});
