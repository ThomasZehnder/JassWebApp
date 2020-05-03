import React from 'react'
import {
  Paper,
  Grid
} from '@material-ui/core'

// Import the styles
import { styles } from './styles'

import { PlayTable } from './Widgets/'
import { PlayCommands } from './Widgets/'

// Import the Model
import { Model } from '../../Model/Model'
import { Jass } from '../../Model/Jass'
import { Webservice } from '../../Model/Model'

export default class PlayerPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { webclientDate: new Date() };
  };

  updatePage() {
    //console.log("Update Player Page: ");
    this.setState({ webclientDate: new Date() });

  };

  componentDidMount() {
    console.log("Player did mount: Call getModeler WS");
    Webservice.getPlay.subscription.append(this);
  };

  componentWillUnmount() {
    console.log("Player did WillUnmount");
    Webservice.getPlay.subscription.remove(this);
  };

  render() {
    var nextRoundAllowed = Jass.nextRoundAllowed();

    if (typeof Model.players != "object") {
      return <div>Wait on players</div>
    }
    return <div>
      <Paper style={styles.DynamicPaper}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <PlayCommands webclientDate={this.state.webclientDate} nextRoundAllowed={nextRoundAllowed} />
          </Grid>
          <Grid item xs={6}>
            <Paper >
              <PlayTable />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>


  }
}