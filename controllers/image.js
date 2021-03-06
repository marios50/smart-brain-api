const clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'c02c619d4e3e4630b9552a69cf63dae0'
});

const handleApiCall = (req, res) => {
app.models
    .predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
    	res.json(data);
    })
    .catch(err => res.status(400).json('api call failed'))

 }


const handleImage = (req,res,db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to get centries'))
}

module.exports = {
	handleImage,
	handleApiCall
}