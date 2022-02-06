const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Score = mongoose.model("scores");

module.exports = (app) => {
    app.get("/api/scoreboard", async (req, res) => {
        try {
            const scores = await Score.find().sort({ score: -1 }).select({
                attempts: false,
                time: false,
            });
            res.status(200).send(scores.slice(0, 10));
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.post("/api/scoreboard", requireLogin, async (req, res) => {
        const { attempts, difficulty, time } = req.body;

        let scoreResult = 0;
        if (100 * difficulty - (attempts + time) <= 0) scoreResult = 1;
        else {
            scoreResult = 100 * difficulty - (attempts + time);
        }

        try {
            const score = new Score({
                score: scoreResult,
                attempts: attempts,
                difficulty: difficulty,
                time: time,
                dateCreated: Date.now(),
                email: req.user.email,
                _user: req.user.id,
            });
            await score.save();

            res.status(200).send();
        } catch (err) {
            res.status(422).send(err);
        }
    });
};
