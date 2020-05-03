import React from 'react';
import {
  Paper,
  Typography,
  Button,
  Grid
} from '@material-ui/core';


import { SetPlayerNames } from './Widgets';
import { SetPlayVariant } from './Widgets';

// Import the styles
import { styles } from './styles'

// Import the Model
import { Model, ModelUtils, Player } from '../../Model/Model'
import { Jass } from '../../Model/Jass'

//Tips:See https://reactjs.org/docs/state-and-lifecycle.html

export default class Supervisor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };

  };

  _handleInitGame = () => {
    console.log(" handleInit: ");
    Jass.init();
    ModelUtils.sendModel(Model);
  }
  _handleResetGame = () => {
    console.log(" handleReset: ");
    Jass.reset();
    ModelUtils.sendModel(Model);
  }

  render() {

    return <Paper style={styles.FixPaper}>

      <SetPlayerNames />
      <SetPlayVariant />

      <Paper style={styles.PaperParagraph}>

        <Typography color="textSecondary" variant="body2">
          Angabe von Name und Position direkt in der URL. Dadurch kann ohne eingabe nch refresh der Seite gleich weiter gespielt werden. <br></br>
          <br />
            TIP: http://jass.zhs.ch/?devmode=on&amp;table=b&amp;player=Thomas&amp;position=1 (position [1..4])
            <br />
            Für Entwickler: http://localhost:3000/?devmode=on oder Option usezhsservices für Test der ZHS Webservices
            <br />
        </Typography>
      </Paper>

      {(Player.devMode) ? (
        <div>
          <Paper style={styles.PaperParagraph} >
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography color="textSecondary" variant="body2">
                  Initialisiere die Runde (ACHTUNG alle Spieldaten und Einstellungen gehen verlohren!)<br></br>
              Verwende dies um eine Änderung des Datenmodells zu erzwingen.
            </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={this._handleInitGame}>
                  ! INIT  Game !
            </Button>
              </Grid>
            </Grid>
          </Paper>

          <Paper style={styles.PaperParagraph} >
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography color="textSecondary" variant="body2">
                  Rücksetzen die Runde (Einstellungen bleiben bestehen)<br></br>
              Verwende dies um das Spiel neu zu starten:
            </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={this._handleResetGame}>
                  Spiel neu starte, mit Null afange
                </Button>
              </Grid>
            </Grid>
          </Paper>


        </div>
      ) : ("")}
    </Paper>
  }
}