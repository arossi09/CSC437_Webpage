import { Auth, ThenUpdate, Message } from "@calpoly/mustang";
import { Song } from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(
	message: Msg,
	model: Model,
	user: Auth.User,
): Model | ThenUpdate<Model, Msg> {
	//  extract the payload
	const [command, payload, callbacks] = message;

	switch (command) {
		case "song/request": {
			const { songid } = payload;

			console.log("song/request", songid, model.song);
			if (model.song?.songid === songid) break;

			return [
				{ ...model, song: { songid } as Song },
				requestSong(payload, user).then((song) => [
					"song/load",
					{ songid, song },
				]),
			];
		}

		case "song/load": {
			if (!("song" in payload)) {
				throw new Error("Payload missing song for song/load");
			}
			const { song } = payload;
			return { ...model, song };
		}
		case "song/save": {
			const { songid } = payload;
			console.log("Saving song to API..." );
			return [
				model,
				saveProfile(payload, user, callbacks).then((song) => [
					"song/load",
					{ songid, song },
				]),
			];
		}

		default: {
			const unhandled: never = command;
			throw new Error(`Unhandled message "${unhandled}"`);
		}
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
function saveProfile(
	msg: {
		songid: string;
		song: Song;
	},
	user?: Auth.User,
	reactions?: Message.Reactions,
): Promise<Song> {
	return fetch(`/api/songs/${msg.songid}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			...Auth.headers(user),
		},
		body: JSON.stringify(msg.song),
	})
		.then((response: Response) => {
			if (response.status === 200) return response.json();
			else throw new Error(`Failed to save song for ${msg.song}`);
		})
		.then((json: unknown) => {
			if (json) {
				if (reactions?.onSuccess) reactions.onSuccess();
				return json as Song;
			} else throw "No JSON in API response";
		})
		.catch((err) => {
			if (reactions?.onFailure) reactions.onFailure(err);
			throw err;
		});
}
