import React from 'react';
import { Button, Typography } from '@material-ui/core';

import NotListedLocationSharpIcon from '@material-ui/icons/NotListedLocationSharp';

import { Model} from '../../../Model/Model'

export default function NewRound(props) {

    const _handleNewRound = (el) => {
        props.jass.playNewRound();
    };

    function _lastRound(){
        //console.log("_lastRound Model.status.actualRound", Model.status.actualRound)
        return Model.status.actualRound>=8;
    }

    function _playFinished(){
        //console.log("_playFinished Model.status.actualRound", Model.status.actualRound)
        return Model.status.actualRound>=9;
    }

    return (
        <div style={{ padding: 10 }}>

            {!props.enable ? (
                <Typography variant="body1" >
                    {_playFinished() ? ("go zu RUNDE und träg dört Punkt i, nochher mischle und neu verteile...") :("Warte bis alli gspillt händ...")}
                </Typography>
            ) :
            (
                <Button key="nextRoundButton" variant="contained" color="primary" onClick={_handleNewRound} startIcon={<NotListedLocationSharpIcon />}>
                    {_lastRound() ? ( "Letzte Runde, wer hat de Stich gmacht?" ) 
                    :( "Dem wo de Stich ghört, soll Charte zäme nä, und di nöchschti Rundi starte. DO DRUCKE .-)" )
                    }
                </Button>
            )}
        </div>
    );
}

