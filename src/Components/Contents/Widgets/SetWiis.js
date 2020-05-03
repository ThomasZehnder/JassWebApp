import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

import CloseIcon from '@material-ui/icons/Close';
import ImportContactsRoundedIcon from '@material-ui/icons/ImportContactsRounded';

import { SetWiisPaar } from "./"

// Import the Model
import { Model, ModelUtils } from '../../../Model/Model'
import { Jass } from '../../../Model/Jass'



export default function SetWiis(props) {
  const [open, setOpen] = React.useState(false);
  const [wiisTeam1, setWiisTeam1] = React.useState(Model.rounds[0].teams[0].wiisPoint);
  const [wiisTeam2, setWiisTeam2] = React.useState(Model.rounds[0].teams[1].wiisPoint);


  const _handleSetWiis = () => {
    console.log("_handleSetWiis", wiisTeam1, wiisTeam2)
    Model.rounds[0].teams[0].wiisPoint = wiisTeam1
    Model.rounds[0].teams[1].wiisPoint = wiisTeam2
    ModelUtils.sendModel(Model);
    setOpen(false);
  };

  const _handleChangeWiis = (data) => {
    console.log("_handleChangeWiis", props, data)
    if (data.team === 1) {
      setWiisTeam1(data.wiis)
    }
    if (data.team === 2) {
      setWiisTeam2(data.wiis)
    }
  };

  const _handleClickOpen = () => {
    setOpen(true);
  };

  const _handleClose = () => {
    //reload old values
    setWiisTeam1(Model.rounds[0].teams[0].wiisPoint);
    setWiisTeam2(Model.rounds[0].teams[1].wiisPoint);

    setOpen(false);
  };

  return (
    <div style={{ padding: 10 }}>
      <Button color="primary" variant="contained" onClick={_handleClickOpen} startIcon={<ImportContactsRoundedIcon />}>
        Wiis und Stöck iträge
      </Button>
      <Dialog
        open={open}
        onClose={_handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{"Wiis und Stöck iträge"}</DialogTitle>
        <DialogContent>
          <Grid container alignItems="center" >
            <Grid item xs={6}>
              <SetWiisPaar team={1} wiis={wiisTeam1} handleChangeWiis={_handleChangeWiis} teamName={Jass.getTeamNames(0)} />
            </Grid>
            <Grid item xs={6}>
              <SetWiisPaar team={2} wiis={wiisTeam2} handleChangeWiis={_handleChangeWiis} teamName={Jass.getTeamNames(1)} />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={_handleClose} color="secondary" variant="contained" autoFocus startIcon={<CloseIcon />}>
            Uups nüüt iträge
          </Button>
          <Button onClick={_handleSetWiis} color="primary" variant="contained" startIcon={<ImportContactsRoundedIcon />}>
            Wiis und Stöck aktualisieren
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}
