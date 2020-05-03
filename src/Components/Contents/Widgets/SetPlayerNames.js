import React from 'react';
import {
  Paper,
  Typography,
  Button,
  TextField,
  Grid
} from '@material-ui/core';



// Import the styles
import { styles } from '../styles'

// Import the Model
import { Model, ModelUtils, Player } from '../../../Model/Model'
import { Jass } from '../../../Model/Jass';

//Tips:See https://reactjs.org/docs/state-and-lifecycle.html

export default class SetPlayerNames extends React.Component {

  constructor(props) {
    super(props);
    //
    console.log(Model.players);

    //check if Model has players
    if (Model.players.length !== 4) {
      Jass.init();
    }

    this.state = {
      TableName: Player.tableName,
      playerName0: Model.players[0].name,
      playerName1: Model.players[1].name,
      playerName2: Model.players[2].name,
      playerName3: Model.players[3].name,
    };

  };

  _handleNewTableName = () => {
    console.log(" handleNewName: ", this.state);
    Player.tableName = this.state.TableName;
    Model.players[0].name = this.state.playerName0;
    Model.players[1].name = this.state.playerName1;
    Model.players[2].name = this.state.playerName2;
    Model.players[3].name = this.state.playerName3;
    ModelUtils.sendModel(Model);
  }

  _handleChangeName0 = (e) => {
    console.log(" handleNewTableName: ", e);
    this.setState({ playerName0: e.target.value });
  }
  _handleChangeName1 = (e) => {
    console.log(" handleNewTableName: ", e);
    this.setState({ playerName1: e.target.value });
  }
  _handleChangeName2 = (e) => {
    console.log(" handleNewTableName: ", e);
    this.setState({ playerName2: e.target.value });
  }
  _handleChangeName3 = (e) => {
    console.log(" handleNewTableName: ", e);
    this.setState({ playerName3: e.target.value });
  }

  render() {

    return <Paper style={styles.PaperParagraph} >
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <Typography color="textSecondary" variant="body2" style={{padding:20}}>
            Definiere den Namen der Spieler am Tisch: <b>{this.state.TableName}</b>
        </Typography>
        </Grid>
        <Grid item>
          <TextField id="playerName1" label="Spieler Name 1" value={this.state.playerName0} onChange={this._handleChangeName0} />
        </Grid>
        <Grid item>
          <TextField id="playerName2" label="Spieler Name 2" value={this.state.playerName1} onChange={this._handleChangeName1} />
        </Grid>
        <Grid item>
          <TextField id="playerName3" label="Spiel Name 3" value={this.state.playerName2} onChange={this._handleChangeName2} />
        </Grid>
        <Grid item>
          <TextField id="playerName4" label="Spieler Name 4" value={this.state.playerName3} onChange={this._handleChangeName3} />
        </Grid>

        <Grid item>
          <Button variant="contained" color="primary" onClick={this._handleNewTableName}>
            Set new Table Name and Player
        </Button>
        </Grid>
      </Grid>

    </Paper>
  }
}