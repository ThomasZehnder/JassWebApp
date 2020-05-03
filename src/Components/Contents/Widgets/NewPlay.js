import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CloseIcon from '@material-ui/icons/Close';

export default function NewPlay(props) {
  const [open, setOpen] = React.useState(false);

  const _handleNewPlay = () => {
    console.log("Neu Spiel usgeee", props)
    props.jass.playNewPlay();
    setOpen(false);
};

  const _handleClickOpen = () => {
    setOpen(true);
  };

  const _handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{padding:10}}>
      <Button color="secondary" variant="contained" onClick={_handleClickOpen} startIcon={<DeleteForeverIcon />}>
        Spiel ganz neu afange!!!
      </Button>
      <Dialog
        open={open}
        onClose={_handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Spiel neu starte?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Wötsch würkli ganz neu afange? Rose Zeni fangt a.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={_handleClose} color="secondary" variant="contained" autoFocus startIcon={<CloseIcon />}> 
            Uups hani nöd wölle
          </Button>
          <Button onClick={_handleNewPlay} color="primary" variant="contained" startIcon={<DeleteForeverIcon />}>
            Mischle usgee und bi Null afange
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
