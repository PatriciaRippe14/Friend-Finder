// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources. 
// These data sources hold arrays of information on all possible friends
// ===============================================================================

var friends 		= require('../data/friends.js');


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

	// API GET Requests
	// Below code handles when users "visit" a page. 
	// In each of the below cases when a user visits a link 
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table) 
	// ---------------------------------------------------------------------------

	app.get('/api/friends', function(req, res){
		res.json(friends);
	});


	// API POST Requests
	// Below code handles when a user submits a form and thus submits data to the server.
	// In each of the below cases, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate Javascript array
	// ---------------------------------------------------------------------------

	app.post('/api/friends', function(req, res){ 
		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};

		// Here we take the result of the user's survey POST and parse it.
		var userData 	= req.body;
		var userName 	= userData.name;
		var userPhoto 	= userData.photo;
		var userScores 	= userData.scores;

		// This variable will calculate the difference between the user's scores and the scores of
		// each user in the database
		var totalDifference = 0;

		// Here we loop through all the friend possibilities in the database. 
		for  (var i=0; i< friends.length; i++) {

			console.log(friends[i].name);
			totalDifference = 0;

			// We then loop through all the scores of each friend
			for (var j=0; j< friends[i].scores[j]; j++){

				// We calculate the difference between the scores and sum them into the totalDifference
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				// If the sum of differences is less then the differences of the current "best match"
				if (totalDifference <= bestMatch.friendDifference){

					// Reset the bestMatch to be the new friend. 
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}
		friends.push(userData);

		res.json(bestMatch);

	});

}