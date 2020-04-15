'use strict';

// import mongoose and express
import express from "express";
import { Constants } from "../helpers/constants";
import { Task } from "../models/taskModel";
import { BasePrivilegeRequiredController } from "./basePrivilegeRequiredController";

// export controller for use in the routes generation
export class SubtasksController extends BasePrivilegeRequiredController{

    // list all of the subtasks in the db for the given task
    public static async list_all_subtasks(req: express.Request, res: express.Response) {
        const taskId = req.params.taskId;

        const priv = await BasePrivilegeRequiredController.verifyTaskModificationPrivilege(taskId, req);

        if (priv) {
            Task.find({"parentId": taskId}, (err, tasks) => {
                if (err){
                    res.send(err);
                    return;
                }
                res.json(tasks);
            });
        } else {
            res.send(Constants.PrivilegeErrorMsg);
        }

    }
}
