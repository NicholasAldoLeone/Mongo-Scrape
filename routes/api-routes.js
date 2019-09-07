var express = require("express");
var mongojs = require("mongojs");

var databaseUrl = "mongo_scraper";
var collections = ["articles"];

var db = mongojs(databaseUrl, collections);

module.exports = function(app) {
    app.get("/", function(req, res){
        db.articles.find({}, function(error, data){
            if(error) {
                console.log(error);

            }
            else {
                console.log(data);
                res.render("index", {articles: data});
            }
        })
    })

    app.get("api/favoriates", function(req, res){

    })
}