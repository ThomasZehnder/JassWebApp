// Server to deliver web-app and provide webservice

//use: node server --port 3001


const path = require('path');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

var table_a = require('./server/table_a');
var table_empty = require('./server/table_empty');

const tables = [
    { name: "Diaz", text: "Mexico and USA", icon: "diaz" },
    { name: "Harbich", text: "mit Elisabeth in Mexico", icon: "harbich" },
    { name: "Stefan", text: "mit Stefan in Deutschland", icon: "stefan" },
    { name: "Steinemann", text: "mit Brigitte und Urs", icon: "steinemann" },
    { name: "Steiger", text: "mit Agi und Bruno", icon: "steiger" }
  ];

var Models = [];

Models['a'] = table_a;

if (typeof(process.env.PASSENGER_BASE_URI)==='undefined'){
    process.env.PASSENGER_BASE_URI = '';
}
console.log("process.env.PASSENGER_BASE_URI: ", process.env.PASSENGER_BASE_URI);

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//
app.all(process.env.PASSENGER_BASE_URI+'/services/*', function (req, res, next) {
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


// on the request to root (localhost:3001/)
app.get(process.env.PASSENGER_BASE_URI+'/test.txt', function (req, res) {
    res.setHeader('Content-type', 'text/plain');
    res.status(200).send('jass development test server');
});


// On localhost:3001/services/gettablelist
app.get(process.env.PASSENGER_BASE_URI+'/services/gettablelist', function (req, res) {
    
    //Append registred names of tables
    var tablesWithNames = [];
    tables.forEach ((table, index) => {

        tablesWithNames[index] = JSON.parse(JSON.stringify(table));;

        if (typeof Models[table.name] != 'undefined') {
            var model = JSON.parse(Models[table.name]);
            //console.log(model);
            tablesWithNames[index].text += " [ Spieler: ";
            model.players.forEach((player, playerNumber) => {
                if (playerNumber>0) {
                    tablesWithNames[index].text += ", ";
                }
                tablesWithNames[index].text += player.name;
            });
            tablesWithNames[index].text += " ]"
        };
    });
    
    
    res.status(200).send(tablesWithNames);
});

// On localhost:3001/services/getnodeplay
app.get(process.env.PASSENGER_BASE_URI+'/services/getnodeplay', function (req, res) {

    var tablename = 'a';

    //console.log("req: ",  req);
    //console.log("query: ", typeof req.query.tablename, req.query);
    if (req.query.tablename) {
        tablename = req.query.tablename;
    }

    if (typeof Models[tablename] === 'undefined') {
        Models[tablename] = table_empty;
    }

    res.status(200).send(Models[tablename]);
});

// On localhost:3001/services/setnodeplay
app.post(process.env.PASSENGER_BASE_URI+'/services/setnodeplay', function (req, res) {

    var tablename = 'a';

    console.log("req.body: ", req.body);

    var body = req.body;
    var tablename = body.tablename;
    Models[tablename] = body.model;
    console.log("written model: ", tablename);

    res.status(200).send(Models[tablename]);
});

// Change the 404 message modifying the middleware
app.use(function (req, res, next) {
    res.status(404).send( `${buildPath} -->  not implemented URL :-( ${req.originalUrl} )`);
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
