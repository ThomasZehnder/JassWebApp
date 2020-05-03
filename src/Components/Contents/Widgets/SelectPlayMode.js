import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import InputRoundedIcon from '@material-ui/icons/InputRounded';


import { Model, Player, ModelUtils } from '../../../Model/Model'
import { Jass } from '../../../Model/Jass'


//https://material-ui.com/components/radio-buttons/
const useStylesRadio = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});

const useStylesButtons = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStylesRadio();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function SelectPlayMode(props) {
  const [playMode, setPlayMode] = React.useState(Model.status.playMode);


  const classes = useStylesButtons();

  const _handleSelectMode = (e) => {
    console.log("Spielart Wähle", e.target.value, playMode)
    if (e.target.value=== "Nüt") {
      return
    }
    ModelUtils.saveUndoModel(Model, "ups nöd wölle asäge... ");
    setPlayMode(e.target.value);
    Model.status.playMode = e.target.value;
    Model.table.playAction = Player.name + " hät " + Model.status.playMode + " gwählt. Usspile tuet: " + Jass.getPlayerNameAtTable(Model.status.playerToStart);
    Model.status.schieberMode = "Losgohts"
    ModelUtils.sendModel(Model);
  };

  const _handleClickSchiebe = () => {
    console.log("_handleClickSchiebe")
    ModelUtils.saveUndoModel(Model, "ups nöd wölle schiebe... ");
    Model.table.playAction += ", hät gschobe"
    Model.status.schieberMode = "Gschobe"
    ModelUtils.sendModel(Model);
  };

  const _showPlayModeSelect = () => {
    //Hauptspieler
    let show = ((Model.status.playerToStart === Player.tablePosition) && (Model.status.schieberMode === "Asege"));

    //Partner isch dra
    show = show | ((Model.status.playerToStart === ((Player.tablePosition + 2) % 4)) && (Model.status.schieberMode === "Gschobe"));

    return show
  };

  const _showSchiebeButton = () => {
    //nur beim Hauptspieler
    let show = ((Model.status.playerToStart === Player.tablePosition) && (playMode === "Nüt")&& (Model.status.schieberMode === "Asege"));
    return show
  };

  return (
    <div>
      {(Player.devMode) ? (<div>SchieberMode. {Model.status.schieberMode}</div>) : ("")}

      {(!_showPlayModeSelect()) ? ("B'isch nöd dra zum asäge") :
        (<div className={classes.root}>

          <FormControl component="fieldset" >
            <FormLabel component="legend">Wähle Spielart oder Schiebe :-)</FormLabel>
            <RadioGroup row defaultValue="Nüt" aria-label="position" name="customized-radios" onChange={_handleSelectMode}>
              <FormControlLabel value="Nüt" control={<StyledRadio />} label="Nüt" labelPlacement="top"/>
              <FormControlLabel value="Rose" control={<StyledRadio />} label="Rose" labelPlacement="top"/>
              <FormControlLabel value="Eichle" control={<StyledRadio />} label="Eichle" labelPlacement="top"/>
              <FormControlLabel value="Schälle" control={<StyledRadio />} label="Schälle" labelPlacement="top"/>
              <FormControlLabel value="Schilte" control={<StyledRadio />} label="Schilte" labelPlacement="top"/>
              <FormControlLabel value="Obenabe" control={<StyledRadio />} label="Obenabe" labelPlacement="top"/>
              <FormControlLabel value="Uneufe" control={<StyledRadio />} label="Uneufe" labelPlacement="top"/>
            </RadioGroup>
          </FormControl>
        </div>
        )}
      {(_showSchiebeButton()) ?
        (<Button color="secondary" variant="contained" onClick={_handleClickSchiebe} startIcon={<InputRoundedIcon />}>
          Schiebe
        </Button>) : ("")
      }
    </div>


  );
}
