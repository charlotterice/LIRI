require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var spotify = require("node-spotify-api");
var request = require("request");
var inquirer = require("inquirer");

function getSpotify(song) {
   var spotify = new Spotify (dataKeys.spotify);
   spotify.search({type:"track",query: song}, function (err,data){
       if (err){
           console.log("Error: " + err);
       }else{
           output= 
           "==============LIRI RESULTS==================="
           song + data.tracks.items[0].album.name + data.tracks.items[0].album.artists[0].name + data.tracks.items[0].album.external_urls.spotify;
           console.log(output);
       }
   });
}

function getMovie(movie){
    var OMDB = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=87e19896";
    request (OMDB, function(err,res,body){
        if(err){
            console.log("Error: " + err); 
        }else{
            var movieData = JSON.parse(body);
            output =
            movieData.Title + movieData.Year + movieData.Rated + movieData.imdbRating + movieData.Country + movieData.Language + movieData.Plot + movieData.Actors + movieData.Ratings[1].Value
            console.log(output);
        }
    });
}

function getConcert(concert){
    var bandsInTown = 
}
inquirer
.prompt([
    {
    type:"input",
}
])


