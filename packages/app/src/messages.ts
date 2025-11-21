import { Song } from "server/models";

export type Msg =
	| ["song/save", { songid: string; song: Song }]
	| ["song/request", { songid: string }]
	| Cmd;

type Cmd =
  | ["song/load", { songid: string, song: Song}]
