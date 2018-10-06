const characters = require("../data/friends.js");

module.exports = function(app){

	app.get('/api/friends', function (req, res) {

		characters.getCurrentCharList()
			.then( (allCharacters)=> res.json(allCharacters) )
			.catch( (err)=> {if (err) console.log(err)} );
	});

	app.post('/api/friends', function (req, res){

		characters.matchToCharacter(req.body).then((character)=>{
			res.json(character);
		}).catch((err)=>{if (err) console.log(err);});

	});
};