var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var connection = mysql.createConnection({
                host: '34.173.42.98',
                user: 'root',
                password: 'password',
                database: '411_project'
});

connection.connect;


var app = express();

// set up ejs view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering index.ejs */

app.get('/', function(req, res) {
  res.render('index', { title: 'Team 404' });
});

/*
app.get("/read", (req, res) => {
    res.render("read", {title: 'Read Course List'});
});

app.get("/update", (req, res) => {
    res.render("update", {title: 'Update course grades here'});
});

app.get("/delete", (req, res) => {
    res.render("delete", {title: 'Delete User from the database'});
});

app.get("/search", (req, res) => {
    res.render("search", {title: 'Search for review by keyword'});
});

app.get("/adv1", (req, res) => {
    res.render("adv1", {title: 'Use first advanced query:'});
});

app.get("/adv2", (req, res) => {
    res.render("adv2", {title: 'Use second advanced query:'});
});

app.get('/create-success', function(req, res) {
      res.send({'message': 'User inserted successfully!'});
});

app.get('/read-success', function(req, res) {
    res.send({'message': 'Courses read successfully!'});
});

app.get('/delete-success', function(req, res) {
    res.send({'message': 'User deleted successfully!'});
});
*/



// this code is executed when a user clicks the form submit button
app.post('/create-user', function(req, res) {
        var name = req.body.name;
        var netid = req.body.netid;
        var dept = req.body.dept;
        var sem = req.body.sem;
        var year = req.body.year;
        var email = req.body.email;
        var pass1 = req.body.password;
        var sq2 = `INSERT INTO User VALUES('${name}', '${netid}', '${dept}', '${sem}',${year},'${email}','${pass1}');`;
        //var sql = `INSERT INTO attendance (netid, present) VALUES ('${netid}',1)`;



console.log(sq2);
  connection.query(sq2, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/create-success');
  });
});

/*
// this code is executed when a user clicks the form submit button
app.post('/read-course', function(req, res) {
        var dept = req.body.dept;
        var numrow = req.body.numrow;
        var sql = `SELECT * from Courses where DeptId='${dept}' LIMIT ${numrow}`;
        console.log(sql);
        connection.query(sql, function(err, result) {
        if (err) {
                res.send(err)
                return;
        }
        console.log(result);
        res.render('result',{data:result});
        //res.redirect('/success');
        });
});
app.post('/delete-user', function(req, res) {
    var netid = req.body.netid;

    var sql = `Delete from User where Net_id='${netid}'`;
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.send(err);
            return;
        }
        res.redirect('/delete-success');
    });
});

app.post('/search-review', function(req, res) {
    var keywor = req.body.keywor;

    var sql = `SELECT * FROM Reviews where Review like '%${keywor}%'`;
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.send(err);
            return;
        }
        console.log(result);
        res.render('findresult',{data:result})
        //res.redirect('/create-success');
    });
});

app.post('/update-students', function(req, res) {
    var num = req.body.num;


    var sql = `UPDATE Course_Offerings SET F = ${num} WHERE dupNum = 1 and Eid = "e100" and CourseId = "c1147" and Semester = "2012-fa"`;
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.send(err);
            return;
        }
    });

        var sql = `SELECT * FROM Course_Offerings WHERE dupNum = 1 and Eid = "e100" and CourseId = "c1147" and Semester = "2012-fa"`;
        console.log(sql);
        connection.query(sql, function(err, result2) {
            if (err) {
                res.send(err);
                return;
            }

            res.render('updateresult', {data1: result2});
        });
        //console.log(result2);

});

app.post('/adv1-query', function(req, res) {
    var perc = req.body.perc;

    var sql = `select Courses.Title, output.A, output.total, output.percentage*100 as percentage from (select CourseId, sum(A1+A2+A3) as A ,sum(A1+A2+A3+B1+B2+B3+C1+C2+C3+D1+D2+D3+F) as total, sum(A1+A2+A3)/sum(A1+A2+A3+B1+B2+B3+C1+C2+C3+D1+D2+D3+F) as percentage from Course_Offerings group by CourseId) as output  join Courses ON output.CourseId=Courses.CourseId where output.percentage*100>${perc}`;
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.send(err);
            return;
        }
        console.log(result);
        res.render('adv1result',{data:result})
        //res.redirect('/create-success');
    });
});

app.post('/adv2-query', function(req, res) {
    var min = req.body.min;

    var sql=`Select c.DeptId, c.Number,c.Title From Courses c join Course_Offerings co on(c.CourseId=co.CourseId) where c.DeptId = "CS" and co.F>=${min} UNION (Select c.DeptId, c.Number,c.Title From Courses c join Course_Offerings co on(c.CourseId=co.CourseId) where c.DeptId = "IE" and co.F>=${min});`
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.send(err);
            return;
        }
        console.log(result);
        res.render('adv2result',{data:result})
        //res.redirect('/create-success');
    });
});
*/
app.listen(80, function () {
    console.log('Node app is running on port 80');
});