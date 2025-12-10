"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var songcards_exports = {};
__export(songcards_exports, {
  default: () => songcards_default
});
module.exports = __toCommonJS(songcards_exports);
var import_express = __toESM(require("express"));
var import_songCard_svc = __toESM(require("../services/songCard-svc"));
const router = import_express.default.Router();
router.get("/", (_, res) => {
  import_songCard_svc.default.index().then(
    (list) => res.json({
      /*this might not be right*/
      songCards: list
    })
  ).catch((err) => res.status(500).send(err));
});
router.get("/:title", (req, res) => {
  const { title } = req.params;
  import_songCard_svc.default.get(title).then((songcard) => res.json(songcard)).catch((err) => res.status(404).send(err));
});
router.post("/", (req, res) => {
  const newSongCard = req.body;
  import_songCard_svc.default.create(newSongCard).then((songcard) => res.status(201).json(songcard)).catch((err) => res.status(500).send(err));
});
router.put("/:title", (req, res) => {
  const { title } = req.params;
  const newSongCard = req.body;
  import_songCard_svc.default.update(title, newSongCard).then((songcard) => res.json(songcard)).catch((err) => res.status(404).end());
});
router.put("/by-song/:songid", (req, res) => {
  const { songid } = req.params;
  const data = req.body;
  import_songCard_svc.default.updateBySongId(songid, data).then((updatedCard) => res.json(updatedCard)).catch((err) => res.status(500).end());
});
router.delete("/:title", (req, res) => {
  const { title } = req.params;
  import_songCard_svc.default.remove(title).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
var songcards_default = router;
