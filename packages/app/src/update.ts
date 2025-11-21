import { Auth, ThenUpdate } from "@calpoly/mustang";
import { Song } from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(message: Msg, model: Model, user: Auth.User): Model | ThenUpdate<Model, Msg> {
	// extract the payload
	const payload = message[1];

	switch (message[0]) {
		case "song/request": {
			const { songid } = payload;

			console.log("song/request", songid, model.song);
			if (model.song?.songid === songid) break;

			return [
				{ ...model, song: { songid } as Song },
				requestSong(payload, user).then((song) => ["song/load", {songid, song }]),
			];
		}

		case "song/load": {
			if (!("song" in payload)) {
				throw new Error("Payload missing song for song/load");
			}
			const { song } = payload;
			return { ...model, song };
		}

		default:
			throw new Error(`Unhandled message "${message[0]}"`);
	}
	return model;
}

function requestSong(payload: { songid: string }, user: Auth.User) {
	return fetch(`/api/songs/${payload.songid}`, {
		headers: Auth.headers(user),
	})
		.then((response: Response) => {
			if (response.status === 200) return response.json();
			throw new Error("No response from server");
		})
		.then((json: unknown) => {
			if (json) return json as Song;
			throw new Error("No JSON in server response");
		});
}
