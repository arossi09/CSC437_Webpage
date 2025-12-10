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
var song_svc_exports = {};
__export(song_svc_exports, {
  default: () => song_svc_default
});
module.exports = __toCommonJS(song_svc_exports);
var import_mongoose = require("mongoose");
var import_songCard_svc = require("../services/songCard-svc");
const songSchema = new import_mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    instrument: { type: String, required: true, trim: true },
    userid: { type: String, required: true },
    key: { type: String, required: false },
    bpm: { type: String, required: false },
    sections: [
      {
        type: { type: String },
        lyrics: String
      }
    ],
    chords: [
      {
        section: String,
        chords: [String],
        inline: Boolean
      }
    ],
    tabs: [
      {
        //instrument: String,
        section: String,
        tabBody: String
      }
    ]
  },
  { timestamps: true, collection: "song_collection" }
);
const songModel = (0, import_mongoose.model)("Song", songSchema);
function index() {
  return songModel.find();
}
function get(id) {
  return songModel.findById(id).then((doc) => {
    if (!doc) throw `${id} Not Found`;
    return doc;
  });
}
function create(json) {
  const t = new songModel(json);
  return t.save().then((savedSong) => {
    const card = new import_songCard_svc.songCardModel({
      title: savedSong.title,
      artist: savedSong.artist,
      difficulty: savedSong.difficulty,
      genre: savedSong.genre,
      instrument: savedSong.instrument,
      songId: savedSong._id.toString(),
      userid: savedSong.userid
    });
    return card.save().then(() => savedSong);
  });
}
function update(id, song) {
  return songModel.findByIdAndUpdate(id, song, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${id} not updated`;
    else return updated;
  });
}
function remove(id) {
  return songModel.findByIdAndDelete(id).then((deleted) => {
    if (!deleted) throw `${id} not deleted`;
  });
}
var song_svc_default = { index, get, create, update, remove };
