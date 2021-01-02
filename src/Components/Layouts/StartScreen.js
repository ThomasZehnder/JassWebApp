import React from 'react';
import axios from 'axios';

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

// Import the Model
import { Webservice, Player } from '../../Model/Model'


const startTables = [
  { name: "Start", text: "Start Table for Tests only. In case you see this, webservice is not running on serverside.", icon: "start" },
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
      tableName: Player.tableName,
      tables : startTables
    };

  };

  componentDidMount() {
    axios.get(Webservice.getTable.url)
      .then(res => {
        const tables = res.data;
        console.log(tables);
        this.setState({ tables: tables });
      })
  }

  _selectTable = (table) => {
    console.log(" _selectTable: ", table);

    Player.tableName = table.icon;  //use icon name, because capital are small to match with icon in menu
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

            {this.state.tables.map((element) =>
              <ListItem button key={element.name} onClick={() => this._selectTable(element)}>
                <ListItemAvatar>
                  <Avatar alt={element.name} src={"avatar/" + element.icon + ".jpg"} />
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