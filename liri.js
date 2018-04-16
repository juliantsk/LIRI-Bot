require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var callAPI = require("request");
var request = process.argv[2];
var prop = process.argv[3];

function liri(request, prop) {
    switch (request) {
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            spotifyThis();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doRandom();
            break;
    };
}

liri(request, prop);

function spotifyThis() {
    // 'spotify-this-song'
    // Show information about song:
    // Artist(s), song's name, 
    // preview link of the song,
    // album that the song is from

    // If no song provided,

    // default to "The Sign" by Ace of Base.
}

function myTweets() {
    // 'my-tweets'
    // Show your last 20 tweets and
    // when they were created

}

function movieThis() {
    // 'movie-this'
    //  Show: title, year, IMDB rating,
    // Rotten Tomatoes Rating, Country,
    // language, plot, actors.
    var movieName = "";
    // ...
    for (var i = 2; process.argv[i]; i++) {
        movieName += "+" + process.argv[i];
    }


    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);


    // Then create a request to the queryUrl
    // ...
    request(queryUrl, function(error, response, body) {

        // If the request is successful
        // ...
        if (!error && response.statusCode === 200) {

            // Then log the Release Year for the movie
            // ...
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Relase Year: " + JSON.parse(body).Year);
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Year);
            console.log("Language: " + JSON.parse(body).Year);
            console.log("Plot: " + JSON.parse(body).Year);
            console.log("Actors: " + JSON.parse(body).Year);
        }
    });
    // If no movie provided,

    // default to "Mr. Nobody"
}

function doRandom() {
    var tempRequest;
    var tempProp;
    // 'do-what-it-says'
    // Take the text in random.txt...
    // ...read a random line

    // ...and call one of LIRI's commands.
    liri(tempRequest, tempProp);
}