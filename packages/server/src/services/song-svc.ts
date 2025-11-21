import { Document, Model, Schema, model } from "mongoose";
import { Song } from "../models";
import {songCardModel} from "../services/songCard-svc";

const songSchema = new Schema<Song>(
	{
		title: { type: String, required: true, trim: true },
		artist: { type: String, required: true, trim: true },
		difficulty: { type: String, required: true, trim: true },
		genre: { type: String, requried: true, trim: true },
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
	return songModel.findById(id).then((doc) => {
		if (!doc) throw `${id} Not Found`;
		return doc;
	});
}

function create(json: Song): Promise<Song> {
	const t = new songModel(json);

	return t.save().then((savedSong) => {
		// Create a proper Mongoose document for the card
		const card = new songCardModel({
			title: savedSong.title,
			artist: savedSong.artist,
			difficulty: savedSong.difficulty,
			genre: savedSong.genre,
			songId: savedSong._id.toString(), // reference full song
		});

		return card.save().then(() => savedSong);
	});
}

export default { index, get, create };
