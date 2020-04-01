'use strict';

// object that matches our counter schema ... for use in creating test data
export class CounterObj{
    _id: string;
    sequenceValue: number

    // construct a CounterModel base data class for insertion
    constructor(idParam: string,
        sequenceValueParam: number) {
            this._id = idParam;
            this.sequenceValue = sequenceValueParam;
    }
}