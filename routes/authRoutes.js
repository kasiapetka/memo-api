const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });

    app.post("/api/login", (req, res, next) => {
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            if (!user) {
                return res.status(404).json({ errors: info });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.status(403).json({ errors: err });
                }
                return res
                    .status(200)
                    .json({ success: `logged in, user id is: ${user.id}` });
            });
        })(req, res, next);
    });

    app.post("/api/register", async (req, res, next) => {
        const userData = { ...req.body };
        const user = await User.findOne({ email: userData.email });
        if (!user || user?.length === 0) {
            try {
                const newUser = new User({
                    email: userData.email,
                    password: userData.password,
                    nick: userData.nick,
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, async (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        await newUser.save(function (err, user) {
                            return res.status(200).json({
                                success: `regstered, user nick is: ${user.nick}`,
                            });
                        });
                    });
                });
            } catch (err) {
                return res.status(400).json({ errors: err });
            }
        } else
            return res.status(400).json({
                success: `there already is a user with the nick: ${user.nick}`,
            });
    });
};
