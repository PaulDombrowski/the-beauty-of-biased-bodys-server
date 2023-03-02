const { Schema, model } = require("mongoose");

const picturesSchema = new Schema({
  imageUrl: String,
  title: String,
  source: {
        type: String,
        enum: ["DALL.E 2", "DeepAI"]
            }
  prompt: {
    type: String,
    enum: ["man", "gay man", "woman", "lesbian", "masculinity", "femininity", "trans man", "trans woman"]
  }
},
{
  timestamps: true
})

const Pictures = model("Pictures", picturesSchema);

module.exports = Pictures;