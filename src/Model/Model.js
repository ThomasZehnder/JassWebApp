//Model of Jass
// define one single structure as data repository

import axios from 'axios'

export var Model = {
    //Datapoint Array
    players: [],
    table: {
        cards: [],
        playAction: "zug von xy"
    },
    rounds: [],
    games: [],

    status: {},
    settings: {},
}

export var Player = {
    tableName: "a",
    guid: create_UUID(),
    name: "",
    indexInModel: 0,
    tablePosition: -1,
    devMode: false,
}

//Update properties
export var Webservice = {
    updateintervall: 1000,
    updateOn: true,
    timer: null,
    consoleOn: false,
    online: false,
    pending: false,


    getPlay: {
        func: null,
        status: "wait on first call"
    },
    setPlay: {
        func: null,
        status: "wait on first call"
    }
}

//URL parameter access
let search = window.location.search;
let params = new URLSearchParams(search);
let devMode = params.get('devmode');
console.log("develop aus URL entnommen", devMode);
Player.devMode = devMode;

//get table name from URL
let table = params.get('table');
if (table !== null) {
    Player.tableName = table;
    console.log("Tisch aus URL entnommen. Name: ", table);
};

console.log("host: ", window.location.host);
console.log("usezhsservices: ", params.get('usezhsservices'));
var zhsAdress = "//jass.zhs.ch/";

var getPlayUrl = '';
var setPlayUrl = '';

if ((window.location.host === zhsAdress) || (params.get('usezhsservices'))) {
    console.log("Use ZHS Jass Dev Services on Port 80");
    getPlayUrl = zhsAdress + './dev/services/getplay.php'
    setPlayUrl = zhsAdress + './dev/services/setplay.php'
} else if (window.location.host === 'localhost') {
    console.log("Start Node Webserver on Port 3001");
    getPlayUrl = '//localhost:3001/services/getnodeplay';
    setPlayUrl = '//localhost:3001/services/setnodeplay';
} else {
    console.log("Start Node Webserver zhs.ch/node-test-js");
    getPlayUrl = '//zhs.ch/node-js-test/services/getnodeplay';
    setPlayUrl = '//zhs.ch/node-js-test/services/setnodeplay';
}

//https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
    });
    return uuid;
}


/////////////////////////////////////////////////////////////
//Expand Array with add and remove function
/////////////////////////////////////////////////////////////
// eslint-disable-next-line
Array.prototype.append = function (element) {
    this.push(element);
    //console.log("Array.append() ", this.length);
    return this
}
// eslint-disable-next-line
Array.prototype.remove = function (element) {
    this.splice(this.indexOf(element), 1);
    //console.log("Array.remove() ", this.length);
    return this
}


/////////////////////////////////////////////////////////////
//Controller
/////////////////////////////////////////////////////////////
let _oldIntervall = Webservice.updateintervall;
function cyclicCaller() {
    //console.log("Cyclic Call");
    if (Webservice.updateOn) {
        if (!Webservice.pending) {
            //<1, weil footer eh anfrägt
            //console.log("subscripter length:", Webservice.getPlay.subscription.length)
            if (Webservice.getPlay.subscription.length > 1) {
                getModel();
                //console.log("Cyclic Call getModel()",Model);
            }
        }
    }

    if (_oldIntervall !== Webservice.updateintervall) {
        //restart timer with new time
        clearTimeout(Webservice.timer);
        Webservice.timer = setInterval(cyclicCaller, Webservice.updateintervall);
        _oldIntervall = Webservice.updateintervall;
    }
}
//start timer fo ever
Webservice.timer = setInterval(cyclicCaller, Webservice.updateintervall);

//-----------------------------------------------------
//concat to modell
export function copyToModel(data) {
    if (Webservice.consoleOn) { console.log("Model before: ", Model); }

    if (typeof data.players == "object") { Model.players = data.players; };
    if (typeof data.rounds == "object") { Model.rounds = data.rounds; };
    if (typeof data.games == "object") { Model.games = data.games; };
    if (typeof data.table == "object") { Model.table = data.table; };
    if (typeof data.status == "object") { Model.status = data.status; };
    if (typeof data.settings == "object") { Model.settings = data.settings; };

    if (Webservice.consoleOn) { console.log("Model after: ", Model); }
}

//-----------------------------------------------
function initWebRequest(service, getName) {
    service.counter = 0;
    service.url = getName;

    service.func = null;
    service.status = "wait on timer start";

    service.subscription = [];
}

function getWebRequest(service, tablename) {
    if (Webservice.pending === true) {
        console.log("getWebRequest Webservice delayed!!!")
        return
    }
    Webservice.pending = true;
    axios
        .get(service.url + "?tablename=" + tablename, { timeout: 10000 })

        .then(response => {
            if (Webservice.consoleOn) { console.log("Request from Server:", response); }
            //concat to modell
            copyToModel(response.data)

            service.counter = service.counter + 1;
            service.status = "Get OK: " + service.counter;
            Webservice.online = true;
            Webservice.pending = false;

            Webservice.getEndTimeStamp = new Date();
            Webservice.getTimeDelay = Webservice.getEndTimeStamp - Webservice.getStartTimeStamp;

            //loop over model subcriber
            service.subscription.forEach(element => {
                element.updatePage();
            });
        })
        .catch(error => {
            console.log(error)
            service.status = error.toString() + "[" + service.url + "]";
            Webservice.online = false;
            Webservice.pending = false;
        })
}
//----------------------------------------------------------------------------------------------------------
Webservice.getPlay = {};

initWebRequest(Webservice.getPlay, getPlayUrl);

function getModel() {
    getWebRequest(Webservice.getPlay, Player.tableName);
    Webservice.getStartTimeStamp = new Date();
}

Webservice.getPlay.func = getModel;
//----------------------------------------------------------------------------------------------------------

var setPlayCounter = 0;

function setPlay(model) {
    if (Webservice.pending === true) {
        console.log("setPlay Webservice delayed!!!")
    }
    Webservice.pending = true;
    axios
        .post(setPlayUrl, {
            tablename: Player.tableName,
            model: JSON.stringify(model)
        }, { origin: "*" })

        .then(response => {
            if (Webservice.consoleOn) { console.log("setPlay() from Server:", response); }

            setPlayCounter = setPlayCounter + 1;
            Webservice.setPlay.status = "Get OK: " + setPlayCounter;
            Webservice.online = true;
            Webservice.pending = false;

        })
        .catch(error => {
            console.log("POST error: ", error)
            Webservice.setPlay.status = error.toString() + "[" + setPlayUrl + "]";
            Webservice.online = false;
            Webservice.pending = false;
        })

}

//make function public
Webservice.setPlay.func = setPlay;

//----------------------------------------------------------------------------------------------------------
export var ModelUtils = {
    sendStoredModel: null,
    undoStoredModel: null,
};
//store before send model
ModelUtils.sendModel = (model) => {
    console.log("Save Model to avoid overwrite with incomming model")

    //Add last Speed Comunication to Modell
    Model.players[Player.indexInModel].getTimeDelay = Webservice.getTimeDelay;


    ModelUtils.sendStoredModel = JSON.parse(JSON.stringify(model)); //Deep copy 
    Webservice.setPlay.func(ModelUtils.sendStoredModel);
}

//----------------------------------------------------------------------------------------------------------
//store undo model
ModelUtils.saveUndoModel = (model, text) => {
    console.log("Save undo Model to allowe UNDO function", ModelUtils.undoStoredModel)
    ModelUtils.undoStoredModel = JSON.parse(JSON.stringify(model)); //Deep copy 
    ModelUtils.undoText = text;
}

ModelUtils.undoModel = (model) => {
    console.log("restoreModel Model  function", ModelUtils.undoStoredModel)
    if (ModelUtils.undoStoredModel !== null) {
        model = JSON.parse(JSON.stringify(ModelUtils.undoStoredModel)); //Deep copy 
        ModelUtils.sendModel(model);
        ModelUtils.undoStoredModel = null
    }
}
