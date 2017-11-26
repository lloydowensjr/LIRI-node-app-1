/* At the top of the liri.js file, write the code you need to grab the data from keys.js.
Then store the keys in a variable. */

var key = require("./keys.js");

/*** collecting user input and save to variable ***/
var userInput = process.argv[2];
var userInputMore = process.argv.slice(3).join(" ");

/*** switch statement to cycle through user input selections ***/
switch (userInput) {
	case "my-tweets":
		twitterCall();
		break;
	case "spotify-this-song":
		spotifyCall(userInputMore);
		break;
	default:
		console.log("Not an available selection.")
}

/*** creating Twitter function communicate with Twitter API ***/
function twitterCall() {
	var Twitter = require('twitter');

	var tClient = new Twitter(key.twitter);

	var params = {
		count: 20,
	};

	tClient.get('statuses/user_timeline', params, function (error, tweets, response) {
		if (!error) {
			tweets.forEach(function (tweet) {
				var tweetDate = tweet.created_at;
				var tweetDateFormatted = tweetDate.split(' ').slice(0, 4).join(' ')
				console.log("tweeted: " + tweet.text + " on " + tweetDateFormatted);
			});
		} else {
			console.log(error);
		}

	});
};

/*** creating Spotify function communication with Spotify API ***/
function spotifyCall(userInputMore) {
	var Spotify = require('node-spotify-api');

	var sClient = new Spotify(key.spotify);

	var search = "";

	if (!userInputMore) {
		userInputMore = "Ace of Base, The Sign";
	}

	sClient.search({
		type: 'track',
		query: userInputMore
	}, function (err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		var sData = data.tracks.items[0];
		var sArtist = sData.artists[0].name;
		var sSongName = sData.name;
		var sLink = sData.preview_url;
		var sAlbum = sData.album.name;
		console.log(`Artist: ${sArtist} \n` +
			`Song Name: ${sSongName} \n` +
			`Preview Link: ${sLink} \n` +
			`Album: ${sAlbum} \n`);
	});
};