import { Song } from "server/models";
import { Message } from "@calpoly/mustang";

export type Msg =
	| ["song/save", { songid: string; song: Song }, Message.Reactions]
	| ["song/request", { songid: string }]
	| ["song/create", { song: Song }, Message.Reactions]
	| Cmd;

type Cmd = ["song/load", { /*songid: string;*/ song: Song }];
