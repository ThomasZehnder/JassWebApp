import React, { Fragment } from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


// Import the styles
import { styles } from './styles'

// Import the Model
import { Model, Player, Webservice ,ModelUtils} from '../../Model/Model'
import { Jass } from '../../Model/Jass'
import { Cards } from '../../Model/Cards'

import { NewGame } from './Widgets';
import { SetWiis } from './Widgets';
import { GotoPlayTableButton } from './Widgets';
import { UndoButton } from './Widgets';


export default class RoundPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playMode: Model.status.playMode,
      updateCounter: 0,
      rounds: Model.rounds
    };
  };

  updatePage() {
    //console.log("Update Round Page, actualRound: ", Model.status.actualRound);
    this.setState({ updateCounter: this.state.updateCounter + 1 });
    this.setState({ rounds: Model.rounds });
  };

  componentDidMount() {
    console.log("Debug did mount: Call load getModel WS");
    Webservice.getPlay.subscription.append(this);
    Webservice.getPlay.func(); //update immediately
  };

  componentWillUnmount() {
    console.log("Debug did WillUnmount");
    Webservice.getPlay.subscription.remove(this);
  };


  _image = (id) => {
    //console.log(" id: ", id)
    if (Player.devMode) {
      return <div>
        {Cards[id].cardName}
        <img src={"img/card_" + id + ".png"} alt={Cards[id].cardName} title={Cards[id].cardName} height="80" />
        Stichkraft ({this.state.playMode}): {Cards[id].props[this.state.playMode].force}<br/>
        Punkte ({this.state.playMode}): {Cards[id].props[this.state.playMode].points}<br/>
      </div>
    }
    return <img src={"img/card_" + id + ".png"} alt={Cards[id].cardName} title={Cards[id].cardName} height="120" />;
  };

  _showRound = (card) => {
    //console.log("table card", Model.table.playedCard )
    if (card === null) return false;
    if (Player.devMode) return true;
    if (Model.status.actualRound >= 8) return true;
    if ((Model.status.actualRound >= 1) && (Model.table.playedCard > 0)) return false;
    if (Model.status.actualRound >= 2) return false;
    return true;
  }

  _inputPointsElement = (team, round) => {
    //console.log("Update Points", team,round, this.state.rounds[round].teams[team].cardPoint)
    return <TextField
      id={"number_" + team + "_" + round}
      value={this.state.rounds[round].teams[team].cardPoint}
      variant ="outlined"
      readOnly={true}
      size="small"
      /*0.95 onChange={(e) => this._changePoints(e, team, round)} */
    />
  }

  //0.95 Keine Eingabe mehr nötig, da berechnet
  // _changePoints = (e, team, round) => {
  //   console.log("_inputPointsElement:", e.target.value, team, round);
  //   Model.rounds[round].teams[team].cardPoint = parseInt(e.target.value);
  //   this.setState({ rounds: Model.rounds });
  //   ModelUtils.sendModel(Model);
  // }

  _inputWiisElement = (team) => {
    //console.log("Update Points", team,round, this.state.rounds[round].teams[team].cardPoint)
    return <TextField
      id={"number_" + team}
      value={this.state.rounds[0].teams[team].wiisPoint}
      label="Wiis"
      type="number"
      onChange={(e) => this._changeWiis(e, team)}
    />
  }

  _changeWiis = (e, team) => {
    console.log("_inputPointsElement:", e.target.value, team);
    Model.rounds[0].teams[team].wiisPoint = parseInt(e.target.value);
    this.setState({ rounds: Model.rounds });
    ModelUtils.sendModel(Model);
  }

  _outputElement = (x, text, check157, variant) => {
    if ((check157 === true) && (x % 157 !== 0)) {
      return <TextField
        error
        helperText="Summe nicht x*157"
        value={x}
        label={text}
        type="text"
        readOnly={true}
        variant={variant}
      />
    }

    return <TextField
      value={x}
      label={text}
      type="text"
      readOnly={true}
      variant={variant}
    />
  }

  render() {
    if (typeof Model.rounds[0] !== "object") {
      return <div>Wait on Rounds...</div>
    }
    if (this.state.rounds === null) {
      return <div>Wait on rounds != null...</div>
    }

    return (
      <Paper style={styles.DynamicPaper}>
        <Paper style={styles.PaperHead}>
          [{this.state.updateCounter}]
          Zeigt die Züge dieser Runde an:
          {this._showRound ? (" Noch de erste Rundi oder susch erst am Schluss wieder, nöd bschisse ;-)") : ("")}
          {Player.devMode ? (<div>Developer Modus sieht alles um die Funktion zu prüfen !!!</div>) : ("")}
          <div style={{padding:10}}>Spielart isch: {Jass.getPlayVariantText(Model.settings.playVariant)} </div>
          <div style={{padding:10}}>Agseit isch: {Model.status.playMode}  
            {(Model.status.playMode !== "Nüt") ?(<div>und d'Charte zälled mit Faktor: {Jass.getPlayVariantFactor(Model.status.playMode)} </div>):("")}
        </div>
        </Paper>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow >
                <TableCell>Rundi</TableCell>
                <TableCell align="center">{Jass.getPlayerNameAtTable(0)}</TableCell>
                <TableCell align="center">{Jass.getPlayerNameAtTable(1)}</TableCell>
                <TableCell align="center">{Jass.getPlayerNameAtTable(2)}</TableCell>
                <TableCell align="center">{Jass.getPlayerNameAtTable(3)}</TableCell>
                <TableCell align="center">Gwünner</TableCell>
                <TableCell align="center">Punkte {Jass.getTeamNames(0)}</TableCell>
                <TableCell align="center">Punkte {Jass.getTeamNames(1)}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Model.rounds.map(({ cards, teams, winnerName, winnerTeamId }, index) => (
                <Fragment key={"round" + index}>
                  {(this._showRound(cards[0])) ?
                    (<TableRow >
                      <TableCell component="th" scope="row" >{index + 1}</TableCell>
                      <TableCell align="center" padding="none">{this._image(cards[0].id)}</TableCell>
                      <TableCell align="center" padding="none">{this._image(cards[1].id)}</TableCell>
                      <TableCell align="center" padding="none">{this._image(cards[2].id)}</TableCell>
                      <TableCell align="center" padding="none">{this._image(cards[3].id)}</TableCell>
                      <TableCell align="center">{winnerName}</TableCell>
                      {winnerTeamId === 0 ? (<TableCell align="center">{this._inputPointsElement(0, index)}</TableCell>) : (<TableCell align="center">...</TableCell>)}
                      {winnerTeamId === 1 ? (<TableCell align="center">{this._inputPointsElement(1, index)}</TableCell>) : (<TableCell align="center">...</TableCell>)}
                    </TableRow>
                    )
                    : (<Fragment />)
                  }
                </Fragment>))}
              <TableRow key="wiis">
                <TableCell component="th" scope="row" >Wiis + Stöck</TableCell>
                <TableCell align="center" padding="none"></TableCell>
                <TableCell align="center" padding="none"></TableCell>
                <TableCell align="center" padding="none"></TableCell>
                <TableCell align="center" padding="none"></TableCell>
                <TableCell align="center">.</TableCell>
                <TableCell align="center">{this._inputWiisElement(0)}</TableCell>
                <TableCell align="center">{this._inputWiisElement(1)}</TableCell>
              </TableRow>
              <TableRow key="total_points">
                <TableCell component="th" scope="row" >Total</TableCell>
                <TableCell align="center" padding="none"></TableCell>
                <TableCell align="center" padding="none"></TableCell>
                <TableCell align="center" padding="none">{this._outputElement(Jass.getRoundsPoints()[0], "Stich 1", false, "standard")}</TableCell>
                <TableCell align="center" padding="none">{this._outputElement(Jass.getRoundsPoints()[1], "Stich 2", false, "standard")}</TableCell>
                <TableCell align="center">{this._outputElement(Jass.getRoundsPoints()[0] + Jass.getRoundsPoints()[1], "ali Stich", true, "outlined")}</TableCell>
                <TableCell align="center">{this._outputElement(Jass.getRoundsSummery().sum[0], "Total", false, "filled")}</TableCell>
                <TableCell align="center">{this._outputElement(Jass.getRoundsSummery().sum[1], "Total", false, "filled")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container alignItems="center">
          <Grid item xs={3}>
            <SetWiis />
          </Grid>
          <Grid item xs={3} >
            <NewGame jass={Jass} />
          </Grid>
          <Grid item xs={3} >
            <UndoButton />
          </Grid>
          <Grid item xs={3} >
            <GotoPlayTableButton changePage={this.props.changePage}/>
          </Grid>
        </Grid>
        
      </Paper >
    );
  }
}
