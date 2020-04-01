'use strict';

// object that matches our counter schema ... for use in creating test data
export class ProjectObj{
    _id: string;

    // construct a CounterModel base data class for insertion
    constructor(idParam: string) {
            this._id = idParam;
    }
}