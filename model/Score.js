const mongoose = require("mongoose");
const { Schema } = mongoose;

const scoreSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    score: Number,
    dateCreated: Date,
});

mongoose.model("scores", scoreSchema);
