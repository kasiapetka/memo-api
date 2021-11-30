module.exports = app => {
    app.get('/game', (req, res) => {
        res.status(200).send("test game routes");
        
    });
}