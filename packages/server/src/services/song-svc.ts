import { Document, Model, Schema, model } from "mongoose";
import { Song } from "../models";
import { songCardModel } from "../services/songCard-svc";

const songSchema = new Schema<Song>(
	{
		title: { type: String, required: true, trim: true },
		artist: { type: String, required: true, trim: true },
		difficulty: { type: String, required: true, trim: true },
		genre: { type: String, required: true, trim: true },
		instrument: { type: String, required: true, trim: true },
		userid: { type: String, required: true },
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
				//instrument: String,
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

function get(id: string): Promise<Song> {
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
			instrument: savedSong.instrument,
			songId: savedSong._id.toString(),
			userid: savedSong.userid,
		});

		return card.save().then(() => savedSong);
	});
}

//used to update a songcard in database
function update(id: string, song: Song): Promise<Song> {
	return songModel
		.findByIdAndUpdate(id, song, {
			new: true,
		})
		.then((updated) => {
			if (!updated) throw `${id} not updated`;
			else return updated as Song;
		});
}

function remove(id: string): Promise<void> {
	return songModel.findByIdAndDelete(id).then((deleted) => {
		if (!deleted) throw `${id} not deleted`;
	});
}

export default { index, get, create, update, remove };
