import { Song } from "server/models";

export interface Model{
	song?: Song;
}

export const init: Model = {};
