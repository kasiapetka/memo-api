const mongoose = require("mongoose");
const { Schema } = mongoose;

const scoreSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    score: Number,
    attempts: Number,
    difficulty: Number,
    time: Number,
    email: String,

    dateCreated: Date,
});

mongoose.model("scores", scoreSchema);
