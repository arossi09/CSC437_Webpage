import { Document, Model, Schema, model } from "mongoose";
import { Song, TabSheet, ChordSheet, SongSection } from "../models";

const songSchema = new Schema<Song>(
	{
		title: { type: String, required: true, trim: true },
		artist: { type: String, required: true, trim: true },
		key: { type: String, required: false },
		bpm: { type: String, required: false },
		sections: [
			{
				type: { type: String },
				lyrics: String,
			},
		],
		chords: [
			{
				section: String,
				chords: [String],
				inline: Boolean,
			},
		],
		tabs: [
			{
				instrument: String,
				section: String,
				tabBody: String,
			},
		],
	},
	{ timestamps: true, collection: "song_collection" },
);

const songModel = model<Song>("Song", songSchema);

function index(): Promise<Song[]> {
	return songModel.find();
}

function get(id: String): Promise<Song> {
	return songModel
		.findById(id)
		.then((doc) => {
			if (!doc) throw `${id} Not Found`;
			return doc;
		});
}

function create(json: Song): Promise<Song> {
	const t = new songModel(json);
	return t.save();
}


export default { index, get, create };
