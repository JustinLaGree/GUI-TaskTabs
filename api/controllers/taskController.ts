'use strict';

// import mongoose and express
import express from "express";
import { Task } from "../models/taskModel"
import { Counter } from "../models/counterModel"
import { CounterController, CounterMapping } from "./counterController";
import { Project } from "../models/projectModel";
import { ProjectController } from "./projectController";
import { Error, Document } from "mongoose";
import { HistoryController } from "./historyController";

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

                        await TaskController.create_task_history_on_create(req.body);
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

    // create a histroy entry when a task is created
    private static async create_task_history_on_create(body: any){
        const history = {
            taskId: body._id,
            // TODO: Implement user info from passed in header
            responsibleUser: "test",
            timestamp: Date.now(),
            textBody: `Task #${body._id} ${body.title} was created: \\n
\\tDescription: ${body.description}\\n
\\tAssigned To: ${body.assignedTo}\\n
\\tDeadline: ${body.deadline}\\n
\\tStatus: ${body.status}\\n`
        }
        await HistoryController.create_a_history(history);
    }

    // create a history entry when a  task is updated
    private static async create_task_history_on_update(oldTask: any, newTask: any){
        let text: string = `Task #${newTask._id} was edited: \\n`

        if (oldTask.title !== newTask.title){
            text += `\\tTitle: [${oldTask.title}] => [${newTask.title}]\\n`
        }
        if (oldTask.description !== newTask.description){
            text += `\\tDescription: [${oldTask.description}] => [${newTask.description}]\\n`
        }
        if (oldTask.assignedTo !== newTask.assignedTo){
            text += `\\tAssigned To: [${oldTask.assignedTo}] => [${newTask.assignedTo}]\\n`
        }
        if (oldTask.deadline !== newTask.deadline){
            text += `\\tDeadline: [${oldTask.deadline}] => [${newTask.deadline}]\\n`
        }
        if (oldTask.status !== newTask.status){
            text += `\\tStatus: [${oldTask.status}] => [${newTask.status}]\\n`
        }

        const history = {
            taskId: newTask._id,
            // TODO: Implement user info from passed in header
            responsibleUser: "test",
            timestamp: Date.now(),
            textBody: text
        }
        await HistoryController.create_a_history(history);
    }

    // update a specific task in the db by passing an id ... all other info expected in the body
    // uses body of x-www-form-urlencoded type
    public static async update_a_task(req: express.Request, res: express.Response) {
        const update = new Task(req.body);
        let oldTask: Document;
        let newTask: Document;

        await Task.findById(req.params.taskId, (err, task) => {
            if (err){
                res.send(err);
                return;
            }
            oldTask = task;
        });

        await Task.findByIdAndUpdate(req.params.taskId, update, {new: true}, (err, task) => {
            if (err){
                res.send(err);
                return;
            }
            newTask = task;
        });

        await TaskController.create_task_history_on_update(oldTask, newTask);
        res.json(newTask);
    }

    // delete a specific task/project in the db by passing an id
    public static async delete_a_task_and_subtasks(req: express.Request, res: express.Response) {
        let subtasks: string[] = [];

        // start with the current task as list of tasks to target
        const taskId: string = req.params.taskId;
        subtasks.push(taskId);

        // build a list of subtasks using the current task Id
        const buildSubtaskList = async (currId: string, subs: string[]): Promise<string[]> => {

            await Task.find({"parentId": currId}, (err, tasks) => {
                if (err){
                    res.send(err);
                    return;
                }
                const ids = tasks.map(t => t._id);
                subs.concat(ids);
            })

            return subs;
        };

        // iterate over each subtask. delete it and build a list of all subtasks of each task combined
        const iterateOverSubtasks = async (): Promise<string[]> => {
            let newSubtasks: string[] = [];

            for (const currId of subtasks){
                await TaskController.delete_a_task(currId, res);
                newSubtasks = await buildSubtaskList(currId, newSubtasks);
            }
            return newSubtasks;
        };

        // delete a level of subtasks until there are no subtasks in the db
        do {
            subtasks = await iterateOverSubtasks();
        } while (subtasks.length > 0);

        // successful deletion
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
