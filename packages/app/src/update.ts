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
			console.log("Saving song to API...");
			return [
				model,
				saveSong(payload, user, callbacks).then((song) => [
					"song/load",
					{ songid, song },
				]),
			];
		}

		//this is needed to handle message for creating a song PUT request
		case "song/create": {
			if (!("song" in payload)) {
				throw new Error("Payload missing song for song/create");
			}
			//const { song } = payload;
			return [
				model,
				createSong(payload, user, callbacks).then((createdSong) => [
					"song/load",
					{ song: createdSong },
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
function saveSong(
	msg: {
		songid: string;
		song: Song;
	},
	user?: Auth.User,
	reactions?: Message.Reactions,
): Promise<Song> {
	saveSongCard(msg, user);
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

function saveSongCard(
	msg: { songid: string; song: Song },
	user?: Auth.User,
): Promise<void> {
	console.log("saveSongCard()", msg.songid, msg.song);
	return fetch(`/api/songcards/by-song/${msg.songid}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			...Auth.headers(user),
		},
		body: JSON.stringify({
			title: msg.song.title,
			artist: msg.song.artist,
			difficulty: msg.song.difficulty,
			genre: msg.song.genre,
			instrument: msg.song.instrument,
			songId: msg.song.songid,
			userid: msg.song.userid,
		}),
	}).then((res) => {
		if (!res.ok) throw new Error(`Failed to update songCard for ${msg.songid}`);
	});
}

function createSong(
	msg: { song: Song },
	user?: Auth.User,
	reactions?: Message.Reactions,
): Promise<Song> {
	return fetch(`/api/songs/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...Auth.headers(user),
		},
		body: JSON.stringify(msg.song),
	})
		.then((response: Response) => {
			console.log("Response status:", response.status);
			console.log("Response ok:", response.ok);
			if (response.status === 200 || response.status === 201)
				return response.json();
			else throw new Error(`Failed to create song for ${msg.song}`);
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
