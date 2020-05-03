export var Cards = [];

var i;
console.log("Cards loaded...")
for (i = 0; i < 36; i++) {
    Cards[i] = {
        name: "card_" + i
    };
}

//Rückseite [36]
Cards[36] = {
    name: "card_" + 36,
    cardName: "Blinde Charte"
}


//fülle KartenType
for (i = 0; i < 9; i++) {
    Cards[i] = { ...Cards[i], cardName: "Schälle " }
    Cards[i + 9] = { ...Cards[i], cardName: "Schilte " }
    Cards[i + 18] = { ...Cards[i], cardName: "Rose " }
    Cards[i + 27] = { ...Cards[i], cardName: "Eichle " }
}

//fülle Kartnen Name
for (i = 0; i < 4; i++) {
    Cards[i * 9 + 0].cardName += "Ass"
    Cards[i * 9 + 1].cardName += "König"
    Cards[i * 9 + 2].cardName += "Ober"
    Cards[i * 9 + 3].cardName += "Under"
    Cards[i * 9 + 4].cardName += "Zeni"
    Cards[i * 9 + 5].cardName += "Nüni"
    Cards[i * 9 + 6].cardName += "Achti"
    Cards[i * 9 + 7].cardName += "Sibni"
    Cards[i * 9 + 8].cardName += "Sechsi"
}


//Noch unvollständig, hier kommt die Wertung rein...
for (i = 0; i < 4; i++) {
    Cards[i * 9 + 0].props = _setAssProps();
    Cards[i * 9 + 1].props = _setKönigProps();
    Cards[i * 9 + 2].props = _setOberProps();
    Cards[i * 9 + 3].props = _setUnderProps();
    Cards[i * 9 + 4].props = _setZäniProps();
    Cards[i * 9 + 5].props = _setNüniProps();
    Cards[i * 9 + 6].props = _setAchtiProps();
    Cards[i * 9 + 7].props = _setSibniProps();
    Cards[i * 9 + 8].props = _setSechsiProps();
}

function _setAssProps(card) {
    var props = [];
    props["Obenabe"] = { points: 11, force: 11 };
    props["Uneufe"] = { points: 0, force: 0 };
    props["Schälle"] = { points: 11, force: 11 };
    props["Schilte"] = { points: 11, force: 11 };
    props["Rose"] = { points: 11, force: 11 };
    props["Eichle"] = { points: 11, force: 11 };
    return props;
}

function _setKönigProps(card) {
    var props = [];
    props["Obenabe"] = { points: 4, force: 7 };
    props["Uneufe"] = { points: 4, force: 4 };
    props["Schälle"] = { points: 4, force: 7 };
    props["Schilte"] = { points: 4, force: 7 };
    props["Rose"] = { points: 4, force: 7 };
    props["Eichle"] = { points: 4, force: 7 };
    return props;
}

function _setOberProps(card) {
    var props = [];
    props["Obenabe"] = { points: 3, force: 6 };
    props["Uneufe"] = { points: 3, force: 5 };
    props["Schälle"] = { points: 3, force: 6 };
    props["Schilte"] = { points: 3, force: 6 };
    props["Rose"] = { points: 3, force: 6 };
    props["Eichle"] = { points: 3, force: 6 };
    return props;
}

function _setUnderProps(card) {
    var props = [];
    props["Obenabe"] = { points: 2, force: 5 };
    props["Uneufe"] = { points: 2, force: 6 };
    props["Schälle"] = { points: 2, force: 5 };
    props["Schilte"] = { points: 2, force: 5 };
    props["Rose"] = { points: 2, force: 5 };
    props["Eichle"] = { points: 2, force: 5 };
    return props;
}

function _setZäniProps(card) {
    var props = [];
    props["Obenabe"] = { points: 10, force: 4 };
    props["Uneufe"] = { points: 10, force: 7 };
    props["Schälle"] = { points: 10, force: 4 };
    props["Schilte"] = { points: 10, force: 4 };
    props["Rose"] = { points: 10, force: 4 };
    props["Eichle"] = { points: 10, force: 4 };
    return props;
}

function _setNüniProps(card) {
    var props = [];
    props["Obenabe"] = { points: 0, force: 3 };
    props["Uneufe"] = { points: 0, force: 8 };
    props["Schälle"] = { points: 0, force: 3 };
    props["Schilte"] = { points: 0, force: 3 };
    props["Rose"] = { points: 0, force: 3 };
    props["Eichle"] = { points: 0, force: 3 };
    return props;
}

function _setAchtiProps(card) {
    var props = [];
    props["Obenabe"] = { points: 8, force: 2 };
    props["Uneufe"] = { points: 8, force: 9 };
    props["Schälle"] = { points: 0, force: 2 };
    props["Schilte"] = { points: 0, force: 2 };
    props["Rose"] = { points: 0, force: 2 };
    props["Eichle"] = { points: 0, force: 2 };
    return props;
}
function _setSibniProps(card) {
    var props = [];
    props["Obenabe"] = { points: 0, force: 1 };
    props["Uneufe"] = { points: 0, force: 10 };
    props["Schälle"] = { points: 0, force: 1 };
    props["Schilte"] = { points: 0, force: 1 };
    props["Rose"] = { points: 0, force: 1 };
    props["Eichle"] = { points: 0, force: 1 };
    return props;
}
function _setSechsiProps(card) {
    var props = [];
    props["Obenabe"] = { points: 0, force: 0 };
    props["Uneufe"] = { points: 11, force: 11 };
    props["Schälle"] = { points: 0, force: 0 };
    props["Schilte"] = { points: 0, force: 0 };
    props["Rose"] = { points: 0, force: 0 };
    props["Eichle"] = { points: 0, force: 0 };
    return props;
}

//Trumpf anpassen

_adjusTrumpfProps(Cards, "Schälle");
_adjusTrumpfProps(Cards, "Schilte");
_adjusTrumpfProps(Cards, "Rose");
_adjusTrumpfProps(Cards, "Eichle");

function _adjusTrumpfProps(cards, set) {
    for (i = 0; i < 36; i++) {
        if (cards[i].cardName.startsWith(set)) {
            cards[i].props[set].force += 50;

            //Bure
            if (cards[i].cardName === set + " Under") {
                cards[i].props[set].force = 75
                cards[i].props[set].points = 20
            }
            //Nell
            if (cards[i].cardName === set + " Nüni") {
                cards[i].props[set].force += 70
                cards[i].props[set].points = 14
            }
        }
    }
}
