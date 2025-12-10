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
  default: () => songCard_svc_default,
  songCardModel: () => songCardModel
});
module.exports = __toCommonJS(songCard_svc_exports);
var import_mongoose = require("mongoose");
const songCardSchema = new import_mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true },
    genre: { type: String, required: true },
    instrument: { type: String, required: true },
    songId: { type: String, required: true },
    userid: { type: String, required: true }
  },
  { collection: "song_cards" }
);
const songCardModel = (0, import_mongoose.model)("songCard", songCardSchema);
function index() {
  return songCardModel.find();
}
function get(title) {
  return songCardModel.find({ title }).then((list) => list[0]).catch((err) => {
    throw `${title} Not Found`;
  });
}
function create(json) {
  const t = new songCardModel(json);
  return t.save();
}
function update(title, songcard) {
  return songCardModel.findOneAndUpdate({ title }, songcard, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${title} not updated`;
    else return updated;
  });
}
function updateBySongId(songid, data) {
  return songCardModel.findOneAndUpdate({ songId: songid }, data, { new: true, upsert: true }).then((updated) => {
    if (!updated) throw `SongCard for songId ${songid} not updated`;
    return updated;
  });
}
function remove(title) {
  return songCardModel.findOneAndDelete({ title }).then((deleted) => {
    if (!deleted) throw `${title} not deleted`;
  });
}
var songCard_svc_default = {
  index,
  get,
  create,
  update,
  remove,
  updateBySongId
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  songCardModel
});
