import { SongSection } from "./song-section";
import { TabSheet } from "./tab-sheet";
import { ChordSheet } from "./chord-sheet";

export interface Song {
	songid: string;
	title: string;
	artist: string;
	difficulty: string;
	genre: string;
	key?: string;
	bpm?: number;
	sections: Array<SongSection>;

	chords?: Array<ChordSheet>;
	tabs?: Array<TabSheet>;
}
