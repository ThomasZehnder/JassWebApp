import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import CloseIcon from '@material-ui/icons/Close';

export default function NewGame(props) {
  const [open, setOpen] = React.useState(false);

  const _handleNewGame = () => {
    console.log("Neu Game usgeee", props)
    props.jass.playNewGame();
    setOpen(false);
  };

  const _handleClickOpen = () => {
    setOpen(true);
  };

  const _handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ padding: 10 }}>
      <Button color="primary" variant="contained" onClick={_handleClickOpen} startIcon={<PlaylistPlayIcon />}>
        Mischle und neu verteile
      </Button>
      <Dialog
        open={open}
        onClose={_handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"neu Charte usgee?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Neu mischle und neu usgee.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={_handleClose} color="secondary" variant="contained" autoFocus startIcon={<CloseIcon />}>
            Uups hani nöd wölle
          </Button>
          <Button onClick={_handleNewGame} color="primary" variant="contained" startIcon={<PlaylistPlayIcon />}>
            Mischle und neui Rundi afange
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
