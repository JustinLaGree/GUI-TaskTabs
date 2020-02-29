'use strict';

// import mongoose and express
import express from "express";
import { Task } from "../models/taskModel"
import { TaskObj } from "../testData/taskObj";

// export controller for use in the routes generation
export class TaskController {

    // list all of the tasks in the db
    static list_all_tasks(_req: express.Request, res: express.Response) {
        Task.find({}, "-_id", (err, task) => {
            if (err){
                res.send(err);
            }
            res.json(task);
      });
    }

    // get a specific task in the db by passing an id
    static get_a_task(req: express.Request, res: express.Response) {
        Task.find({ "id": req.params.taskId }, "-_id", (err, task) => {
            if (err){
                res.send(err);
            }
            res.json(task);
        });
    }

    // create a new task in the db
    static create_a_task(req: express.Request, res: express.Response) {
        const newTask = new Task(req.body);
        newTask.save((err, task) => {
            if (err){
                res.send(err);
            }
            res.json(task);
        });
    }

    // update a specific task in the db by passing an id ... all other info expected in the body
    // uses body of x-www-form-urlencoded type
    static update_a_task(req: express.Request, res: express.Response) {
        const update: TaskObj = req.body;
        update.id = parseInt(req.params.taskId, 10);

        Task.findOneAndUpdate({ "id": req.params.taskId }, update, (err, task) => {
            if (err){
                res.send(err);
            }
            res.json(task);
        });
    }

    // delete a specific task in the db by passing an id
    static delete_a_task(req: express.Request, res: express.Response) {
        Task.findOneAndDelete({"id": req.params.taskId}, (err, task) => {
            if (err){
                res.send(err);
                return;
            }
            else if (task) {
                res.json({ message: `Task ${req.params.taskId} successfully deleted`});
                return;
            }
            res.json({ message: `Task ${req.params.taskId} could not be found`})
        });
    }
}
