// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import path from "path";
import fs from "node:fs/promises";
import songcards from "./routes/songcards";
import songs from "./routes/songs";
//TODO import favorites from "./routes/favorites"
import auth, { authenticationUser } from "./routes/auth";
connect("songs");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

console.log("staticdir=", staticDir);
app.use(express.static(staticDir));
app.use(express.json());

app.use("/auth", auth);
app.use("/api/songcards",  songcards);
app.use("/api/songs", songs);

app.use("/app", (_: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
