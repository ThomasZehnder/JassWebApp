
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import { Cards } from '../../../Model/Cards'

export default class CardOnTable extends Component {

    render() {
        //console.log(this.props)

        return (
            <div align={this.props.align}>
                {(this.props.textPosition==="top") ? (<Typography variant="body2">
                    {this.props.name}
                </Typography>):("")}

                <img src={"img/card_" + this.props.cardId + ".png"}
                title={Cards[this.props.cardId].cardName}
                alt={Cards[this.props.cardId].cardName}
                heigth="100"
                ></img>

                {(this.props.textPosition==="button") ? (<Typography variant="body2" >
                    {this.props.name}
                </Typography>):("")}
            </div>
        );
    }
}