'use strict';

// interface for object that matches our counter schema
export interface IProjectObj{
    _id: string;
}

// object that matches our counter schema ... for use in creating test data
export class ProjectObj implements IProjectObj{
    _id: string;

    // construct a CounterModel base data class for insertion
    constructor(idParam: string) {
            this._id = idParam;
    }
}