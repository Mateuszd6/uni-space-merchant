"use strict";
exports.__esModule = true;
var sqlite3 = require("sqlite3");
var fs = require("fs");
var express = require('express');
var cors = require('cors');
var restapi = express();
var bodyParser = require('body-parser');
restapi.use(cors());
restapi.use(bodyParser.json());
restapi.use(bodyParser.urlencoded({ extended: false }));
restapi.use(express.static(__dirname));
var initial_data = require('./initial_data.json');
var initial_data_str = JSON.stringify(initial_data);
// This will generate random server name, so that multiple servers can use the
// same DB.
var servname = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
var dbname = 'spcmerch.db';
// The default values can be overriten by args.
var args = process.argv.slice(2);
if (args.length > 0)
    servname = args[0];
if (args.length > 1)
    dbname = args[1];
var dbpath = "./" + "databases/" + dbname;
console.log('Server name: ' + servname);
console.log('Database name: ' + dbname);
console.log('Database full path: ' + dbpath);
sqlite3.verbose();
var db = null;
function checkIfValidData(file) {
    function check_planets(planets, items) {
        for (var planet in planets) {
            var p = planets[planet];
            if (isNaN(p.x))
                return false;
            if (isNaN(p.y))
                return false;
            if (p.y < 0 || p.y > 99)
                return false;
            if (p.x < 0 || p.x > 99)
                return false;
            if (!check_items(items, p))
                return false;
        }
        return true;
    }
    function check_ships(ships, planets) {
        for (var ship in ships) {
            var p = ships[ship];
            if (isNaN(p.cargo_hold_size))
                return false;
            if (!Object.keys(planets).includes(p.position))
                return false;
        }
        return true;
    }
    function check_items(items, p) {
        var cargo = p.available_items;
        for (var i in cargo) {
            if (!items.includes(i))
                return false;
            if (isNaN(cargo[i].available))
                return false;
            if (cargo[i].available < 0)
                return false;
            if (isNaN(cargo[i].buy_price))
                return false;
            if (isNaN(cargo[i].sell_price))
                return false;
        }
        return true;
    }
    var data;
    try {
        data = JSON.parse(file);
    }
    catch (e) {
        return false;
    }
    for (var i in data) {
        if (i != "items" && i != "planets" && i != "starships" &&
            i != "game_duration" && i != "initial_credits")
            return false;
    }
    if (isNaN(data.initial_credits))
        return false;
    if (isNaN(data.game_duration))
        return false;
    if (data.game_duration <= 0)
        return false;
    if (!check_planets(data.planets, data.items))
        return false;
    if (!check_ships(data.starships, data.planets))
        return false;
    return true;
}
function createDBIfNotExists() {
    // Create db only if such db does not exists.
    if (!fs.existsSync(dbpath)) {
        db = new sqlite3.Database(dbpath);
        db.serialize(function () {
            // Create all requieed tables, and insert some default data.
            db.run('CREATE TABLE usr (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), passwd VARCHAR(255));');
            db.run('CREATE TABLE highscore (id INTEGER PRIMARY KEY AUTOINCREMENT, mapid INTEGER, name VARCHAR(255), score INTEGER);');
            db.run('CREATE TABLE maps (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), desc VARCHAR(255), ' +
                'servname VARCHAR(255), obj VARCHAR);');
            var stmt = db.prepare('INSERT INTO maps (name, desc, servname, obj) values (?, ?, ?, ?);');
            stmt.run('default', 'original version of the Space Merchant', servname, initial_data_str);
            stmt = db.prepare('INSERT INTO usr (name, passwd) values (?, ?);');
            stmt.run('root', 'root');
            stmt.run('admin', 'admin');
            stmt.run('user', '1234');
            stmt.run('user1', '1234');
            stmt.run('user2', '1234');
            stmt.run('user3', '1234');
            stmt = db.prepare('INSERT INTO highscore (mapid, name, score) values (?, ?, ?);');
            stmt.run(1, 'Bill Gaates', '2413');
            stmt.run(1, 'Steve Jobs', '2108');
            stmt.run(1, 'Satya Nadella', '2072');
            stmt.run(1, 'Biarne Strouostroup', '1998');
            stmt.run(1, 'Steve Ballmer', '1963');
        });
        console.log("Database " + dbpath + " created with defult scenario");
    }
    else {
        db = new sqlite3.Database(dbpath);
        console.log("Database " + dbpath + " already exists");
    }
}
// Start work:
createDBIfNotExists();
restapi.get('/', function (req, res) {
    ;
});
restapi.get('/data', function (req, res) {
    console.log("GET /data");
    sqlite3.verbose();
    var names = [];
    db.all("SELECT name FROM usr;", [], function (err, rows) {
        rows.forEach(function (row) {
            names.push(row.name);
        });
        res.json(names);
    });
});
restapi.get('/getMaps', function (req, res) {
    console.log("GET /getMaps -> Returning all available maps for the server.");
    sqlite3.verbose();
    var maps = [];
    db.all("SELECT name, desc, obj FROM maps where servname like '" + servname + "';", [], function (err, rows) {
        rows.forEach(function (row) {
            console.log("obj: ", typeof (row.obj), row.obj);
            var obJS = JSON.parse(row.obj);
            var planetsNum = Object.keys(obJS["planets"]).length;
            var starshipsNum = Object.keys(obJS["starships"]).length;
            var itemsNum = obJS["items"].length;
            maps.push({ "name": row.name,
                "desc": row.desc,
                "additional": "Plantes: " + planetsNum + ". " +
                    "Ships: " + starshipsNum + ". " +
                    "Items: " + itemsNum
            });
        });
        res.json(maps);
    });
});
restapi.get('/login/:usrName/:usrPass', function (req, res) {
    console.log("GET /login/" + req.params.usrName + "/" + req.params.usrPass + " -> Log in for " + req.params.usrName + ".");
    var maps = [];
    try {
        db.get("SELECT id FROM usr WHERE name = ? AND passwd = ?;", [req.params.usrName, req.params.usrPass], function (err, row) {
            if (row == null) {
                return res.json(false);
            }
            else {
                return res.json(true);
            }
        });
    }
    catch (_a) {
        return res.json(false);
    }
});
restapi.get('/getHighscores/:mapName', function (req, res) {
    console.log("GET /getHighscores/" + req.params.mapName + " " +
        ("-> Returning highscores for map: " + req.params.mapName));
    sqlite3.verbose();
    var maps = [];
    db.all("SELECT highscore.name as name, score FROM highscore " +
        "join maps on maps.id = highscore.mapid " +
        ("where maps.name = '" + req.params.mapName + "' ") +
        ("and maps.servname = '" + servname + "' ORDER BY score DESC;"), [], function (err, rows) {
        rows.forEach(function (row) {
            maps.push({ "name": row.name, "score": row.score });
        });
        res.json(maps);
    });
});
restapi.get('/gameScenerio/:gameName', function (req, res) {
    console.log("GET /gameScenerio/" + req.params.gameName + " -> " +
        ("getting the scenario for game: " + req.params.gameName));
    db.get("SELECT obj FROM maps WHERE name = ?;", [req.params.gameName], function (err, row) {
        if (err)
            console.log(err);
        else
            res.json(row.obj);
    });
});
// insert into highscore (mapid, name, score) values ((select id from maps where name = 'default'), "qwe", 1234);
restapi.get('/uploadHighscore/:mapName/:usrName/:score', function (req, res) {
    console.log("GET /gameScenerio/" + req.params.mapName + "/" + req.params.usrName + "/" +
        (req.params.score + " -> getting the scenario for game: ") +
        (req.params.usrName + "/" + req.params.score));
    var uname = req.params.usrName;
    var score = parseInt(req.params.score, 10);
    var map = req.params.mapName;
    console.log(map, uname, score, servname);
    var stmt = db.prepare('insert into highscore (mapid, name, score) values ((select id from maps where name = ? and servname = ?), ?, ?);');
    stmt.run(map, servname, uname, score);
    res.json({});
});
restapi.post('/uploadScenario', function (req, res) {
    try {
        req.body = Object.keys(req.body)[0];
    }
    catch (_a) { }
    ;
    var reqObj = JSON.parse(JSON.parse(JSON.stringify(req.body)));
    console.log(reqObj);
    console.log("POST /uploadScenario/ -> uploading scenario", console.log(typeof reqObj));
    if (!checkIfValidData(reqObj['fileData'])) {
        console.error("Posted json is invalid!");
        return res.json(false);
    }
    try {
        console.log("JSON IS OK");
        var stmt = db.prepare('INSERT INTO maps (name, desc, servname, obj) values (?, ?, ?, ?);');
        stmt.run(reqObj['name'], reqObj['description'], servname, reqObj['fileData']);
        return res.json(true);
    }
    catch (_b) {
        return res.json(false);
    }
});
restapi.listen(8080);
