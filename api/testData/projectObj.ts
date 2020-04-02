'use strict';

// object that matches our project schema ... for use in creating test data
export class ProjectObj{
    _id: string;
    owner: string;
    collaborators: string[];

    // construct a ProjectModel base data class for insertion
    constructor(idParam: string,
        ownerParam: string,
        collaboratorsParam: string[]) {
            this._id = idParam;
            this.owner = ownerParam;
            this.collaborators = collaboratorsParam;
    }
}