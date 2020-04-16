'use strict';

// import mongoose and express
import express from "express";
import { Constants } from "../helpers/constants";
import { Task } from "../models/taskModel";
import { BasePrivilegeRequiredController } from "./basePrivilegeRequiredController";

// export controller for use in the routes generation
export class StatsController extends BasePrivilegeRequiredController{

    // get the stats for a given project's completion
    public static async get_completion_stats(req: express.Request, res: express.Response) {
        const projectId: string = req.params.projectId;

        const isPriv = await BasePrivilegeRequiredController.verifyTaskModificationPrivilege(projectId, req);

        if (isPriv){
            await Task.find({ projectId }, (err, tasks) => {
                if (err){
                    res.send(err);
                    return;
                }
                if (tasks)
                {
                    const numTotal = tasks.length;
                    const numCompleted = tasks.filter(t => t.get("status") === "complete").length;

                    const stats = { numTotal, numCompleted };
                    res.json(stats);
                }
            });
        }
        else {
            res.send(Constants.PrivilegeErrorMsg);
        }
    }
}
