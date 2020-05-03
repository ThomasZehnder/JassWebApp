import React, { Fragment } from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

// Import the styles
import { styles } from './styles'

// Import the Model
import { Model } from '../../Model/Model'
import { Webservice } from '../../Model/Model'
import { Jass } from '../../Model/Jass'

import { NewGame } from './Widgets';
import { NewPlay } from './Widgets';
import { UndoButton } from './Widgets';

import { GotoPlayTableButton } from './Widgets';


export default class PlayPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      updateCounter: 0
    };
  };

  updatePage() {
    console.log("Update Play/Games Page, length: ", Model.games.length);
    this.setState({ updateCounter: this.state.updateCounter + 1 });
  };

  componentDidMount() {
    console.log("PlayPage did mount: Call load getModel WS");
    Webservice.getPlay.subscription.append(this);
    Webservice.getPlay.func();
  };

  componentWillUnmount() {
    console.log("PlayPage did WillUnmount");
    Webservice.getPlay.subscription.remove(this);
  };

  _outputElement = (x, text, variant) => {

    return <TextField
      value={x}
      label={text}
      type="text"
      readOnly={true}
      variant={variant}
    />
  }

  render() {

    return <Paper style={styles.DynamicPaper}>

      <Paper style={styles.PaperHead}>
        [{this.state.updateCounter}] Zeigt die Spiele dieser Begegnung an.
        </Paper>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow >
              <TableCell>Rundi</TableCell>

              <TableCell align="center">Punkt Paar 1</TableCell>
              <TableCell align="center">Punkt Paar 2</TableCell>
              <TableCell align="center">Wiis 1</TableCell>
              <TableCell align="center">Wiis 2</TableCell>
              <TableCell align="center">{Jass.getTeamNames(0)}</TableCell>
              <TableCell align="center">{Jass.getTeamNames(1)}</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {Model.games.map((game, index) => (
              <Fragment key={"round" + index}>
                <TableRow >
                  <TableCell component="th" scope="row" >{index + 1}</TableCell>
                  <TableCell align="center" >{game.points[0]}</TableCell>
                  <TableCell align="center" >{game.points[1]}</TableCell>
                  <TableCell align="center" >{game.wiis[0]}</TableCell>
                  <TableCell align="center" >{game.wiis[1]}</TableCell>
                  <TableCell align="center" >{game.sum[0]}</TableCell>
                  <TableCell align="center" >{game.sum[1]}</TableCell>
                </TableRow>

              </Fragment>))}
            <TableRow key="total_points">
              <TableCell component="th" scope="row" >Total</TableCell>
              <TableCell align="center" >{this._outputElement(Jass.getGamesPoints()[0], "Stich 1", "outlined")}</TableCell>
              <TableCell align="center" >{this._outputElement(Jass.getGamesPoints()[1], "Stich 2", "outlined")}</TableCell>
              <TableCell align="center" >{this._outputElement(Jass.getGamesWiis()[0], "Wiis 1", "outlined")}</TableCell>
              <TableCell align="center" >{this._outputElement(Jass.getGamesWiis()[1], "Wiis 2", "outlined")}</TableCell>
              <TableCell align="center">{this._outputElement(Jass.getGamesSummery().sum[0], "Total", "filled")}</TableCell>
              <TableCell align="center">{this._outputElement(Jass.getGamesSummery().sum[1], "Total", "filled")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container alignItems="center">
        <Grid item xs={3}>
        <NewGame jass={Jass} />
        </Grid>
        <Grid item xs={3} >
          <UndoButton />
        </Grid>
        <Grid item xs={3} >
          <GotoPlayTableButton changePage={this.props.changePage} />
        </Grid>
        <Grid item xs={3} >
          <NewPlay jass={Jass} />
        </Grid>
      </Grid>

    </Paper >
  }
}
