import React from 'react';
import { Button, Typography } from '@material-ui/core';
import UndoIcon from '@material-ui/icons/Undo';

import { Model, ModelUtils } from '../../../Model/Model'

export default function UndoButton(props) {

    const _handleUndo = () => {
        ModelUtils.undoModel(Model);
    };


    return (
        <div style={{ padding: 10 }}>

            {ModelUtils.undoStoredModel === null ? (
                <Typography variant="body1" >
                    Nüt zum zruggoh...
                </Typography>
            ) :
                (
                    <Button variant="contained" color="primary" onClick={_handleUndo} startIcon={<UndoIcon />}>
                        {ModelUtils.undoText + "(UNDO)"}
                    </Button>
                )}
        </div>
    );
}

