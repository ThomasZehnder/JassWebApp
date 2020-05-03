import React from 'react';
import { Button} from '@material-ui/core';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';

import { Model, ModelUtils, Player } from '../../../Model/Model'

export default function GotoPlayTableButton(props) {

    const   _handleStartGame = () => {
        console.log(" _handleStartGame: ");
        Model.players[Player.indexInModel].isPlayerReady = true;
        ModelUtils.sendModel(Model);
        props.changePage(1); //wechsel zu Playe Page
      }

    return (
        <div style={{ padding: 10 }}>

            <Button variant="contained" color="primary" onClick={_handleStartGame} startIcon={<DashboardRoundedIcon />}>
                Goh zum Spiel Tisch...
            </Button>

        </div>
    );
}

