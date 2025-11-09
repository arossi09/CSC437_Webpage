// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import songCards from "./services/songCard-svc";
import songcards from "./routes/songcards";

connect("songs");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.static(staticDir));
app.use(express.json());
app.use("/api/songcards", songcards);

app.get("/hello", (req: Request, res: Response) => {
	res.send("Hello, World");
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

app.get("/songcards/:title", (req: Request, res: Response) => {
	const { title } = req.params;
	songCards.get(title).then((data) => {
		if (data)
			res.set("Content-Type", "application/json").send(JSON.stringify(data));
		else res.status(404).send();
	});
});
