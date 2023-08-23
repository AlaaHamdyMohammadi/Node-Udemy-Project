const mongoose = require("mongoose");

//Schema
const Schema = mongoose.Schema;
articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    category: {
      type: String,
    },
    //adminID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

//Model
const article = mongoose.model("Article", articleSchema);
module.exports = article;
