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
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';


import { Player } from '../../Model/Model'

const tables = [
  { name: "Diaz", text: "Mexico and USA", icon: "Image" },
  { name: "Zehnder", text: "mit Stefan in Deutschland", icon: "Work" },
  { name: "Steiger", text: "Agi, Bruno, Erika & Thomas", icon: "BeachAccess" }
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
          <Icon>star</Icon>
          </Paper>
        </Grid>
      </Grid>

      <List style={styles.localList}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
        {tables.map((element) =>
          <ListItem key={element.name}>
            <ListItemAvatar>
              <Avatar>
                {/*image here*/}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={element.name} secondary={element.text} />
          </ListItem>

        )}
      </List>

    </Paper>

  }
}