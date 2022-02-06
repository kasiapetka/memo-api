const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

//create cookie with a token
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//take the user from the cookie
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            const user = await User.findOne({ email: email });
            if (!user || user?.length === 0) {
                return done(null, false, { message: "no user found" });
            } else {
                try {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) return done(null, false, { message: err });
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            done(null, false, { message: "wrong password" });
                        }
                    });
                } catch (err) {
                    return done(null, false, { message: "error" });
                }
            }
        }
    )
);
