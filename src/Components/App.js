import React, { Component, Fragment } from 'react'
import {Menu, Content, Footer, StartScreen } from './Layouts'


// Import the Model
import { Player } from '../Model/Model'

export default class extends Component {

  state = {
    index: 0
  }

  handlePageSelected = index => {

    //console.log ("Handle Page Change",index)
    this.setState({ index: index })

  }



  render() {
    const { index } = this.state;

    if (Player.tableName === "-") {
      return <StartScreen />
    }

    return <Fragment>

      <Menu
        index={index}
        changePage={this.handlePageSelected}
      />

      <Content
        index={index}
        changePage={this.handlePageSelected}
      />

      <Footer
      />
    </Fragment>
  }
}
