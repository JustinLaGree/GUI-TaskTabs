'use strict';

import mongoose from "mongoose"

//interface for object that matches our Task schema
export interface ITaskObj{
    _id: string;
    title: string;
    description: string;
    notes: string;
    assignedTo: number;
    deadline: Date;
    status: string;
}

// object that matches our Task schema ... for use in creating test data
export class TaskObj implements ITaskObj{
    _id: string;
    title: string;
    description: string;
    notes: string;
    assignedTo: number;
    deadline: Date;
    status: string;

    // construct a TaskModel base data class for insertion
    constructor(idParam: string,
        titleParam: string,
        descriptionParam: string,
        notesParam: string,
        assignedToParam: number,
        deadlineParam: Date,
        statusParam: string) {
            this._id = idParam;
            this.title = titleParam;
            this.description = descriptionParam;
            this.notes = notesParam;
            this.assignedTo = assignedToParam;
            this.deadline = deadlineParam;
            this.status = statusParam;
    }
}