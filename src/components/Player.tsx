import { b, machine } from "baahu";
import { SongEvent, songEmit } from "../emitters";
import { Song } from "../mockApi";

type PlayerState = "idle" | "rehydrating" | "loading" | "playing" | "paused";

interface PlayerContext {
  currentSong: Song | null;
  audioEl: HTMLAudioElement | null;
}

export const Player = machine<{}, PlayerState, SongEvent, PlayerContext>({
  id: "player",
  initial: () => (localStorage.getItem("currentSong") ? "rehydrating" : "idle"),
  context: () => {
    const lsCurrentSong = localStorage.getItem("currentSong");
    const currentSong = lsCurrentSong ? JSON.parse(lsCurrentSong) : null;

    return {
      currentSong,
      audioEl: null,
    };
  },
  mount: () => {
    const playa = document.getElementById("audpla");
    console.log(playa);
  },
  on: {
    SET_NEW_SONG: {
      do: (ctx, e) => {
        const song = e.song;
        localStorage.setItem("currentSong", JSON.stringify(song));
        localStorage.setItem("playing", "true");
        ctx.currentSong = song;
        ctx.audioEl && (ctx.audioEl.src = song.url);
        ctx.audioEl?.load();
      },
      to: "loading",
    },
  },
  when: {
    idle: {},
    rehydrating: {
      on: {
        LOADED_AUDIO: {
          to: "paused",
        },
      },
    },
    loading: {
      on: {
        LOADED_AUDIO: {
          to: "playing",
          do: (ctx) => {
            ctx.audioEl?.play();
            localStorage.setItem("playing", "true");
          },
        },
      },
    },
    playing: {
      on: {
        PAUSE: {
          to: "paused",
          do: (ctx) => {
            ctx.audioEl?.pause();
            localStorage.setItem("playing", "false");
          },
        },
      },
    },
    paused: {
      on: {
        PLAY: {
          to: "playing",
          do: (ctx) => {
            ctx.audioEl?.play();
            localStorage.setItem("playing", "true");
          },
        },
      },
    },
  },
  render: (state, ctx) => {
    const hidden: boolean = state === "idle" || !ctx.currentSong;

    return (
      <div class={hidden ? "playerHidden" : "player"}>
        <p>{state}</p>
        <audio
          id="audpla"
          src={ctx.currentSong?.url}
          ref={(ref) => (ctx.audioEl = ref)}
          onCanPlay={() => songEmit({ type: "LOADED_AUDIO" })}
          onPause={() => songEmit({ type: "PAUSE" })}
        />
        {hidden ? null : (
          <div>
            <p>{ctx.currentSong!.title}</p>
            <p>{ctx.currentSong!.artist}</p>
            {/* controls should be greyed out while loading */}
            {state === "loading" ? (
              <div>
                <p>greyed out controls</p>
              </div>
            ) : (
              <div>
                <p>active controls</p>
                {state === "playing" ? (
                  <p onClick={() => songEmit({ type: "PAUSE" })}>pause</p>
                ) : (
                  <p onClick={() => songEmit({ type: "PLAY" })}>play</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
});
