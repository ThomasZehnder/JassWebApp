import React from 'react'
import {
  Typography,
  Tabs,
  Tab,
  Grid
} from '@material-ui/core'

import { content } from './Content'

import { Player } from '../../Model/Model'

export default ({ index, changePage }) => {

  const onIndexSelect = (e, index) => {
    //console.log("select in menu index", index)
    changePage(index);
  }

  const _showMenu = (entry) => {
    if ((Player.devMode!=="on")&&(entry.view>9)){
      return ""
    }
    return <Tab key={entry.jsid} label={entry.text} />
  }

  return <Grid container spacing={2} style={{ background: 'lightgreen' }}>
    <Grid item xs align="center">
      <Typography variant="body1">&copy; ZHS 2020 JassWebApp DEV V1.00<br></br>{Player.name}</Typography>
    </Grid>
    <Grid item xs={9}>
      <Tabs
        value={index}
        onChange={onIndexSelect}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="on"
      >
        {/* map = loop over all arrayelements*/}
        {content.map(entry =>
          _showMenu(entry)
        )}

      </Tabs>
    </Grid>
  </Grid>
}