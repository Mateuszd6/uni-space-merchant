import {createServer} from 'http';
import * as sqlite3 from 'sqlite3';
import * as fs from 'fs';

var express = require('express');
var cors = require('cors');
var restapi = express();
var bodyParser = require('body-parser');

restapi.use(cors());
restapi.use(bodyParser.json());
restapi.use(bodyParser.urlencoded({ extended: false }));

let initial_data = require('./initial_data.json');
let initial_data_str = JSON.stringify(initial_data);

// This will generate random server name, so that multiple servers can use the
// same DB.
let servname = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
let dbname = 'spcmerch.db';

// The default values can be overriten by args.
var args = process.argv.slice(2);
if (args.length > 0)
    servname = args[0];
if (args.length > 1)
    dbname = args[1];

let dbpath = "./" + "databases/" + dbname;
console.log('Server name: ' + servname);
console.log('Database name: ' + dbname);
console.log('Database full path: ' + dbpath);

sqlite3.verbose();

let db = null;

function createDBIfNotExists() {
    // Create db only if such db does not exists.
    if (!fs.existsSync(dbpath)) {
        db = new sqlite3.Database(dbpath);
        db.serialize(() => {
            // Create all requieed tables, and insert some default data.
            db.run('CREATE TABLE usr (name VARCHAR(255), passwd VARCHAR(255));');
            db.run('CREATE TABLE maps (name VARCHAR(255), desc VARCHAR(255), ' +
                                       'servname VARCHAR(255), obj VARCHAR);');
            let stmt = db.prepare('INSERT INTO maps (name, desc, servname, obj) values (?, ?, ?, ?);');
            stmt.run('default', 'original version of the Space Merchant', servname, initial_data_str);

            stmt = db.prepare('INSERT INTO usr (name, passwd) values (?, ?);');
            stmt.run('root', 'root')
            stmt.run('admin', 'admin');
            stmt.run('user1', '1234');
            stmt.run('user2', '1234');
            stmt.run('user3', '1234');
        });

        console.log("Database " + dbpath + " created with defult scenario");
    }
    else
    {
        db = new sqlite3.Database(dbpath);
        console.log("Database " + dbpath + " already exists");
    }
}

// Start work:
createDBIfNotExists();

restapi.get('/data', cors(), function(req, res) {
    console.log("GET /data");
    sqlite3.verbose();
    let names = [];
    db.all("SELECT name FROM usr;", [], (err, rows) => {
        rows.forEach((row) => {
            names.push(row.name);
        });
        res.json(names);
    });
});

restapi.get('/getMaps', cors(), function(req, res) {
    console.log("GET /getMaps -> Returning all available maps for the server.");
    sqlite3.verbose();
    let maps = [];
    db.all(`SELECT name, desc FROM maps where servname like '${servname}';`, [], (err, rows) => {
        rows.forEach((row) => {
            maps.push({"name": row.name, "desc": row.desc});
        });
        res.json(maps);
    });
});

restapi.get('/gameScenerio/:gameName', cors(), function (req, res) {
    console.log(`GET /gameScenerio/${req.params.gameName} -> ` +
                `getting the scenario for game: ${req.params.gameName}`);
    db.get("SELECT obj FROM maps WHERE name = ?;", [req.params.gameName], (err, row) => {
        if (err)
            console.log(err);
        else
            res.json(row.obj);
    });
});

restapi.post('/uploadScenario', cors(), function (req, res) {
    try {req.body = Object.keys(req.body)[0];}
    catch{};
    let reqObj = JSON.parse(JSON.parse(JSON.stringify(req.body)));
    console.log("POST /uploadScenario/ -> uploading scenario", console.log(typeof reqObj));

    console.log(reqObj['name'], reqObj['description'], servname, reqObj['fileData']);
    let stmt = db.prepare('INSERT INTO maps (name, desc, servname, obj) values (?, ?, ?, ?);');
    stmt.run(reqObj['name'], reqObj['description'], servname, reqObj['fileData']);

    res.json("Hello, there");
});

restapi.listen(8080);
