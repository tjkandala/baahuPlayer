import { Song } from "../mockApi";
import { machine, b } from "baahu";
import { songEmit, SongEvent } from "../emitters";

interface FeaturedSongProps {
  song: Song;
}

type FeaturedSongState = "inactive" | "playing" | "paused";

interface FeaturedSongContext extends FeaturedSongProps {}

function hydrateInitialState(props: FeaturedSongProps): FeaturedSongState {
  const currentSongStr = localStorage.getItem("currentSong");
  if (currentSongStr) {
    const currentSong = JSON.parse(currentSongStr);
    if (currentSong.id === props.song.id) {
      const playing = localStorage.getItem("playing");
      if (playing) {
        return playing === "true" ? "playing" : "paused";
      }
    }
  }
  return "inactive";
}

export const FeaturedSong = machine<
  FeaturedSongProps,
  FeaturedSongState,
  SongEvent,
  FeaturedSongContext
>({
  id: ({ song }) => `song-${song.id}`,
  initial: hydrateInitialState,
  context: ({ song }) => ({
    song,
  }),
  when: {
    inactive: {
      on: {
        SET_NEW_SONG: {
          to: "playing",
          if: (ctx, e) => ctx.song.id === e.song.id,
        },
      },
    },
    playing: {
      on: {
        PAUSE: {
          to: "paused",
        },
        SET_NEW_SONG: {
          to: "inactive",
        },
      },
    },
    paused: {
      on: {
        PLAY: {
          to: "playing",
        },
        SET_NEW_SONG: {
          to: "inactive",
        },
      },
    },
  },
  render: (state, ctx) => (
    <div class="featuredSong">
      {state === "playing" ? (
        <p onClick={() => songEmit({ type: "PAUSE" })}>pause</p>
      ) : (
        <p
          onClick={() => {
            state === "paused"
              ? songEmit({ type: "PLAY" })
              : songEmit({ type: "SET_NEW_SONG", song: ctx.song });
          }}
        >
          play
        </p>
      )}
      <p>{ctx.song.title}</p>
      <p>{ctx.song.artist}</p>
    </div>
  ),
});
