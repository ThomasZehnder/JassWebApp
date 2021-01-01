import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText, 
  ListItemAvatar,
  Avatar
} from '@material-ui/core';

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

function setParams({ table = "" }) {
  const searchParams = new URLSearchParams();
  searchParams.set("table", table);
  return searchParams.toString();
}

function refreshPage() {
  window.location.reload();
}

export default class StartScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableName: Player.tableName
    };

  };


  _selectTable = (table) => {
    console.log(" _selectTable: ", table);

    Player.tableName = table.name;
    this.setState({ tableName: Player.tableName });

    const url = setParams({ table: Player.tableName });
    //do not forget the "?" !
    this.props.history.push(`?${url}`);

    refreshPage();
  }


  render() {

    return <Paper style={styles.localPaper}>

      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Paper style={styles.localPaper}>
            <Typography variant="body1" >
               Bitte Tisch wählen:
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <List style={styles.localList}>

            {tables.map((element) =>
              <ListItem button key={element.name} onClick={() => this._selectTable(element)}>
                <ListItemAvatar>
                  <Avatar alt={element.name} src={"/avantar/" + element.icon + ".jpg"} />
                </ListItemAvatar>
                <ListItemText primary={element.name} secondary={element.text} />
              </ListItem>
            )}
          </List>
        </Grid>
      </Grid>



    </Paper>

  }
}