require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var request = require("request");
var inquirer = require("inquirer");
var space = "\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";

function getSpotify(song) {
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: "track", query: song }, function(err, data) {
    if (err) {
      console.log("Error: " + err);
      return;
    } else {
      output =
        "==============LIRI SONG RESULTS===================" +
        space +
        "Song Name: " + song +
        space +
        "Album Name: " +
        data.tracks.items[0].album.name +
        space +
        "Artist Name: " +
        data.tracks.items[0].album.artists[0].name +
        space +
        "Link to Song: " +
        data.tracks.items[0].album.external_urls.spotify;
      console.log(output);
    }
  });
}

var getMovie = function(movie) {
  var OMDB =
    "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=87e19896";
  request(OMDB, function(err, res, body) {
    if (err) {
      console.log("Error: " + err);
      return;
    } else {
      var movieData = JSON.parse(body);
      output =
      "==============LIRI MOVIE RESULTS===================" +
      space + 
      "Movie Title: " + movieData.Title +
      space +
      "Movie Release Year: " + movieData.Year +
      space +
      "Movie Rating: " + movieData.Rated +
      space +
      "Movie Language: " + movieData.Language +
      space +
      "Movie Summary: " + movieData.Plot 
      console.log(output);
    }
  });
};

// function getConcert(bandQuery) {
//   var bandsInTown =
//     "https://rest.bandsintown.com/artists/" +
//     bandQuery +
//     "/events?app_id=codingbootcamp#";
//   request(bandsInTown, function(err, res, body) {
//     if (!err && res.statusCode === 200) {
//       var concert = JSON.parse(body);
//       console.log(concert[0].venue.city + concert[0].venue.country);
//     }
//   });
// }
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
    name: "programs"
  },
  {
    type: "input",
    message: "What song would you like to find information about?",
    name: "songChoice",
    when: function(answers) {
      return answers.programs == "Songs";
    }
  },
  {
    type: "input",
    message: "What movie would you like to find information about?",
    name: "movieChoice",
    when: function(answers) {
      return answers.programs == "Movies";
    }
  }
  // ,
  // {
  //   type: "input",
  //   message: "What band would you like to find information about?",
  //   name: "bandChoice",
  //   when: function(answers) {
  //     return answers.programs == "Concerts";
  //   }
  // }
];

inquirer.prompt(options).then(function(answers) {
  switch (answers.programs) {
    case "Songs":
      getSpotify(answers.songChoice);
      break;
    case "Movies":
      getMovie(answers.movieChoice);
      break;
    case "Concerts":
      getConcert(answers.bandChoice);
      break;
    case "Run Command":
      initiateCommand();
      break;
    default:
      console.log("Command Unknown");
  }
});
