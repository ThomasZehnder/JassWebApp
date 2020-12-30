import React from 'react'
import {
  Paper,
  Typography,
  Grid
} from '@material-ui/core'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


import { Player } from '../../Model/Model'

const tables = [
  { name: "Diaz", text: "Mexico and USA", icon: "Diaz" },
  { name: "Harbich", text: "mit Elisabeth in Mexico", icon: "Harbich" },
  { name: "Stefan", text: "mit Stefan in Deutschland", icon: "Stefan" },
  { name: "Steinemann", text: "mit Brigitte und Urs", icon: "Steinemann" },
  { name: "Steiger", text: "mit Agi und Bruno", icon: "Steiger" }
];

const styles = {
  localPaper: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  localList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: "lightgreen",
  },
}


export default class StartScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableName: Player.tableName
    };
  };

  updatePage() {
    console.log("Update StartScreen Page, cards length: ", Player.tableName);

  };

  componentDidMount() {
    console.log("Debug did mount: Call load getModel WS", Player.tableName);
  };

  componentWillUnmount() {
    console.log("Debug did WillUnmount");
  };



  render() {

    return <Paper style={styles.localPaper}>
      <Grid container spacing={2}>

        <Grid item xs={6}>
          <Paper style={styles.localPaper}><Typography variant="body1" >Jass APP: Bitte zuerst Tisch wählen:  </Typography></Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={styles.localPaper}>xs=6
          <Avatar alt="Diaz" src="/avantar/diaz.jpg" />
          </Paper>
        </Grid>
      </Grid>

      <List style={styles.localList}>

        {tables.map((element) =>
          <ListItem key={element.name}>
            <ListItemAvatar>
            <Avatar alt={element.name} src={"/avantar/"+element.icon+".jpg"} />
            </ListItemAvatar>
            <ListItemText primary={element.name} secondary={element.text} />
          </ListItem>

        )}
      </List>

    </Paper>

  }
}