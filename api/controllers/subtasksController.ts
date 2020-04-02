'use strict';

// import mongoose and express
import express from "express";
import { Task } from "../models/taskModel";

// export controller for use in the routes generation
export class SubtasksController {

    // list all of the subtasks in the db for the given task
    static list_all_subtasks(req: express.Request, res: express.Response) {

        Task.find({"parentId": req.params.taskId}, (err, tasks) => {
            if (err){
                res.send(err);
            }
            res.json(tasks);
        });
    }
}
