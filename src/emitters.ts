/** Events & Namespaced Emitters */

import { Song } from "./mockApi";
import { emit } from "baahu";

export enum SongEventType {
  LoadedSongs,
  Play,
  Pause,
  SetNewSong,
  LoadedAudio,
}

export type SongEvent =
  | { type: "LOADED_SONGS"; songs: Song[] }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "SET_NEW_SONG"; song: Song }
  | { type: "LOADED_AUDIO" };

export function songEmit(event: SongEvent, target: string = "*") {
  emit(event, target);
}

export type AccountEvent = { type: "LOG_OUT" } | { type: "LOG_IN" };

export function AccountEvent(event: AccountEvent, target: string = "*") {
  emit(event, target);
}
