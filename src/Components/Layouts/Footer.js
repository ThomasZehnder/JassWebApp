import React from 'react'
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress
} from '@material-ui/core'

import { Model, Player } from '../../Model/Model'
import { Webservice } from '../../Model/Model'
import { Cards } from '../../Model/Cards'
import { Jass } from '../../Model/Jass'

const styles = {
  localPaper: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  }
}

//https://material-ui.com/components/cards/

export default class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      updateCounter: 0,
      isPlayTableOk: false,
      playTableText: ""
    };
  };

  updatePage() {
    //console.log("Update Footer Page, cards length: ", Model.players[Player.indexInModel].cards.length);
    this.setState({ updateCounter: this.state.updateCounter + 1 });


    //Check play table
    var result = Jass.validatePlayTable();

    this.setState({ isPlayTableOk: result.isPlayTableOk });
    this.setState({ playTableText: result.playTableText });
  };

  componentDidMount() {
    console.log("Debug did mount: Call load getModel WS", Cards.length);
    Webservice.getPlay.subscription.append(this);
  };

  componentWillUnmount() {
    console.log("Debug did WillUnmount");
    Webservice.getPlay.subscription.remove(this);
  };

  _handleOnClick = (e) => {
    //console.log(" _handleOnClick: ", e.target, this);
    if ((Model.players[Player.indexInModel].isPlaying === true)&&(Model.status.schieberMode === "Losgohts")) {
      Jass.playCard(e.target);
    }
  }

  render() {

    if (typeof Model.players[0] != "object") {

      return <div><CircularProgress color="secondary" />
        <div>Wait or later press Init in Superviser first!!!</div>
      </div>
    }

    return <Paper style={styles.localPaper}>
      {(Model.status.schieberMode !== "Losgohts") ?
        ("Warte bis agseit") :
        (<div>{(Model.players[Player.indexInModel].isPlaying === false) ?
          ("Warten bis dra bisch...") :
          ("")}</div>
        )}


      {this.state.isPlayTableOk ? (<Grid container spacing={1} >

        {Model.players[Player.indexInModel].cards.map(({ id, visible }, index) =>
          <div key={"div_" + index}>
            {visible === true ?
              (<Grid item xs={'auto'} key={"card_" + index}>
                <Card >
                  <CardActionArea>
                    <CardMedia
                      image={"img/card_" + id + ".png"}
                      title={Cards[id].cardName}
                      component="img"
                      alt={"Karte: " + id}
                      height="75%"
                      data-cardindex={index}
                      onClick={this._handleOnClick}
                    />
                  </CardActionArea>
                </Card>
              </Grid>)
              : ("")
            }
          </div>
        )}
      </Grid>) :
        (<div>
          <Typography variant="body1" >
            {this.state.isPlayTableOk ? ("Spiel bereit") : ("Spielerbrett unvollständig")} <br></br>
            {!this.state.isPlayTableOk ? (this.state.playTableText) : ("ok")} <br></br>
          </Typography>
        </div>
        )

      }
    </Paper>

  }
}