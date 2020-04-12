'use strict';

// import mongoose and express
import express, { json } from "express";
import { Task } from "../models/taskModel"
import { Counter } from "../models/counterModel"
import { CounterController, CounterMapping } from "./counterController";
import { Project } from "../models/projectModel";
import { ProjectController } from "./projectController";
import { Error, Document } from "mongoose";

// export controller for use in the routes generation
export class TaskController {

    // get a specific task in the db by passing an id
    public static get_a_task(req: express.Request, res: express.Response) {
        Task.findById(req.params.taskId, (err, task) => {
            if (err){
                res.send(err);
            }
            res.json(task);
        });
    }

    // create a task without creating a corresponding project in the db
    public static create_a_task_without_project(req: express.Request, res: express.Response){
        TaskController.create_a_task(req, res);
    }

    // create a task as well as a corresponding project in the db
    public static create_a_task_project(req: express.Request, res: express.Response){
        TaskController.create_a_task(req, res, /*isProject:*/ true);
    }

    // create a new task in the db... also get the current id from the counter sequence
    // update the task sequence counter to the new value (+1)
    // depending on which endpoint is triggered to do a create (Task/Project)...
    // only create a task or create a task and a project in the db
    private static async create_a_task(req: express.Request, res: express.Response, isProject = false) {
        const newTask = new Task(req.body);

        await CounterController.get_a_counter(CounterMapping.taskSequence).then(async value => {
            const counter: number = new Counter(value).get("sequenceValue");
            newTask._id = counter;

            try {
                await newTask.save(async (err, task) => {
                    if (err){
                        throw new Error(err);
                    }

                    if (task){
                        await CounterController.update_a_counter(CounterMapping.taskSequence, { sequenceValue: counter + 1 });
                        req.body._id = counter;
                        if (isProject){
                            await ProjectController.create_a_project(req.body, res);
                        }
                    }

                    res.json(req.body);
                });
            }
            catch(err){
                res.send(err);
                return;
            }
        });
    }

    // update a specific task in the db by passing an id ... all other info expected in the body
    // uses body of x-www-form-urlencoded type
    public static update_a_task(req: express.Request, res: express.Response) {
        const update = new Task(req.body);

        Task.findByIdAndUpdate(req.params.taskId, update, (err, task) => {
            if (err){
                res.send(err);
                return;
            }
            res.json(task);
        });
    }

    // delete a specific task/project in the db by passing an id
    public static async delete_a_task_and_subtasks(req: express.Request, res: express.Response) {
        let subtasks: string[] = [];

        //start with the current task as list of tasks to target
        const taskId: string = req.params.taskId;
        subtasks.push(taskId);

        //build a list of subtasks using the current task Id
        const buildSubtaskList = async (currId: string, temp: string[]): Promise<string[]> => {
            let subs: string[] = [];

            await Task.find({"parentId": currId}, (err, tasks) => {
                if (err){
                    res.send(err);
                    return;
                }
                subs = tasks.map(t => t._id);
            })

            return temp.concat(subs);
        };

        //iterate over each subtask. delete it and build a list of all subtasks of each task combined
        const iterateOverSubtasks = async (): Promise<string[]> => {
            let temp: string[] = [];
            for (const currId of subtasks){
                await TaskController.delete_a_task(currId, res);
                temp = await buildSubtaskList(currId, temp);
            }
            return temp;
        };

        //delete a level of subtasks until there are no subtasks in the db
        do {
            const temp = await iterateOverSubtasks();
            subtasks = temp;
        } while (subtasks.length > 0);

        //successful deletion
        res.json({ message: `Task ${taskId} and all subtasks successfully deleted`});
    }

    private static async delete_a_task(taskId: string, res: express.Response){
        Project.findByIdAndDelete(taskId, (err) => {
            if (err){
                res.send(err);
                return;
            }
        });

        Task.findByIdAndDelete(taskId, (err, task) => {
            if (err){
                res.send(err);
                return;
            }
        });
    }
}
