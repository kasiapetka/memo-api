const passport = require("passport");

module.exports = app => {

    app.get('/api/current_user',
        (req, res) => {
            res.send(req.user);
        });

    app.post('/api/login', (req, res, next) => {


        passport.authenticate("local", function (err, user, info) {
            if (err) {
                return res.status(400).json({ errors: err })
            }
            if (!user) {
                return res.status(400).json({ errors: "no user found" })
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.status(400).json({ errors: err })
                }
                return res.status(200).json({ success: `logged in, user id is: ${user.id}` })

            })

        })(req, res, next)
    })
}