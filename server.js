var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');

/* var connection = mysql.createConnection({
    host: "34.173.42.98",
    user: "root",
    password: "password",
    database: "411_project"
});

connection.connect; */

var app = express();

app.set('views', path.join('C:/Users/sunny/OneDrive/Documents/cs411_proj', 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('C:/Users/sunny/OneDrive/Documents/cs411_proj' + '../public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get("/read", (req, res) => {
    res.render("read", {title: 'Read this now'});
});

app.get("/update", (req, res) => {
    res.render("update", {title: 'Update course grades here.'});
});

app.get("/delete", (req, res) => {
    res.render("delete", {title: 'Delete user review here for moderation'});
});

app.get("/search", (req, res) => {
    res.render("search", {title: 'Enter attribute you want data on'});
});

/* app.get('/success', function(req, res) {
    res.send({'message': 'User added successfully!'});
});

app.post('/mark', function(req, res) {
    var FirstName = req.body.FirstName;

    var sql = `INSERT INTO Users (FirstName) VALUES ('${FirstName}', 1)`;
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.send(err);
            return;
        }
        res.redirect('/success');
    });
}); */

app.listen(80, function() {
    console.log('Node app is running on port 80');
});

/* var app = express();

app.get('/', function (req, res) {
    res.send({ 'message': 'Waddap, use 192.168.162.1 to get into this exclusive club' });
});

app.listen(80, function () {
    console.log('Node app is running on port 80');
}) */