var express = require("express");
var mongojs = require("mongojs");

var app = express();

app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var databaseUrl = "mongo_scraper";
var collections = ["articles"];

var db = mongojs(databaseUrl, collections);

require("./routes/api-routes.js")(app);

db.on("error", function(error){
    console.log("Database Error:", error);
});

app.listen(3000, function(){
    console.log("App running on https://localhost:3000");
})