//import React from 'react';
//import { render } from '@testing-library/react';
import { Jass } from '../Model/Jass';
import { Model } from '../Model/Model';

it('renders welcome message', () => {

    expect('object').toBe('object');
    var to = typeof Jass.init;
    console.log("typeof Jass: ", to)
    expect(to).toBe('function');

    console.log("Model:", Model)
    expect(Model.players[0].name).toBe('object');

});