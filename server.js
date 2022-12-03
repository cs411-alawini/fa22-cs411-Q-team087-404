var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var connection = mysql.createConnection({
                multipleStatements: true,
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
app.get('/user', function(req, res) {
    res.render('user', { title: 'User Details' });
  });
app.get('/review', function(req, res) {
    res.render('reviewdept', { title: 'Review section' });
    
});
app.get('/login-user', function(req, res) {
    res.render('loginuser', { title: 'Login details' });
});
app.get('/create-user', function(req, res) {
    res.render('createuser', { title: 'User creation' });
});
app.get('/read-review', function(req, res) {
    res.render('readreview', { title: 'Create review' });
});
app.get('/error', function(req, res) {
    res.send({'message': 'Error!'});
});
app.get('/create-success', function(req, res) {
    res.send({'message': 'User created successfully!'});
});
app.get('/success', function(req, res) {
    res.send({'message': 'Success!'});
});
app.get('/user-not-exist', function(req, res) {
    res.send({'message': 'User does not exist!'});
});
app.get('/delete-success', function(req, res) {
    res.send({'message': 'User deleted successfully!'});
});
app.get('/delete-success', function(req, res) {
    res.send({'message': 'User deleted successfully!'});
});
app.get('/insert-review', function(req, res) {
    res.send({'message': 'Review inserted successfully!'});
});
/*


app.get("/delete", (req, res) => {
    res.render("delete", {title: 'Delete User from the database'});
});

app.get("/search", (req, res) => {
    res.render("search", {title: 'Search for review by keyword'});
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
        //redirect to create review page!
        res.redirect('/create-success');
        });
});
app.post('/review-dept', function(req, res) {
    var dept = req.body.dept;
    var cid = req.body.cid;
    
    cosql1 = `select * from Courses where DeptId LIKE '${dept}'`
    console.log(cosql1);
    connection.query(cosql1, function(err, result3) {
        if (err) {
            res.send(err);
            return;
        }
        console.log(result3);
        
       // res.render('reviewcourse', { title: 'Create review' ,  data: result3, deptid : dept });
    });
});



app.post('/login-user', function(req, res) {
    const submit = req.body.submit;
    var netid = req.body.netid;
    var pass = req.body.password;
    console.log(netid);
    console.log(pass);
    console.log(submit);
    var sq1 = `SELECT * FROM User WHERE Net_id LIKE '${netid}' and Password LIKE '${pass}'`; 
    console.log(sq1);
    connection.query(sq1, function(err, result) {
        if (err) {
            res.send(err)
            return;
        }
        if (result.length == 0) {
            res.redirect('/user-not-exist');  
        } 
        else {
            if (submit == "delete") {
                var sql = `Delete from User where Net_id='${netid}'`;
                console.log(sql);
                connection.query(sql, function(err, result) {
                    if (err) {
                        res.send(err);
                        return;
                    }
                res.redirect('/delete-success');
                });
            } else if (submit == "login") {

                //get dept id using netid and password
                var deptIDsql = `select DeptId from User where Net_id LIKE '${netid}' and Password LIKE '${pass}'`;
                var dept,cosql ;
                console.log(deptIDsql);
                connection.query(deptIDsql, function(err, result1) {
                    if (err) {
                        res.send(err);
                        return;
                    }
                    console.log(result1[0].DeptId);
                    dept = result1[0].DeptId;
                    console.log(dept);
                    console.log("----")
                    cosql = `select * from Courses where DeptId LIKE '${dept}'`
                    console.log(cosql);
                    connection.query(cosql, function(err, result2) {
                        if (err) {
                            res.send(err);
                            return;
                        }
                        console.log(result2);
                        console.log(result2[0].CourseId);
                        res.render('postreview', { title: 'Create review' ,  data: result2, deptid : dept });
                    });
                });
                
                
            }
        }
    });
});


app.post('/choice', function(req, res) {
    const submit = req.body.submit;
    console.log(submit);
    if (submit == "write review") {
        res.redirect('/user');
    } else if (submit == "read review") {
        res.redirect('/review');
    }
    else {
        res.redirect('/error');
    }
    
});
app.post('/post-review', function(req, res) {
    var netid = req.body.netid;
    const dept = req.body.submit;
    var sem = req.body.semester;
    var year = req.body.year;
    var cid = req.body.cid;
    var dr = req.body.dr;
    var pr = req.body.pr;
    var cr = req.body.cr;
    var wh = req.body.wh;
    var review = req.body.reviewtext;
    sql =  `Insert into Reviews values('${netid}','${cid}','${dept}','${sem}',${year},'${review}',${dr},${pr},${wh},${cr})`;
    console.log(sql);
    connection.query(sql, function(err, result3) {
        if (err) {
            res.send(err);
            return;
        }
        res.redirect('/insert-review');
    });

    
});

app.post('/user-action', function(req, res) {
    const submit = req.body.submit;
    console.log(submit);
    if (submit == "login") {
        res.redirect('/login-user');
    } else if (submit == "signup") {
        res.redirect('/create-user');
    }
    else {
        res.redirect('/error');
    }
    
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
