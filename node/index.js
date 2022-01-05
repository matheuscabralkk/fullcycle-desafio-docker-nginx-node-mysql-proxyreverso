const express = require('express')
const mysql = require("mysql");

const app = express()
const port = 3000

var con = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "create table IF NOT EXISTS people (id int not null auto_increment, name varchar(255), primary key (id));";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});


app.get('/', (req, res) => {

    const insertSql = `INSERT INTO people(name) values('Matheus')`
    con.query(insertSql, function (err, result) {
        if (err) throw err;
        console.log("Person inserted into people table");
    });

    const getSql = `select name from people`

    con.query(getSql, function (err, result) {
        if (err) throw err;

        res.send(`
            <h1>Hello full cycle</h1>
                <ol>
                  ${
                    !!result.length
                        ? result.map((data) => `<li>${data.name}</li>`) : ""
                    }
                </ol>
    </ol>

        `)
    });
});

app.listen(port, () => {
    console.log('listening on port ' + port);
})

