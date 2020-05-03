import React from 'react';
import {
  Paper,
  Typography,
} from '@material-ui/core';

import ReactJson from 'react-json-view'

// Import the styles
import { styles } from './styles'
import { Model } from '../../Model/Model'
import { Webservice } from '../../Model/Model'

export default class Debuginformations extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      updateCounter: 0,
      formParId: 0,
      formValue: 0
    };

    //console.log("Constructor props:", props)
  };

  onFormParIdChange = e => {
    this.setState({
      formParId: e.target.value
    });
  };

  _onEdit(e) {
    //komisch dass hier Webservice nicht bekannt ist ;-()
    console.log("e: ", e);
  }
  updatePage() {
    console.log("Update Debug Page");
    this.setState({ updateCounter: this.state.updateCounter + 1 });
  }

  componentDidMount() {
    console.log("Debug did mount: Call load getModel WS");
    Webservice.getPlay.subscription.append(this);
    Webservice.getPlay.func();

  }

  componentWillUnmount() {
    console.log("Debug did WillUnmount");
    Webservice.getPlay.subscription.remove(this);
  }


  render() {
    return <Paper style={styles.FixPaper}>

      <Typography
        variant="h5"
        style={{ textTransform: 'uppercase' }}
      >
        Debuginformations.js (From Webclient ) [Page Update Counter]:{this.state.updateCounter}
      </Typography>

      <Paper style={styles.PaperParagraph}>
        Webservice IP : "{Webservice.getPlay.url}"<br></br><br></br>
        Status of getplay-webservice to jass.zhs.ch: "{Webservice.getPlay.status}"<br></br>
        Status of setplay-webservice to jass.zhs.ch: "{Webservice.setPlay.status}"
      </Paper>

      <Paper style={styles.PaperParagraph}>
        Model: 
        <ReactJson src={Model} theme="google" enableClipboard="false" collapsed="2"
        onEdit={(e) => this._onEdit(e)}/>
      </Paper>

    </Paper>
  }
}
