'use strict';

// import mongoose and express
import express from "express";
import { Task } from "../models/taskModel"
import { Counter } from "../models/counterModel"
import { CounterController, CounterMapping } from "./counterController";
import { Project } from "../models/projectModel";
import { ProjectController } from "./projectController";

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

    // create a task
    static create_a_task(req: express.Request, res: express.Response){
        TaskController.create_a_task_project(req, res);
    }

    // create a task that is also a project
    static create_a_project(req: express.Request, res: express.Response){
        TaskController.create_a_task_project(req, res, true);
    }

    // create a new task in the db... also get the current id from the counter sequence
    // update the task sequence counter to the new value (+1)
    private static create_a_task_project(req: express.Request, res: express.Response, isProject = false) {
        const newTask = new Task(req.body);

        CounterController.get_a_counter(CounterMapping.taskSequence).then(value => {
            const counter: number = new Counter(value).get("sequenceValue");
            newTask._id = counter;

            newTask.save((err, task) => {
                if (err){
                    res.send(err);
                    return;
                }
                res.json(task);

                if (task){

                    CounterController.update_a_counter(CounterMapping.taskSequence, { sequenceValue: counter + 1 });
                    if (isProject){
                        ProjectController.create_a_project(task, res);
                    }
                }
            });
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

    // delete a specific task/project in the db by passing an id
    static delete_a_task(req: express.Request, res: express.Response) {
        Project.findByIdAndDelete(req.params.taskId, (err, _project) => {
            if (err){
                res.send(err);
                return;
            }
        });

        Task.findByIdAndDelete(req.params.taskId, (err, task) => {
            if (err){
                res.send(err);
                return;
            }
            else if (task) {
                res.json({ message: `Task ${req.params.taskId} successfully deleted`});
                return;
            }
        });


    }
}
