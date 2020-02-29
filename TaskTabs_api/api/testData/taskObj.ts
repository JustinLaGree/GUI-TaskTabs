'use strict';

// object that matches our Task schema ... for use in creating test data
export class TaskObj{
    id: number;
    title: string;
    description: string;
    notes: string;
    assignedTo: number;
    deadline: Date;
    status: string;

    // construct a TaskModel base data class for insertion
    constructor(idParam: number,
        titleParam: string,
        descriptionParam: string,
        notesParam: string,
        assignedToParam: number,
        deadlineParam: Date,
        statusParam: string) {
            this.id = idParam;
            this.title = titleParam;
            this.description = descriptionParam;
            this.notes = notesParam;
            this.assignedTo = assignedToParam;
            this.deadline = deadlineParam;
            this.status = statusParam;
    }
}