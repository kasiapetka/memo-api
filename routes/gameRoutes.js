module.exports = app => {
    app.get('/api/game', (req, res) => {
        res.status(200).send("test game routes");
        
    });
}