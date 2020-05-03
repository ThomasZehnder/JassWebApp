import React, { Fragment } from 'react'
import {
    CircularProgress,
    Paper,
    Typography,
} from '@material-ui/core';

import { SelectPlayMode } from '.';
import { NewRound } from '.';
//import { NewGame } from '.';
import { UndoButton } from '.';

// Import the Model
import { Model, Player } from '../../../Model/Model'
import { Jass } from '../../../Model/Jass'
import NewGame from './NewGame';


export default class PlayCommands extends React.Component {

    render() {

        if (typeof Model.table.cards[0] !== "object") {
            return <div>
                <CircularProgress color="secondary" />
        wait on server connection...
    </div>
        }

        return (
            <Fragment >
                <Paper style={{ padding: 10 }}>
                    <Typography variant="h6" >
                        {Player.name === "" ? ("Bitte unter Start zuerst dich anmelden mit Namen :-)") : (<div>Ich bi {Player.name}</div>)}
                        Es isch: {this.props.webclientDate.toLocaleTimeString()} {"und gwählt isch "} 
                        <img src={"img/" + Model.status.playMode + ".png"} title={Model.status.playMode} alt={Model.status.playMode} heigth="50"></img>
                    </Typography>
                </Paper>
                <Paper style={{ padding: 10 }}>
                    <Typography variant="h6" >
                        {Model.table.playAction}
                    </Typography>
                </Paper>

                {(Model.status.schieberMode !== "Losgohts") ? (<SelectPlayMode />) : ("")}

                <NewRound jass={Jass} enable={this.props.nextRoundAllowed} />

                {/* <NewGame jass={Jass} /> */}

                <UndoButton />

                {(Model.status.actualRound === 9)?(<NewGame jass={Jass} />):("")}

            </Fragment >
        );
    }
}