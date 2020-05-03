import React from 'react';
import {
  Paper,
  Typography,
  Button,
} from '@material-ui/core';

import ReactJson from 'react-json-view'


// Import the styles
import { styles } from './styles'
import { Model, copyToModel, ModelUtils } from '../../Model/Model'
import { Webservice } from '../../Model/Model'
import { play_after_8rounds } from '../../Test/play_after_8rounds'
import { play_after_fullpoints } from '../../Test/play_after_fullpoints'

export default class Testsinformations extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      updateCounter: 0
    };
    //console.log("Constructor props:", props)
  };

  _onEdit(e) {
    //komisch dass hier Webservice nicht bekannt ist ;-()
    //console.log("e: ", e);
    Webservice.updateintervall = e.updated_src.updateintervall;
    Webservice.updateOn = e.updated_src.updateOn;
    Webservice.consoleOn = e.updated_src.consoleOn;
  }

  _handleLoadPlay_play_after_8rounds(tablename) {
    console.log("_handleLoadPlay_play_after_8rounds", tablename)
    copyToModel(play_after_8rounds);
    ModelUtils.sendModel(Model);
  };
  _handleLoadPlay_play_after_fullpoints() {
    console.log("_handleLoadPlay_play_after_fullpoints")
    copyToModel(play_after_fullpoints);
    ModelUtils.sendModel(Model);
  }



  updatePage() {
    console.log("Update Tests Page");
    this.setState({ updateCounter: this.state.updateCounter + 1 });
  }

  componentDidMount() {
    console.log("Tests did mount: Call load getModel WS");
    Webservice.getPlay.subscription.append(this);
    Webservice.getPlay.func(); //update immediately
  }

  componentWillUnmount() {
    console.log("Tests did WillUnmount");
    Webservice.getPlay.subscription.remove(this);
  }

  render() {

    return <Paper style={styles.FixPaper}>

      <Typography
        variant="h5"
        style={{ textTransform: 'uppercase' }}
      >
        Tests.js [Page Update Counter]:{this.state.updateCounter}
      </Typography>

      <Paper style={styles.PaperParagraph}>
        Webservice IP : "{Webservice.getPlay.url}"<br></br><br></br>
        Status of getplay-webservice to jass.zhs.ch: "{Webservice.getPlay.counter}"<br></br>
        Status of getplay-webservice to jass.zhs.ch: "{Webservice.getPlay.status}"<br></br>
        Status of setplay-webservice to jass.zhs.ch: "{Webservice.setPlay.status}"<br></br>
      </Paper>

      <Paper style={styles.PaperParagraph}>
      ModelUtils readOnly
        <ReactJson src={ModelUtils} theme="google" enableClipboard="false" collapsed="0" />
      </Paper>

      <Paper style={styles.PaperParagraph}>
        Webservice (writable -->     updateintervall,    updateOn,      consoleOn ):
        <ReactJson src={Webservice} theme="google" enableClipboard="false" collapsed="0"
          onEdit={(e) => this._onEdit(e)} />
      </Paper>

      <Button color="primary" variant="contained" onClick={this._handleLoadPlay_play_after_8rounds}>
        Lade play_after_8rounds
      </Button>

      <Button color="primary" variant="contained" onClick={this._handleLoadPlay_play_after_fullpoints}>
        Lade nach play_after_fullpoints
      </Button>

    </Paper>
  }
}
