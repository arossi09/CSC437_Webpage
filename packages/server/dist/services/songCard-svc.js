"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var songCard_svc_exports = {};
__export(songCard_svc_exports, {
  default: () => songCard_svc_default
});
module.exports = __toCommonJS(songCard_svc_exports);
var import_mongoose = require("mongoose");
const songCardSchema = new import_mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true },
    genre: { type: String, required: true },
    song_link: { type: String },
    artist_link: { type: String },
    genre_link: { type: String },
    difficulty_link: { type: String }
  },
  { collection: "song_cards" }
);
const songCardModel = (0, import_mongoose.model)("Song", songCardSchema);
function index() {
  return songCardModel.find();
}
function get(title) {
  return songCardModel.find({ title }).then((list) => list[0]).catch((err) => {
    throw `${title} Not Found`;
  });
}
var songCard_svc_default = { index, get };
