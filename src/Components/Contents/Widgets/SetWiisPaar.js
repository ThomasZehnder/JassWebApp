import React from 'react';
import {
  Paper,
  Typography,
  Button
} from '@material-ui/core';

export default class SetWiisPaar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      wiis: this.props.wiis
    };

  };

  _handleResetWiis = () => {
    //console.log(" _handleResetWiis: ");
    this.setState({wiis: 0})
    this.props.handleChangeWiis({wiis:0, team:this.props.team});
  }

  _handleIncrementWiis = (increment) => {
    //console.log(" _handleNewPlayMode: ", increment);
    let  wiis = this.state.wiis + increment;
    this.setState({wiis: wiis})
    this.props.handleChangeWiis({wiis:wiis, team:this.props.team});
  }

  render() {

    return <Paper >
      <Typography color="textSecondary" variant="body2">
        {this.props.teamName} mit Total Wiis: {this.state.wiis}
      </Typography>

        <div style={{ padding: 10 }} >
            <Button variant="outlined" onClick={() => this._handleResetWiis()}>
              Zrugg setze (=0)
              </Button>
          </div>
          <div style={{ padding: 10 }} >
            <Button variant="outlined" onClick={() => this._handleIncrementWiis(20)}>
              Drü Blatt (+20)
              </Button>
          </div>
          <div style={{ padding: 10 }} >
            <Button variant="outlined" onClick={() => this._handleIncrementWiis(50)}>
              Vier Blatt (+50)
              </Button>
          </div>

    </Paper>
  }
}