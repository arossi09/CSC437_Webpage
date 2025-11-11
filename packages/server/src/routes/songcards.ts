//this file is used to create router for api calls for songcards
//and mount to the /api/songcards path
import express, { Request, Response } from "express";
import { songCard } from "../models/songCard";
import songCards from "../services/songCard-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
	songCards
		.index()
		.then((list: songCard[]) =>
			res.json({ /*this might not be right*/ songCards: list }),
		)
		.catch((err) => res.status(500).send(err));
});

router.get("/:title", (req: Request, res: Response) => {
	const { title } = req.params;

	songCards
		.get(title)
		.then((songcard: songCard) => res.json(songcard))
		.catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
	const newSongCard = req.body;

	songCards
		.create(newSongCard)
		.then((songcard: songCard) => res.status(201).json(songcard))
		.catch((err) => res.status(500).send(err));
});

router.put("/:title", (req: Request, res: Response) => {
	const { title } = req.params;
	const newSongCard = req.body;

	songCards
		.update(title, newSongCard)
		.then((songcard: songCard) => res.json(songcard))
		.catch((err) => res.status(404).end());
});

router.delete("/:title", (req: Request, res: Response) => {
	const { title } = req.params;

	songCards
		.remove(title)
		.then(() => res.status(204).end())
		.catch((err) => res.status(404).send(err));
});

export default router;
