var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");

var databaseUrl = "mongo_scraper";
var collections = ["articles"];

var db = mongojs(databaseUrl, collections);

module.exports = function (app) {
    app.get("/", function (req, res) {
        db.articles.find({}, function (error, data) {
            if (error) {
                console.log(error);

            }
            else {
                res.render("index", { articles: data });
            }
        })
    })

    app.get("/api/favoriates", function (req, res) {
        db.favoriates.find({}, function (error, data) {
            if (error) {
                console.log(error)

            }
            else {
                res.render("favoriates", { favoriates: data });
            }
        })
    })

    app.post("/api/add", function (req, res) {
        db.favoriates.insert({
            title: req.body.title,
            summary: req.body.summary,
            url: req.body.url

        })
        res.send();
    })

    app.delete("/api/delete", function (req, res) {
        db.favoriates.remove({
            _id: mongojs.ObjectId(req.body._id)
        });
        res.send();
    })

    app.get("/api/scrape", function (req, res) {
        axios.get("https://www.sciencedaily.com").then(function (response) {
            var $ = cheerio.load(response.data);

            $(".col-xs-6").each(function (i, element) {
                var title = $(element).children("a").children("h3").text();
                var url = $(element).children("a").attr("href");

                axios.get("https://www.sciencedaily.com" + url).then(function(summaryData){
                    var $ = cheerio.load(summaryData.data);

                    $("#abstract").each(function(i, element){
                        var summary = $(element).text();
                        
                        db.articles.insert({
                            title: title,
                            summary: summary,
                            url: "https://www.sciencedaily.com" + url
                        },
        
                        function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log(data);
                            }
                        });
                    })
                }).catch(function(error){
                    console.log(error);
                })
            });
        }).catch(function(error){
            console.log(error);
        })
        res.send();
    })
}