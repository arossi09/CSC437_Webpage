import { Schema, model } from "mongoose";
import { songCard } from "../models/songCard";

const songCardSchema = new Schema<songCard>(
	{
		title: { type: String, required: true, trim: true },
		artist: { type: String, required: true, trim: true },
		difficulty: { type: String, required: true },
		genre: { type: String, required: true },
		songId: { type: String, required: true },
	},
	{ collection: "song_cards" },
);

const songCardModel = model<songCard>("songCard", songCardSchema);

function index(): Promise<songCard[]> {
	return songCardModel.find();
}

//used to get a json from songcard title
function get(title: String): Promise<songCard> {
	return songCardModel
		.find({ title })
		.then((list) => list[0])
		.catch((err) => {
			throw `${title} Not Found`;
		});
}

//used to create a new songCard via json
function create(json: songCard): Promise<songCard> {
	const t = new songCardModel(json);
	return t.save();
}

//used to update a songcard in database
function update(title: String, songcard: songCard): Promise<songCard> {
	return songCardModel
		.findOneAndUpdate({ title }, songcard, {
			new: true,
		})
		.then((updated) => {
			if (!updated) throw `${title} not updated`;
			else return updated as songCard;
		});
}

function remove(title: String): Promise<void> {
	return songCardModel.findOneAndDelete({ title }).then((deleted) => {
		if (!deleted) throw `${title} not deleted`;
	});
}
export { songCardModel };
export default { index, get, create, update, remove };
