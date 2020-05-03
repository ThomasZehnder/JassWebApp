import React from 'react';
import {
    Grid,
    CircularProgress
} from '@material-ui/core';
import { CardOnTable } from './';

// Import the Model
import { Model } from '../../../Model/Model'

export default function PlayTable() {

    if (typeof Model.table.cards[0] !== "object") {
        return <div>
            <CircularProgress color="secondary" />
        wait...
    </div>
    }

    return (
        <div >
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <CardOnTable cardId={Model.table.cards[0].id} align="right" name={Model.table.cards[0].fromPlayer} textPosition="button" />
                </Grid>
                <Grid item xs={6}>
                    <CardOnTable cardId={Model.table.cards[1].id} align="left" name={Model.table.cards[1].fromPlayer} textPosition="button" />
                </Grid>
                <Grid item xs={6}>
                    <CardOnTable cardId={Model.table.cards[3].id} align="right" name={Model.table.cards[3].fromPlayer} textPosition="top" />
                </Grid>
                <Grid item xs={6}>
                    <CardOnTable cardId={Model.table.cards[2].id} align="left" name={Model.table.cards[2].fromPlayer} textPosition="top" />
                </Grid>
            </Grid>
        </div>
    );
}
