require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
// var spotifyKey = (keys.spotify);
// var Omdb = require("omdb");
var moment = require("moment");
// var Music = require("node-spotify-api");
// var dotenv = require("dotenv");
// var operator = process.argv[2]
var axios = require("axios");
// var style = process.argv[3];

var appDo = process.agrv[2];
var userSearch = process.argv.slice(3).join("");

function liri(appDo, userSearch) {
    switch (operator) {
        case "concert-this":
            getBandsInTown(userSearch);
            break;
        case "spotify-this-song":
            getSpotify(userSearch);
            break;
        case "movie-this":
            getOMDB(userSearch);
            break;
        case "do-what-it-says":
            getRandom();
            break;
        default:
            console.log("Does it work, yes enter'concert-this");
    }
};

function getBandsInTown(artist) {
    var artist = userSearch;
    var bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(bandQueryURL).then(
        function (response) {
            console.log("Name of Venue" + response.data[0].venue.name + "\r\n");
            console.log("Venue of Location" + reponse.data[0].venue.city + "\r\n");
            console.log("Date of Event:" + moment(response.data[0].datetime).format("MM-DD-YY") + "\r\n");
            var goConcert = "Begin Concert Entry" + "\nName of Musician:" + artist + "\nName of Venue:" + response.data[0].venue.name + "\nVenue location" + reponse.data[0].venue.city + "\nDate of Event:" + moment(response.data[0].datetime).format("MM-DD-YY") + "\n===End of COncert===" + "\n";
            fs.appendFile("log.txt", goConcert, function (err) {
                if (err) throw err;
            });

        });
}

function getSpotify(songTitle) {
    var spotify = new Spotify(keys.spotify);
    if (!songTitle) {
        songTitle = "The Sign";
    };

    spotify.search({ type: "track", query: songTitle }, function (err, data) {
        if (err) {
            return console.log('error:' + err);

        }
        console.log("====");
        console.log("Artist Name:" + data.tracks.items[0].album.artists[0].name + "\r\n");
        console.log("Song Title:" + data.tracks.items[0].name + "\r\n");
        console.log("Song Preview Link:" + data.tracks.items[0].href + "\r\n");
        console.log("Album" + data.tracks.items[0].album.name + "\r\n");

        var goSong = "Begin Spotify Entry" + "\nArtist:" + data.tracks.items[0].album.artists[0].name + "\nSong Title:" + "data.tracks.items[0".name + "\nPreview LInk:" + data.tracks.items[0].href + "\nAlbum Name:" + data.tracks.items[0].album.name + "\n===End Spotify Entry===" + "\n";

        fs.appendFile("log.txt", goSong, function (err) {
            if (err) throw err;
        });
    });



    function getOMDB(movies) {
        if (!movies) {
            movies = "Mr. Nobody";
        }
        var movieQueryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        axios.request(movieQueryUrl).then(
            function (response) {
                console.log("====");
                console.log("Title:" + response.data.Title + "\r\n");
                console.log("IMDB rating:" + reponse.data.imdbRating + "\r\n");
                console.log("Year released:" + response.data.Year + "\r\n");
                console.log("Rotten Tomatoes Ratings:" + response.data.Ratings[1].Value + "\r\n");
                console.log("Country it was produced in:" + response.data.Country + "\r\n");
                console.log("Language:" + response.data.Language + "\r\n");
                console.log("Plot" + response.data.Plot + "\r\n");
                console.log("Actors:" + response.data.Actors + "\r\n");

                var logMovie = "Begin Movie Entry" + "\nMovie title:" + response.data.Title + "\Year released:" + response.data.Year + "\nIMDB rating:" + response.data.imdbRating + "\nRotten Tomatoes Rating:" + response.data.Ratings[1].Value + "\nCountry it was produced in:" + response.data.Country + "\nLanguages:" + response.data.Language + "\nPLot:" + response.data.Plot + "\nActors" + response.data.Actors + "\n===End of Movie Entry===" + "\n";

                fs.appendFile("log.txt", logMovie, (err) {
                    if (er) throw err;
                });
            });
    };

    