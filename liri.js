/* At the top of the liri.js file, write the code you need to grab the data from keys.js.
Then store the keys in a variable. */

var key = require("./keys.js");

var Twitter = require('twitter');

var client = new Twitter(key.twitter);

var params = {
	count: 20,
};
client.get('statuses/user_timeline', params, function (error, tweets, response) {
	if (!error) {
		console.log(tweets[0].text);
	} else{
		console.log(error);
	}
});