require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var spotify = require("node-spotify-api");
var request = require("request");
var inquirer = require("inquirer");

inquirer
.prompt([
    {
    type:"input"}
])


