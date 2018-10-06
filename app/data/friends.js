const fs = require("fs");

var file = './app/data/friendsList.json';

//object passed in is the user entry
// function updateCharList (object) {

// 	//if there is no friendsList.json file create one
// 	if (!fs.existsSync(file)) {
// 		fs.writeFileSync(file, "[" + JSON.stringify(object) + "]");
// 	//else read the exisiting file
// 	} else {

// 		fs.readFile(file, 'utf-8', (err, data) => {
// 			if (err) {
// 				console.log(err);
// 			}

// 			var arr = [];
// 			//parse the json data into an array
// 			if (data) {
// 				arr = JSON.parse(data);
// 			}
// 			//push the user information into the new array
// 			arr.push(object);
// 			//write the new updated array overtop the friendsList file
// 			fs.writeFile(file, JSON.stringify(arr, null, 5), (err) => {
// 					if (err) console.log(err);

// 				});

// 		});
// 	}
// }
//function to grab the current list of friends
function getCurrentCharList() {

	return new Promise((resolve, reject)=>{
		//read the friendsList.json file
		fs.readFile(file, 'utf-8', (err, data) => {
			//if there is an error reject
			if (err) {
				reject(err);
			}
			var arr = [];
			//if data is returned then parse the json into the empty array
			if (data) {
				arr = JSON.parse(data);
			}
			//resolve with the new arrays information
			resolve(arr);
		});
	});
}

// function to proform logic finding the best matching friend
function matchToCharacter (obj) {
	//obj is the user entry object

	return new Promise((resolve, reject) => {

		getCurrentCharList().then((allCharacters)=>{
			//allCharacters is the array of all people

			//userScores is the array of the users scores
			var userScores = obj.scores;

			userScores.map((e)=> parseInt(e));
			//changes the list of answers into numbers

			var closestFriend = {
				name: '',
				photo: '',
				scores: []
			}

			var lowestDiff = 50;

			//e is current value and i is index
			allCharacters.forEach((e, i)=>{
				//diffBetween computes the lowestDiff in scores between the user and each person
				var diffBetween = e.scores.map((e)=> parseInt(e))
					//reduces the scores array to a single value
					.reduce((accumulator, value, index)=> {
						return accumulator + Math.abs(value - userScores[index]);
					});

					console.log('______________________________');
					console.log(i+": "+e.name +" "+ "has a difference between the user of "+diffBetween);
					console.log('______________________________');

				//if the difference between is lower than the previous lowest difference...
				if (diffBetween < lowestDiff) {
					//lowestDiff becomes the current diffBetween
					lowestDiff = diffBetween;
					//closestFriend becomes the friend at this index (will be replaced if another is lower later in the loop)
					closestFriend = allCharacters[i];

					console.log("***********"+e.name +" "+"is now the closest match with a diff of "+lowestDiff);
					console.log('______________________________');

				}
			});
			//call function to update the frinds list with user info
			//updateList(obj);
			//resolve with the closestFriend match
			resolve(closestFriend);
			//if error reject
		}).catch((err)=>{if(err) reject(err);});

	});

}

//export functions for use in apiRoutes.js
// exports.updateCharList = updateCharList;
exports.matchToCharacter = matchToCharacter;
exports.getCurrentCharList = getCurrentCharList;