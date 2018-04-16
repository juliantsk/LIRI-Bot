var keys = require("./keys");
var callAPI = require("request");
var fs = require("fs");
var readline = require("readline");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var request = process.argv[2];
var property = "";

for (var i = 3; process.argv[i]; i++) {
    property += process.argv[i] + "+";
}

function liri(request, prop) {
    switch (request) {
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            spotifyThis(prop);
            break;
        case "movie-this":
            movieThis(prop);
            break;
        case "do-what-it-says":
            doRandom();
            break;
    };
}

liri(request, property);
log("\n" + request + " " + property);

function spotifyThis(prop) {
    // 'spotify-this-song'
    var song = prop;
    // If no song provided,
    if (song === "") song = "the sign by ace of base";
    // default to "The Sign" by Ace of Base.
    // Show information about song:
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) console.log(err);
        // Artist(s),
        console.log("\n" + data.tracks.items[0].artists[0].name);
        log("\n" + data.tracks.items[0].artists[0].name);
        // song's name, 
        console.log(data.tracks.items[0].name);
        log(data.tracks.items[0].name);
        // preview link of the song,
        console.log(data.tracks.items[0].external_urls.spotify);
        log(data.tracks.items[0].external_urls.spotify);
        // album that the song is from
        console.log(data.tracks.items[0].album.name + "\n");
        log(data.tracks.items[0].album.name + "\n");
    });

}

function myTweets() {
    // 'my-tweets'
    // Show your last 20 tweets and
    var params = { screen_name: "nodejs" };
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("\ntweet " + (i + 1) + ": " + tweets[i].text + "\n::::::: " + tweets[i].created_at + "\n");
                log("tweet " + (i + 1) + ": " + tweets[i].text + "\n::::::: " + tweets[i].created_at + "\n");
            }
        }
    });
    // when they were created

}

function movieThis(prop) {
    // 'movie-this'
    //  Show: title, year, IMDB rating,
    // Rotten Tomatoes Rating, Country,
    // language, plot, actors.
    var movieName = prop;
    // If no movie provided, default to "Mr. Nobody"
    if (movieName === "") movieName = "Mr.Nobody";

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // Then create a request to the queryUrl
    callAPI(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Then log the relevant information...
            console.log("\nTitle: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Year);
            console.log("Language: " + JSON.parse(body).Year);
            console.log("Plot: " + JSON.parse(body).Year);
            console.log("Actors: " + JSON.parse(body).Year + "\n");

            // ...and log the relevant information to log.txt.
            log("Title: " + JSON.parse(body).Title);
            log("Release Year: " + JSON.parse(body).Year);
            log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            log("Country: " + JSON.parse(body).Year);
            log("Language: " + JSON.parse(body).Year);
            log("Plot: " + JSON.parse(body).Year);
            log("Actors: " + JSON.parse(body).Year);
        }
    });
}

function doRandom() {
    var tempRequest = "";
    var tempProperty = "";
    // 'do-what-it-says'
    // Take the text in random.txt...
    fs.readFile("./random.txt", "utf8", function(err, data) {
        if (err) throw err;
        // Split the file into lines...
        var lines = data.split("\r\n");
        // ...pick a random number...
        var random = Math.floor(Math.random() * Math.floor(lines.length));
        // ...read a random line, and split it into an array with two strings...
        var properties = lines[random].split(",", 2);
        // ...assign the two strings to the two temporary variables...
        tempRequest = properties[0];
        tempProperty = properties[1];
        // ...run liri with the updated variables.
        liri(tempRequest, tempProperty);
    });


}

function log(arg) {
    fs.appendFile("./log.txt", arg + "\n", function(err) {
        if (err) throw err;
        console.log("Saved!");
    })
}