import express, { Request, Response } from "express";
import { Song } from "../models/song";
import songs from "../services/song-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
	songs
		.index()
		.then((list: Song[]) => res.json({ songs: list }))
		.catch((err) => res.status(500).send(err));
});

router.get("/:id", (req: Request, res: Response) => {
	const { id } = req.params;
	songs
		.get(id)
		.then((song: Song) => res.json(song))
		.catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
	const newSong = req.body;

	songs
	.create(newSong)
	.then((song: Song) => res.status(201).json(song))
	.catch((err) => res.status(500).send(err));
});

export default router;
