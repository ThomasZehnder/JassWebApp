import React from 'react';
import {
  Paper,
  Typography,
} from '@material-ui/core';

import ReactJson from 'react-json-view'

// Import the styles
import { styles } from './styles'

// Import the Model
import { Model } from '../../Model/Model'
import { Player } from '../../Model/Model'
import { Webservice } from '../../Model/Model'
import { Cards } from '../../Model/Cards'


export default () => {

  return (

    <Paper style={styles.FixPaper}>
      <Typography
        variant="h5"
        style={{ textTransform: 'uppercase' }}
      >
        Modelviewer.js (page has now activ update...)
    </Typography>
      <Paper style={styles.PaperParagraph}>
        Model only for test :-). If not well JSON formed, check JSON format.<br></br>
        <br></br>
      {/* <pre>
          Model : "{getModelJSON()}"
      </pre> */}
        <ReactJson src={Model} theme="google" enableClipboard="false" collapsed="1"/>
      </Paper>

      <Paper style={styles.PaperParagraph}>
        Player structur<br></br>
        <ReactJson src={Player} theme="google" enableClipboard="false" collapsed="1"/>
      </Paper>

      <Paper style={styles.PaperParagraph}>
        Webservice structur<br></br>
        <ReactJson src={Webservice} theme="google" enableClipboard="false" collapsed="1"/>
      </Paper>

      <Paper style={styles.PaperParagraph}>
        Cards structur<br></br>
        <ReactJson src={Cards} theme="google" enableClipboard="false" collapsed="1"/>
      </Paper>
    </Paper>
  );
}
