import { Schema, model } from "mongoose";
import { songCard } from "../models/songCard";

const songCardSchema = new Schema<songCard>(
	{
		title: { type: String, required: true, trim: true },
		artist: { type: String, required: true, trim: true },
		difficulty: { type: String, required: true },
		genre: { type: String, required: true },
		song_link: { type: String },
		artist_link: { type: String },
		genre_link: { type: String },
		difficulty_link: { type: String },
	},
	{ collection: "song_cards" },
);

const songCardModel = model<songCard>("Song", songCardSchema);

function index(): Promise<songCard[]> {
	return songCardModel.find();
}

function get(title: String): Promise<songCard> {
	return songCardModel
		.find({ title })
		.then((list) => list[0])
		.catch((err) => {
			throw `${title} Not Found`;
		});
}

export default { index, get };
