const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'f1ad064465ec4cacaf547ce77ddc9b07'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("unable to work with api"))
}

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where({id})
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        if (entries.length) {
            res.json(entries[0]);
        } else {
            res.status(400).json("no such user");
        }
    })
    .catch(err => res.status(400).json("unable to get entries"));
}

module.exports = {
    handleApiCall: handleApiCall,
    handleImage: handleImage
};