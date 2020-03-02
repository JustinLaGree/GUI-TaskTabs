'use strict';

import mongoose from "mongoose";

// interface for object that matches our counter schema
export interface ICounterObj{
    _id: string;
    sequenceValue: number
}

// object that matches our counter schema ... for use in creating test data
export class CounterObj implements ICounterObj{
    _id: string;
    sequenceValue: number

    // construct a CounterModel base data class for insertion
    constructor(idParam: string,
        sequenceValueParam: number) {
            this._id = idParam;
            this.sequenceValue = sequenceValueParam;
    }
}