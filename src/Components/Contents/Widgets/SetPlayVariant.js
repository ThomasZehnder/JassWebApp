import React from 'react';
import {
  Paper,
  Typography,
  Grid, Button
} from '@material-ui/core';


// Import the styles
import { styles } from '../styles'

// Import the Model
import { Model, ModelUtils } from '../../../Model/Model'
import { Jass } from '../../../Model/Jass'

export default class SetPlayVariant extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playVariant: Model.settings.playVariant
    };

  };

  _handleNewPlayVariant = (playVariant) => {
    console.log(" _handleNewPlayMode: ", playVariant);

    Jass.setPlayVariant(playVariant)
    Model.settings.playVariant = playVariant
    this.setState({ playVariant: playVariant })
    ModelUtils.sendModel(Model);
  }


  render() {

    return <Paper style={styles.PaperParagraph} >
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <Typography color="textSecondary" variant="body2">
            Definiere den SpielModus: Aktuell {this.state.playVariant}
          </Typography>
        </Grid>
        <Grid item xs={9} >
          <div style={{ padding: 10 }} >
            <Button variant="outlined" onClick={() => this._handleNewPlayVariant("Einfach")}>
              {Jass.getPlayVariantText("Einfach")}
              </Button>
          </div>
          <div style={{ padding: 10 }} >
            <Button variant="outlined" onClick={() => this._handleNewPlayVariant("Gstuft")}>
            {Jass.getPlayVariantText("Gstuft")}
              </Button>
          </div>
        </Grid>
      </Grid>

    </Paper>
  }
}