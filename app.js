// Server to deliver web-app and provide webservice

//use: node server --port 3001

//History: startversion
//        


const path = require('path');
const fs = require('fs');

var express = require('express');
var bodyParser = require("body-parser");
var app = express();

var table_a = require('./server/table_a');
var table_empty = require('./server/table_empty');

const tables = [
    { name: "Diaz", text: "Mexico and USA", icon: "diaz", players: ["Elisabeth", "Maggy", "Valery", "Miguel"] },
    { name: "Harbich", text: "mit Elisabeth in Mexico", icon: "harbich", players: ["Elisabeth", "Erika", "Thomas", "Matha"] },
    { name: "Stefan", text: "mit Stefan in Deutschland", icon: "stefan", players: ["Elisabeth", "Stefan", "Erika", "Thomas"] },
    { name: "Gallo", text: "USA und Schweiz", icon: "gallo", players: ["Babs", "Hampi", "Jasmine", "Dennis"] },
    { name: "Steinemann", text: "Rossrüti", icon: "steinemann", players: ["Brigitte", "Urs", "Erika", "Thomas"] },
    { name: "Steiger", text: "Neualtwil", icon: "steiger", players: ["Agi", "Bruno", "Erika", "Thomas"] }
];

var Models = [];

Models['a'] = table_a;

// Mount tablestore folder
const tableStorePath = path.join(__dirname, '/server/tablestore');

if (typeof (process.env.PASSENGER_BASE_URI) === 'undefined') {
    process.env.PASSENGER_BASE_URI = '';
}
console.log("process.env.PASSENGER_BASE_URI: ", process.env.PASSENGER_BASE_URI);

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//
app.all(process.env.PASSENGER_BASE_URI + '/services/*', function (req, res, next) {
    console.log("services CORS + JSON", req.baseUrl);
    console.log(req.originalUrl) // /greet
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-*, Origin, Content-Type, Accept'); // If needed

    res.setHeader('Content-type', 'application/json');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        console.log("OPTIONS Request");
        res.send(200);
    }
    else {
        //move on
        next();
    }
});

// Mount build folder
const buildPath = path.join(__dirname, '/build');
app.use(process.env.PASSENGER_BASE_URI, express.static(buildPath));


// on the request to root (http://localhost:3001/test.txt)
// on ZHS: https://zhs.ch/node-js-test/test.txt

app.get(process.env.PASSENGER_BASE_URI + '/test.txt', function (req, res) {
    res.setHeader('Content-type', 'text/plain');
    res.status(200).send('jass development test server');
});

// on the request to root (http://localhost:3001/services/getdir)
// on ZHS: https://zhs.ch/node-js-test/services/getdir
app.get(process.env.PASSENGER_BASE_URI + '/services/getdir', function (req, res) {
    res.setHeader('Content-type', 'application/json');

    var dir = { error: "" };

    try {
        const files = fs.readdirSync(tableStorePath);
        dir.files = files;

        for (const file of files)
            console.log(file);
    } catch (err) {
        dir.error = err;
        console.error(err);
    }

    dir.version = "last change 20210321";
    console.log(JSON.stringify(dir));

    res.status(200).send(JSON.stringify(dir));
});

// On http://localhost:3001/services/gettablelist
// On ZHS: https://zhs.ch/node-js-test/services/getnodeplay?tablename=stefan
app.get(process.env.PASSENGER_BASE_URI + '/services/gettablelist', function (req, res) {

    //Append registred names of tables
    var tablesWithNames = [];
    tables.forEach((table, index) => {

        tablesWithNames[index] = JSON.parse(JSON.stringify(table)); //make a copy trick, otherwise it works with pointers

        //read table from file, if exist and initialisize memory
        try {
            const tableStoreFilePath = path.join(tableStorePath, table.icon + '.json');
            if (fs.existsSync(tableStoreFilePath)) {
                Models[table.icon] = fs.readFileSync(tableStoreFilePath);
                console.log("read from: ", tableStoreFilePath);
                tablesWithNames[index].text += "#";
            }

        } catch (err) {
            console.log(err);

            console.log("create default table in memory created");
        }

        //get names if the exists in files/memory
        if (typeof Models[table.icon] != 'undefined') {
            var model = JSON.parse(Models[table.icon]);  //model is stored and transmitted as STRING
            //console.log(model);
            tablesWithNames[index].text += " [ Spieler: ";
            model.players.forEach((player, playerNumber) => {
                if (playerNumber > 0) {
                    tablesWithNames[index].text += ", ";
                }
                tablesWithNames[index].text += player.name;
            });
            tablesWithNames[index].text += " ]"
        } else {
            //console.log(tables[index].players);
            tablesWithNames[index].text += " [ Spieler: ";
            tables[index].players.forEach((playerName, playerNumber) => {
                if (playerNumber > 0) {
                    tablesWithNames[index].text += ", ";
                }
                tablesWithNames[index].text += playerName;
            });
            tablesWithNames[index].text += " ]"
        };
    });


    res.status(200).send(tablesWithNames);
});

// On localhost:3001/services/getnodeplay
app.get(process.env.PASSENGER_BASE_URI + '/services/getnodeplay', function (req, res) {

    var tablename = 'a'; //default name if nothing defined

    //console.log("req: ",  req);
    //console.log("query: ", typeof req.query.tablename, req.query);
    if (req.query.tablename) {
        tablename = req.query.tablename;
    }



    //check if tablename exists in memory//, otherwise create from default and replace names
    if (typeof Models[tablename] === 'undefined') {

        //read table from file
        try {
            const tableStoreFilePath = path.join(tableStorePath, tablename + '.json');
            Models[tablename] = fs.readFileSync(tableStoreFilePath);
            console.log("read from: ", tableStoreFilePath);

        } catch (err) {
            console.log(err);

            console.log("create default table in memory");
            Models[tablename] = table_empty; //create default table

            //replace names of players, if they exists in the template
            tables.forEach((table) => {
                if (table.icon === tablename) {
                    var model = JSON.parse(Models[tablename]);  //model is stored and transmitted as STRING
                    table.players.forEach((playerName, playerNumber) => {
                        console.log(model.players[playerNumber].name, " <== ", playerName);
                        model.players[playerNumber].name = playerName;
                    });
                    Models[tablename] = JSON.stringify(model); //store back as string 
                };

            });
        }
    }

    res.status(200).send(Models[tablename]);
});

// On localhost:3001/services/setnodeplay
app.post(process.env.PASSENGER_BASE_URI + '/services/setnodeplay', function (req, res) {

    var tablename = 'a';

    console.log("req.body: ", req.body);

    var body = req.body;
    var tablename = body.tablename;

    //store in memory
    Models[tablename] = body.model;
    console.log("written model: ", tablename);

    //store to file
    try {
        const tableStoreFilePath = path.join(tableStorePath, tablename + '.json');
        fs.writeFileSync(tableStoreFilePath, body.model);
        console.log("stored to: ", tableStoreFilePath);
    } catch (err) {
        console.log(err);
    }

    res.status(200).send(Models[tablename]);
});

// Change the 404 message modifying the middleware
app.use(function (req, res, next) {
    res.status(404).send(`${buildPath} -->  not implemented URL :-( ${req.originalUrl} )`);
});



// start the server in the port 3001 !
port = null;
process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`)
})
const args = require('minimist')(process.argv.slice(2));
port = args['port'];
console.log(args);
console.log(port);

s = app.listen(port, function () {
    console.log('local developer jass server on port %d', s.address().port);
});
