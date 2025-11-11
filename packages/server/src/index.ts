// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import songCards from "./services/songCard-svc";
import songcards from "./routes/songcards";
import auth, { authenticationUser } from "./routes/auth";

connect("songs");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.static(staticDir));
app.use(express.json());
app.use("/api/songcards", authenticationUser, songcards);
app.use("/auth", auth);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
