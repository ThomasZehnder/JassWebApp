import React from 'react';
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress
} from '@material-ui/core';

import { GotoPlayTableButton } from './Widgets';

// Import the styles
import { styles } from './styles'

// Import the Model
import { Model, Player, Webservice, ModelUtils } from '../../Model/Model'
import { Jass } from '../../Model/Jass';

var formStyles = {
  formControl: {
    margin: 10,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: 20,
  },
}

export default class Start extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      updateCounter: 0,
      player: Player.indexInModel,
      tablePosition: Player.tablePosition,
      isPlayTableOk: false,
      playTableText: "",
      urlText: ""
    };
  };

  //console.log("Constructor props:", props)
  _setPlayerByIndex = (index) => {
    Player.indexInModel = index;
    Model.players[Player.indexInModel].guid = Player.guid;
    Player.name = Model.players[Player.indexInModel].name;
    Player.tablePosition = -1;
    Model.players[Player.indexInModel].tablePosition = Player.tablePosition;
    Model.players[Player.indexInModel].isPlayerReady = false;
    this.setState({ player: Player.indexInModel });

    //set Name in Titel
    document.title = "Jass " + Player.tableName+"/"+Player.name;
  }
  _setTablePosition = (position) => {
    Player.tablePosition = position;
    Model.players[Player.indexInModel].tablePosition = Player.tablePosition;
    this.setState({ tablePosition: Player.tablePosition });
  }

  _handleChangePlayerName = (event) => {
    console.log('_handleChangePayerName', event.target.value);
    if (event.target.value < 0) return

    //delete old player entry
    if (Model.players[Player.indexInModel].guid === Player.guid) {
      Model.players[Player.indexInModel].guid = 0;
      Model.players[Player.indexInModel].tablePosition = -1;
    }
    //set new player entry
    this._setPlayerByIndex(event.target.value);
    ModelUtils.sendModel(Model);

  };

  _handleChangePlayerTablePoition = (event) => {
    console.log('_handleChangePlayerTablePoition', event.target.value);
    this._setTablePosition(event.target.value);
    ModelUtils.sendModel(Model);
  };



  _updateDelayed = (name, position) => {
    //suche noch index vom Namen in dem Spielplan
    console.log("Spielername suchen", name);
    var i;
    for (i = 0; i < 4; i++) {
      if (Model.players[i].name === name) {
        this._setPlayerByIndex(i);
        console.log("Spielername aus URL entnommen", name);
        this._setTablePosition((position - 1) % 4);
        console.log("Spielposition aus URL entnommen", position - 1)
        ModelUtils.sendModel(Model);
      }
    }
  }

  updatePage() {
    //console.log("Update Start Page", Player);
    this.setState({ updateCounter: this.state.updateCounter + 1 });

    if (Player.name === "") {
      //URL parameter access
      let search = window.location.search;
      let params = new URLSearchParams(search);
      //prüfe ob der Name in der URL drinn ist 
      let name = params.get('player');
      let position = params.get('position');
      let waitAmount = position * 3;
      if ((name !== null) && (position !== null)) {
        //delay avoid in testing to load to fast
        if ((!Player.devMode) || (this.state.updateCounter > waitAmount)) {
          this._updateDelayed(name, position);
          if (Player.devMode) { this.setState({ urlText: "Developer Mode!!!" }) }
        }
        else {
          if (Player.devMode) { this.setState({ urlText: "Warten developer mode bis Parmeter ausgewertet werden!!!" + (waitAmount-this.state.updateCounter) + "... " }) }
        }
      }
    }


    //Check play table
    var result = Jass.validatePlayTable();

    this.setState({ isPlayTableOk: result.isPlayTableOk });
    this.setState({ playTableText: result.playTableText });

  };

  componentDidMount() {
    console.log("Start did mount: Call load getModel WS");
    Webservice.getPlay.subscription.append(this);
  };

  componentWillUnmount() {
    console.log("Start did WillUnmount");
    Webservice.getPlay.subscription.remove(this);
  };
  //----------------------------------------------

  _getPlayerReadyAtTable(position) {
    var ready = true
    Model.players.forEach((player) => {
      if (player.tablePosition === position) {
        ready &= player.isPlayerReady;
      }
    });
    return ready
  }
  _tableTeamName(team, position) {
    var name = Jass.getPlayerNameAtTable(position);

    return <Grid item xs={6}>
      {team === 1 ?
        (<Paper style={styles.PaperTeam1}>Spieler {position + 1}, Paar 1: {name}</Paper>)
        :
        (<Paper style={styles.PaperTeam2}>Spieler {position + 1}, Paar2: {name}</Paper>)
      }</Grid>
  }
  _chosePlayerPosition(name) {
    if (name !== "") {
      return <FormControl variant="outlined" style={formStyles.formControl}>
        <InputLabel id="player-position">
          Spiel Position
        </InputLabel>
        <Select
          labelId="player-position"
          id="player-position"
          value={Player.tablePosition}
          onChange={this._handleChangePlayerTablePoition}
          label="Wer bist du?"
        >
          <MenuItem value={-1}>{"?"}</MenuItem>
          <MenuItem value={0}>{"obe links, Paar 1"}</MenuItem>
          <MenuItem value={1}>{"obe rechts, Paar 2"}</MenuItem>
          <MenuItem value={2}>{"une rechts, Paar 1"}</MenuItem>
          <MenuItem value={3}>{"une links, Paar 2"}</MenuItem>
        </Select>
      </FormControl>
    }
  }

  //------------------------------------------

  render() {

    if (Model.players.length !== 4) {
      return <div><CircularProgress style={{ padding: 20 }} />Wait on play book...</div>
    }

    return (
      <Paper style={styles.DynamicPaper}>
        <Typography variant="body1" >
          [{this.state.updateCounter}]
          Hier werden die Spieler Namen ausgewählt, die Spielerpaare zugeordnet, das Spiel gestartet. Bitte macht eure Spielposition am Telefon aus.
        </Typography>

        <Paper style={styles.PaperParagraph}>
          {this.state.urlText}
          <FormControl variant="outlined" style={formStyles.formControl}>
            <InputLabel id="player-name">
              Wer bist du?</InputLabel>
            <Select
              labelId="player-name"
              id="player-name"
              value={Player.name === "" ? - 1 : Player.indexInModel}
              onChange={this._handleChangePlayerName}
              label="Wer bist du?"
            >
              <MenuItem value={-1}>?</MenuItem>
              <MenuItem value={0}>{Model.players[0].name}</MenuItem>
              <MenuItem value={1}>{Model.players[1].name}</MenuItem>
              <MenuItem value={2}>{Model.players[2].name}</MenuItem>
              <MenuItem value={3}>{Model.players[3].name}</MenuItem>
            </Select>
          </FormControl>

          {this._chosePlayerPosition(Player.name)}

        </Paper>
        <Paper style={styles.PaperParagraph} >
          <Typography variant="body1" >
            Aktuelle Spieler am Tisch:
        </Typography>

          <Grid container spacing={2}>
            {this._tableTeamName(1, 0)}
            {this._tableTeamName(2, 1)}
            {this._tableTeamName(2, 3)}
            {this._tableTeamName(1, 2)}

          </Grid>
        </Paper>

        {this.state.isPlayTableOk ? (<Paper style={styles.PaperParagraph} >
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography color="textSecondary" variant="body2">
                Super alle 4 ein Platz gefunden.<br></br>
                Spielart isch: {Jass.getPlayVariantText(Model.settings.playVariant)}
              </Typography>
            </Grid>
            <Grid item>
              <GotoPlayTableButton changePage={this.props.changePage}/>
            </Grid>
          </Grid>
        </Paper>) : ("")}

        <Paper style={styles.PaperParagraph}>
            <Grid>
              {Model.players[0].name},  {Model.players[1].name}, {Model.players[2].name}, {Model.players[3].name}
            </Grid>
            <Grid>
              {Model.players[0].getTimeDelay}ms,  {Model.players[1].getTimeDelay}ms, {Model.players[2].getTimeDelay}ms, {Model.players[3].getTimeDelay}ms
              </Grid>
            <Grid>
              {Model.players[0].tablePosition},  {Model.players[1].tablePosition}, {Model.players[2].tablePosition}, {Model.players[3].tablePosition}
            </Grid>
          </Paper>
      </Paper >
    );
  }
}
