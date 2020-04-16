"use strict";

import express from "express";
import { IncomingHttpHeaders } from 'http';
import { Project } from "../models/projectModel";
import { Task } from "../models/taskModel";

// class that can verify the user's privilege to modify a certain task's data
export class BasePrivilegeRequiredController{

    // check to see if the user has privilege to modify a task's data
    public static async verifyTaskModificationPrivilege(taskId: string | number, req: express.Request){
        let isPriv: boolean = false;

        const headers: IncomingHttpHeaders = req.headers;
        const user = headers["user-email"];

        let projectId;
        // get the desired task
        await Task.findById(taskId, (err, task) => {
            if (err){
                throw new Error(err);
            }

            projectId = task.get("projectId");
        });

        // see if the current user can view tasks in this project
        await Project.find({ "_id": projectId, "collaborators": user }, (err, project) => {
            if (err){
                throw new Error(err);
            }

            isPriv = (project != null && project.length > 0);
        });

        return isPriv;
    }

    // check to see if the user has privilege to modify a project's data
    public static async verifyProjectModificationPrivilege(projectId: string | number, req: express.Request){
        let isPriv: boolean = false;

        const headers: IncomingHttpHeaders = req.headers;
        const owner = headers["user-email"];

        await Project.find({ "_id": projectId, "owner": owner}, (err, project) => {
            if (err){
                throw new Error(err);
            }

            isPriv = (project != null && project.length > 0);
        });

        return isPriv;
    }
}