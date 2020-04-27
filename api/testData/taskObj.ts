'use strict';

// object that matches our Task schema ... for use in creating test data
export class TaskObj{
    _id: string;
    parentId: number;
    projectId: number;
    title: string;
    description: string;
    assignedTo: string;
    deadline: Date;
    status: string;
    progress: number;

    // construct a TaskModel base data class for insertion
    constructor(idParam: string,
        parentIdParam: number,
        projectIdParam: number,
        titleParam: string,
        descriptionParam: string,
        assignedToParam: string,
        deadlineParam: Date,
        statusParam: string,
        progressParam: number) {
            this._id = idParam;
            this.parentId = parentIdParam;
            this.projectId = projectIdParam;
            this.title = titleParam;
            this.description = descriptionParam;
            this.assignedTo = assignedToParam;
            this.deadline = deadlineParam;
            this.status = statusParam;
            this.progress = progressParam;
    }
}