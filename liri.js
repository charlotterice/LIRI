require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var request = require("request");
var inquirer = require("inquirer");
var spotify = new Spotify(keys.spotify);

var userChoice = process.argv[2];
var searchParameter = process.argv[3];

function userInput (userOption, inputParameter){
    switch(userOption){
        case "concert-this":
        
    }
}
function getSpotify(song) {
  spotify.search({ type: "track", query: song }, function(err, data) {
    if (err) {
      console.log("Error: " + err);
    } else {
      output = "==============LIRI RESULTS===================";
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
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=87e19896";
  request(OMDB, function(err, res, body) {
    if (err) {
      console.log("Error: " + err);
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

function getConcert(bandQuery){
    var bandsInTown ="https://rest.bandsintown.com/artists/" + bandQuery + "/events?app_id=codingbootcamp#";
    request(bandInTown, function (err,res,body){
        if(!err && res.statusCode ===200){
            var concert = JSON.parse(body);
            console.log(concert[0].venue.city + concert[0].venue.country)
    }
    }
    )};
inquirer
  .prompt([
    {
      type: "list",
      message: "Which would you like to search?",
      choices: ["Songs", "Movies", "Concerts"],
      name: "choices"
    },
    {
      type: "input",
      message: "What song would you like to find information about?",
      name: "songChoice"
    },
    {
      type: "input",
      message: "What movie would you like to find information about?",
      name: "movieChoice"
    },
    {
        type: "input",
        message: "What band would you like to find information about?",
        name: "bandChoice"
      }
  ])
  .then(function(inquirerResponse) {
    if (inquirerResponse.songChoice) {
      getSpotify();
    } else if (inquirerResponse.movieChoice) {
      getMovie();
    }else {
     getConcert();
    }
  });


  userInput(userChoice,searchParameter);