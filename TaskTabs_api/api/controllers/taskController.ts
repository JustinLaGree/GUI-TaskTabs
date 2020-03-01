'use strict';

// import mongoose and express
import express from "express";
import { Task } from "../models/taskModel"
import { Counter } from "../models/counterModel"
import { CounterController } from "./counterController";

// export controller for use in the routes generation
export class TaskController {

    // list all of the tasks in the db
    static list_all_tasks(_req: express.Request, res: express.Response) {
        Task.find({}, (err, task) => {
            if (err){
                res.send(err);
            }
            res.json(task);
      });
    }

    // get a specific task in the db by passing an id
    static get_a_task(req: express.Request, res: express.Response) {
        Task.findById(req.params.taskId, (err, task) => {
            if (err){
                res.send(err);
            }
            res.json(task);
        });
    }

    // create a new task in the db... also get the current id from the counter sequence
    //update the task sequence counter to the new value (+1)
    //TODO: JAL- An improvement would be a mapping from a logical value to the numeric id for the _id
    //cont... Ex: taskSequence maps to _id of 1
    static create_a_task(req: express.Request, res: express.Response) {
        const newTask = new Task(req.body);

        CounterController.get_a_counter("1").then(value => {
            const counter: number = new Counter(value).get("sequenceValue");
            newTask._id = counter;

            newTask.save((err, task) => {
                if (err){
                    res.send(err);
                    return;
                }
                res.json(task);
            });

            CounterController.update_a_counter("1", { sequenceValue: counter + 1 });
        });
    }

    // update a specific task in the db by passing an id ... all other info expected in the body
    // uses body of x-www-form-urlencoded type
    static update_a_task(req: express.Request, res: express.Response) {
        const update = new Task(req.body);

        Task.findByIdAndUpdate(req.params.taskId, update, (err, task) => {
            if (err){
                res.send(err);
            }
            res.json(task);
        });
    }

    // delete a specific task in the db by passing an id
    static delete_a_task(req: express.Request, res: express.Response) {
        Task.findByIdAndDelete(req.params.taskId, (err, task) => {
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
