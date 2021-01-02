import { Model, Player, ModelUtils } from './Model'
import { Cards } from './Cards'


export var Jass = {

    //functions
    init: null,
    reset: null,
}

Jass.init = function () {
    console.log("Jass.init");

    if (typeof Model.players[0] !== "object") {
        Model.players[0] = getPlayer("Agi");
        Model.players[1] = getPlayer("Erika");
        Model.players[2] = getPlayer("Bruno");
        Model.players[3] = getPlayer("Thomas");
    }

    Jass.reset();

    Model.status.text = "INIT";
};

//Diese Funktion definiert die Struktur und initialisiert diese
Jass.reset = function () {
    console.log("Jass.reset");

    var i;

    for (i = 0; i < 4; i++) {
        Model.players[i].cards = getDummyCardsSet();
    }

    resetTable();
    resetGames();
    resetRounds();

    Model.status = {
        text: "RESET",
        playMode: "Nüt",
        schieberMode: "Asege",
        lastPlayer: {},
        lastMoveTimeStamp: Date.now()
    }

    Jass.setPlayVariant("Einfach");

    //Karten mischeln und verteilen
    getNewCardSet();
}

function getPlayer(name) {
    return {
        name: name,
        isPlaying: true,
        isPlayerReady: false,
        guid: 0,
        tablePosition: -1
    }
}

function getEmptyRound() {
    return {
        cards: [
            null, null, null, null
        ],
        teams: [
            { wiisPoint: 0, cardPoint: 0 },
            { wiisPoint: 0, cardPoint: 0 }
        ]
    }
}

function getDummyCard() {
    return 36;//Math.floor(Math.random() * Math.floor(36))
}

function getDummyCardsSet() {
    var cardSet = [];
    for (var i = 0; i < 9; i++) {
        cardSet[i] = {
            id: getDummyCard(),
            visible: true
        }
    }
    return cardSet;
}

//------------------------------------------

function resetTable() {
    for (var i = 0; i < 4; i++) {
        Model.table.cards[i] = {
            id: 36,
            fromPlayer: Jass.getPlayerNameAtTable(i),
        }
    }
    Model.table.playedCard = 0
    Model.table.playAction = ""

}


function resetRounds() {
    for (var i = 0; i < 9; i++) {
        Model.rounds[i] = getEmptyRound();
    }
    Model.status.actualRound = 0;
};

function resetGames() {
    Model.games = [];
};

Jass.setPlayVariant = function (playVariant) {
    console.log("Set Play Variant: ", playVariant)

    //Es fängt immer Rose Zäni ah...
    Model.settings.startCardId = 22;

    if (playVariant === "Gstuft") {
        Model.settings.playVariant = "Gstuft";
        Model.settings.playModeFactor = [];
        Model.settings.playModeFactor[0] = { name: "Obenabe", factor: 3 };
        Model.settings.playModeFactor[1] = { name: "Uneufe", factor: 3 };
        Model.settings.playModeFactor[2] = { name: "Schälle", factor: 2 };
        Model.settings.playModeFactor[3] = { name: "Schilte", factor: 2 };
        Model.settings.playModeFactor[4] = { name: "Rose", factor: 1 };
        Model.settings.playModeFactor[5] = { name: "Eichle", factor: 1 };

    } else {
        Model.settings.playVariant = "Einfach";
        Model.settings.playModeFactor = [];
        Model.settings.playModeFactor[0] = { name: "Obenabe", factor: 1 };
        Model.settings.playModeFactor[1] = { name: "Uneufe", factor: 1 };
        Model.settings.playModeFactor[2] = { name: "Schälle", factor: 1 };
        Model.settings.playModeFactor[3] = { name: "Schilte", factor: 1 };
        Model.settings.playModeFactor[4] = { name: "Rose", factor: 1 };
        Model.settings.playModeFactor[5] = { name: "Eichle", factor: 1 };
    }
    console.log("Set Play playModeFactor: ", Model.settings)
};
Jass.getPlayVariantText = function (playVariant) {
    if (playVariant === "Gstuft") {
        return "Eichle und Rose  einfach, Schälle und Schilte dopplet, Obenabe und Undenufe drüfach"
    } return "Alles Einfach"
}

Jass.getPlayVariantFactor = function (playMode) {
    var i;

    //Suche playMode
    for (i = 0; i < Model.settings.playModeFactor.length; i++) {
        if (Model.settings.playModeFactor[i].name === playMode) {
            return Model.settings.playModeFactor[i].factor;
        }
    }
    //console.error("playMode not found!!!", playMode)
    return 1
}

//----------------------------------------------------
// Karten Mischeln und verteilen
//----------------------------------------------------
function getNewCardSet() {
    var cards = [];
    var i;

    //Kartenset Zufallszahl hinzufügen
    for (i = 0; i < 36; i++) {
        var weight = Math.floor(Math.random() * 10000000) + i / 100; //Kommastellen sind die CardId
        cards[i] = weight
    }
    //console.log("gemischelte Karten", cards);

    //Karten nach Gewicht sortieren
    cards.sort();
    //console.log("sortierte Karten", cards);

    //Karten zuweisen
    cards.forEach((card, index) => {
        var cardId = Math.floor((card - Math.floor(card)) * 100 + 0.5); //Kommastellen zurückholen, wegen rundungsfehler noch 0.5 dazuzählen
        //console.log(card, index, cardId);

        var modelCard = Model.players[Math.floor(index / 9)].cards[index % 9];
        modelCard.id = cardId; //Kommastellen zurückholen
        modelCard.visible = true;
    })
    //Karten der Spieler sortieren
    for (i = 0; i < 4; i++) {
        Model.players[i].cards.sort((a, b) => {
            //console.log(a, b);
            return ((a.id > b.id) ? 1 : -1)
        })
    }
}

//----------------------------------------------------
// Spiel Actionen
//----------------------------------------------------
function _getNextPlayer(tablePosition) {
    var nextTablePosition = (tablePosition - 1 + 4) % 4; //gegenuhrzeiger -1 damit nicht negativ + 4
    for (var i = 0; i < 4; i++) {
        if (Model.players[i].tablePosition === nextTablePosition) {
            return i;
        }
    }
    return 0
}

Jass.playCard = function (e) {
    var cardindex = e.attributes.getNamedItem('data-cardindex').value;
    //console.log("playCard", e)
    //console.log("playCardIndex", cardindex, Player);

    ModelUtils.saveUndoModel(Model, "Charte zrugzüche, nöd wölle... ");

    var card = Model.players[Player.indexInModel].cards[cardindex];
    console.log("gespieltekarte", card)

    //Karte auf den Tisch legen
    Model.table.cards[Player.tablePosition].id = card.id;
    Model.table.cards[Player.tablePosition].fromPlayer = Player.name + "*" + Cards[card.id].cardName;
    Model.table.playedCard += 1

    //get Time delay in Devmode anhängen
    if (Player.devMode === "on") {
        Model.table.cards[Player.tablePosition].fromPlayer += " [" + Model.players[Player.indexInModel].getTimeDelay + "ms]"
    }


    //eigene Karte ausblenden
    card.visible = false;

    //selber verriegel, kein Click erlaubt
    Model.players[Player.indexInModel].isPlaying = false;

    //Status updaten
    Model.status.text = "CARDMOVE";
    Model.status.lastPlayer = Player;
    Model.status.lastMoveTimeStamp = Date.now();

    //nächster Spieler, falls nicht schon vier Karten gelegt wurden
    if (!Jass.nextRoundAllowed()) {
        var nextPlayer = _getNextPlayer(Player.tablePosition);
        Model.players[nextPlayer].isPlaying = true;
        Model.table.playAction = Model.players[nextPlayer].name + " am Zug"
    } else {
        Model.table.playAction = "Wer hät die Runde gewunne?"
    }

    ModelUtils.sendModel(Model);
}

function _setPlayerBlocked() {
    for (var i = 0; i < 4; i++) {
        Model.players[i].isPlaying = false;
    }
}

Jass.getTeamNames = function (index) {
    if (index === 0) {
        return Jass.getPlayerNameAtTable(0) + ", " + Jass.getPlayerNameAtTable(2);
    } else {
        return Jass.getPlayerNameAtTable(1) + ", " + Jass.getPlayerNameAtTable(3);
    }
}
//************************************************** */
Jass.playNewRound = function () {
    console.log("playNewRound neu 4 Charte spile")

    var actualRound = Model.status.actualRound;

    if (!Jass.nextRoundAllowed()) {
        //0.91 Patch, check if round before was set properly
        console.error("Leere Runde verhindern...")
        Model.status.patchErrorEmptyRound = "Leere Runde überschrieben :" + actualRound;
        return
    }

    ModelUtils.saveUndoModel(Model, "ups zfrüe neui Runde iglütet... ");

    //Karten in die Rundenübersicht übertragen
    let tempCards = JSON.parse(JSON.stringify(Model.table.cards)); //Deep copy array, otherwise the reset work also in the roundscopy!!!
    Model.rounds[actualRound].cards = tempCards;
    Model.rounds[actualRound].winnerName = Player.name;
    let winnerTeamId = Player.tablePosition % 2; // Team 0 der 1
    Model.rounds[actualRound].winnerTeamId = winnerTeamId;

    //Karten Wert berechne und in rounds eintragen
    let playMode = Model.status.playMode;
    Jass.getRoundsCardPoints(actualRound, winnerTeamId, playMode);

    if (Model.status.actualRound < 9) {
        Model.status.actualRound += 1;
    } else {
        console.error("Rundenzähler zu hoch, kommt nur beim Entwickeln vor...")
    }
    //Spietisch freigeben
    resetTable();

    //Spieler freigeben, welcher die Runde zurückgesetzt hat
    Model.players[Player.indexInModel].isPlaying = true;
    if (Player.name === "Laura") {
        Model.table.playAction = Player.name + " hät d'Runde gwunne und isch in nüme in New Zealand, Queenstown"
    } else {
        Model.table.playAction = Player.name + " hät d'Runde gwunne und isch am Zug"
    }

    //Status updaten
    Model.status.text = "NewRound";
    Model.status.lastPlayer = Player;
    Model.status.lastMoveTimeStamp = Date.now();

    ModelUtils.sendModel(Model);
}
//----------------------------------------
Jass.getRoundsCardPoints = function (round, team, playMode) {
    let sum = 0
    for (var i = 0; i < Model.rounds[round].cards.length; i++) {
        let cardId = Model.rounds[round].cards[i].id;
        sum += Cards[cardId].props[playMode].points;
    }
    //Letzte Runde gibt +5
    if (round === 8) {
        sum += 5;
    }

    //Summe nach Spielart gewichten
    sum *= Jass.getPlayVariantFactor(playMode);
    console.log("SpielMode Faktor noch implementieren")

    Model.rounds[round].teams[team].cardPoint = sum;
}

Jass.getRoundsPoints = function () {
    var sum0 = 0, sum1 = 0
    for (var i = 0; i < Model.rounds.length; i++) {
        sum0 += Model.rounds[i].teams[0].cardPoint;
        sum1 += Model.rounds[i].teams[1].cardPoint;
    }
    return [sum0, sum1]
}
Jass.getRoundsWiis = function () {
    var sum0 = 0, sum1 = 0
    for (var i = 0; i < Model.rounds.length; i++) {
        sum0 += Model.rounds[i].teams[0].wiisPoint;
        sum1 += Model.rounds[i].teams[1].wiisPoint;
    }
    return [sum0, sum1]
}

//mit Wiis
Jass.getRoundsSummery = function () {
    var sum = []
    var points = Jass.getRoundsPoints()
    var wiis = Jass.getRoundsWiis()
    sum = [points[0] + wiis[0], points[1] + wiis[1]];
    return { sum: sum, points: points, wiis: wiis }
}
//************************************************** */
Jass.playNewGame = function () {
    console.log("Neui Rundi neu Mischle")

    ModelUtils.saveUndoModel(Model, "ups nomol zrug, wa sind das für Charte gsi? ");

    //Spietisch freigeben
    resetTable();

    //RundenStand in das Spiel übertragen
    Model.games.append(Jass.getRoundsSummery());

    //Runden löschen
    resetRounds();

    //Karten mischeln und verteilen
    getNewCardSet();

    //Alle Spieler sperren
    _setPlayerBlocked();

    var playerToStart;
    playerToStart = _getNextPlayer(Model.status.playerToStart);
    console.log("OldPlayer and New one:", Model.status.playerToStart, playerToStart)
    Model.table.playAction = Model.players[playerToStart].name + " dörf afange und isch am Zug"


    //Spieler freigeben, welcher die Runde zurückgesetzt hat
    Model.players[playerToStart].isPlaying = true;

    // Speichern, wer beginnen konnte, am Tisch eines Weiterschalten
    Model.status.playerToStart = (Model.status.playerToStart - 1 + 4) % 4; //gegenuhrzeiger -1 damit nicht negativ + 4
    //Status updaten
    Model.status.text = "NewGame";
    Model.status.lastPlayer = Player;
    Model.status.lastMoveTimeStamp = Date.now();
    Model.status.playMode = "Nüt";
    Model.status.schieberMode = "Asege";

    ModelUtils.sendModel(Model);
}
//************************************************** */
Jass.playNewPlay = function () {
    console.log("Ganz neu afange und alles zrug stelle")

    //Spietisch freigeben
    resetTable();

    //RundenTabelle Lösche
    resetRounds();

    //Tabelle fürs Spiel lösche
    resetGames();

    //Karten mischeln und verteilen
    getNewCardSet();

    //Alle Spieler sperren
    _setPlayerBlocked();

    //Suche rose zäni (cardId = 22)
    var playerToStart = Jass.findPlayerWitchCard(Model.settings.startCardId)
    //Spieler freigeben, welcher die Runde zurückgesetzt hat
    Model.players[playerToStart].isPlaying = true;
    Model.table.playAction = Model.players[playerToStart].name + " hät s'Rose Zeni :-) und isch am Zug"

    // Speichern, wer beginnen konnte, am Tisch eines Weiterschalten
    Model.status.playerToStart = Model.players[playerToStart].tablePosition;

    //Status updaten
    Model.status.text = "NewPlay";
    Model.status.lastPlayer = Player;
    Model.status.lastMoveTimeStamp = Date.now();
    Model.status.playMode = "Nüt";
    Model.status.schieberMode = "Asege";

    ModelUtils.sendModel(Model);
}
//--------------------------------------------
Jass.getGamesPoints = function () {
    var sum0 = 0, sum1 = 0
    for (var i = 0; i < Model.games.length; i++) {
        sum0 += Model.games[i].points[0];
        sum1 += Model.games[i].points[1];
    }
    return [sum0, sum1]
}
Jass.getGamesWiis = function () {
    var sum0 = 0, sum1 = 0
    for (var i = 0; i < Model.games.length; i++) {
        sum0 += Model.games[i].wiis[0];
        sum1 += Model.games[i].wiis[1];
    }
    return [sum0, sum1]
}

//mit Wiis
Jass.getGamesSummery = function () {
    var sum = []
    var points = Jass.getGamesPoints()
    var wiis = Jass.getGamesWiis()
    sum = [points[0] + wiis[0], points[1] + wiis[1]];
    return { sum: sum, points: points, wiis: wiis }
}
//-------------------------------------------
//Spielertisch prüfen
//-------------------------------------------
Jass.getPlayerNameAtTable = function (position) {
    var name = ""
    Model.players.forEach((player) => {
        if (player.tablePosition === position) {
            name += player.name + " ";
        }
    });
    return name
}
Jass.validatePlayTable = function () {
    var isPlayTableOk = true;
    var playTableText = "OK";
    //Check play table
    if (Player.name === "") {
        isPlayTableOk = false;
        playTableText = "Bitte gib deinen Namen an..."
    }
    else if (Player.tablePosition < 0) {
        //console.log(Player)
        isPlayTableOk = false;
        playTableText = "Wähle deinen Sitzplatz aus"
    }
    else if (Model.players[Player.indexInModel].guid !== Player.guid) {
        isPlayTableOk = false;
        playTableText = "Jemand hat deinen Namen geklaut !!!, wähle dich nochmals, dann kannst du zurückklauen...."
    }
    else if (Jass.getPlayerNameAtTable(Player.tablePosition) !== (Player.name + " ")) {
        isPlayTableOk = false;
        playTableText = "Auf deinem Stuhl sitzt schon jemand!!!, einer muss weichen...."
    }
    else {
        var checkPosition = [];
        for (var i = 0; i < 4; i++) {
            if (Model.players[i].tablePosition < 0) {
                isPlayTableOk = false;
                playTableText = "Spieler auf Position: " + (i + 1) + " ist noch nicht bereit"
            } else {
                checkPosition[Model.players[i].tablePosition] = Model.players[i].name
            }
        }
        //console.log("Spieler am Tisch:", checkPosition)
        if (checkPosition.length !== 4) {
            isPlayTableOk = false;
            playTableText = "Zu wenige Spieler oder sie sitzen noch am gleichen Platz !!!"
        }
    }
    return { isPlayTableOk: isPlayTableOk, playTableText: playTableText };
}

//-------------------------------------------
//Spielablauf Funktionen
//-------------------------------------------
// Prüfen ob 4 Karten uf dem Tisch liegen
Jass.nextRoundAllowed = function () {
    //Check model has cards
    if (Model.table.cards.length === 0){
        return false
    }
    var allowed = true;
    for (var i = 0; i < 4; i++) {
        if (Model.table.cards[i].id === 36) {
            allowed = false;
        }
    }
    return allowed;
};

// Suche Spieler mit der Karte
Jass.findPlayerWitchCard = function (searchId) {
    var i = 0;
    var c = 0;
    for (i = 0; i < 4; i++) {
        for (c = 0; c < 9; c++) {
            if (Model.players[i].cards[c].id === searchId) {
                console.log("Kante gefunden: ", Model.players[i].cards[c], searchId)
                return (i);
            }
        }
    }
    console.warn("Karte nicht gefunden!!!!:", searchId)
    return 0;
};