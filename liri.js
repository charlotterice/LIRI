require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var request = require("request");
var inquirer = require("inquirer");

// var userChoice = process.argv[2];
// var searchParameter = process.argv[3];

// function userInput(userOption, inputParameter) {
//   switch (userOption) {
//     case "concert-this":
//   }
// }
function getSpotify(song) {
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: "track", query: song }, function(err, data) {
    if (err) {
      console.log("Error: " + err);
      return;
    } else {
      output = "==============LIRI RESULTS==================="+
      song +
        data.tracks.items[0].album.name +
        data.tracks.items[0].album.artists[0].name +
        data.tracks.items[0].album.external_urls.spotify;
      console.log(output);
    }
  });
}

function getMovie(movie) {
  var OMDB =
    "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=87e19896";
  request(OMDB, function(err, res, body) {
    if (err) {
      console.log("Error: " + err);
      return;
    } else {
      var movieData = JSON.parse(body);
      output =
        movieData.Title +
        movieData.Year +
        movieData.Rated +
        movieData.imdbRating +
        movieData.Country +
        movieData.Language +
        movieData.Plot +
        movieData.Actors +
        movieData.Ratings[1].Value;
      console.log(output);
    }
  });
}

function getConcert(bandQuery) {
  var bandsInTown =
    "https://rest.bandsintown.com/artists/" +
    bandQuery +
    "/events?app_id=codingbootcamp#";
  request(bandsInTown, function(err, res, body) {
    if (!err && res.statusCode === 200) {
      var concert = JSON.parse(body);
      console.log(concert[0].venue.city + concert[0].venue.country);
    }
  });
}
function initiateCommand() {
  fs.readFile("random.txt", "utf-8", function(err, data) {
    getSpotify(data);
  });
}
var options = [
  {
    type: "list",
    message: "Which would you like to search?",
    choices: ["Songs", "Movies", "Concerts"],
    name: "choices"
  },
  {
    type: "input",
    message: "What song would you like to find information about?",
    name: "songChoice",
    when: function(answers) {
      return answers.choices == "Songs";
    }
  },
  {
    type: "input",
    message: "What movie would you like to find information about?",
    name: "movieChoice",
    when: function(answers) {
      return answers.choices == "Movies";
    }
  },
  {
    type: "input",
    message: "What band would you like to find information about?",
    name: "bandChoice",
    when: function(answers) {
      return answers.choices == "Concerts";
    }
  }
];

inquirer.prompt(options)
.then(function(answers){
  switch (answers.choices) {
    case "Spotify":
      getSpotify(answers.songChoice);
      break;
    case "OMDB":
      getMovie(answers.movieChoice);
      break;
    case "Get Concert":
      getConcert(answers.bandChoice);
      break;
    case "Run Command":
      initiateCommand;
      break;
    default:
      console.log("Command Unknown");
  }
});
