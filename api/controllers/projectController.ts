'use strict';

// import mongoose and express
import express from "express";
import { IncomingHttpHeaders } from 'http';
import { Document } from "mongoose";
import { Constants } from "../helpers/constants";
import { JsonDocumentHelpers } from "../helpers/jsonDocumentHelpers";
import { Project } from "../models/projectModel";
import { Task } from "../models/taskModel";
import { BasePrivilegeRequiredController } from "./basePrivilegeRequiredController";

// export controller for use in the routes generation
export class ProjectController extends BasePrivilegeRequiredController{

    // list all of the projects in the db
    public static async list_all_projects(req: express.Request, res: express.Response) {
        let projectJson: Document[];
        let projects: string[] = [];

        const headers: IncomingHttpHeaders = req.headers;
        const user = headers["user-email"];

        await Project.find({ "collaborators": user }, (_, project) => {
            if (project == null || project.length <= 0){
                return;
            }

            projectJson = project;
            projects = project.map(a => a._id);
        });

        await Task.find({ "_id" : { $in: projects }}, (err, tasks) => {
            if (err){
                res.send(err);
                return;
            }

            const mergedJson = [];
            if (projectJson){
                for(const project of projectJson){
                    const task = tasks.filter((el) => el._id === project._id)[0];
                    
                    let merged = JsonDocumentHelpers.mergeJsonDocuments(task, project)
                    if (merged != null){
                        mergedJson.push(merged);
                    }
                    
                }
            }

            res.json(mergedJson);
        });
    }

    // create a new project in the db
    // uses body of x-www-form-urlencoded type
    public static async create_a_project(body: any) {
        const newProject = new Project(body);

        if (newProject._id){
            await newProject.save(async (err) => {
                if (err){
                    throw new Error(err);
                }
            });
        }
    }

    public static async update_a_project(req: express.Request, res: express.Response){
        const projectId = req.params.projectId;
        const update = req.body;

        const headers: IncomingHttpHeaders = req.headers;
        const owner = headers["user-email"];

        const isPriv = await BasePrivilegeRequiredController.verifyProjectModificationPrivilege(projectId, req);

        if (isPriv) {
            Project.findOneAndUpdate({ "_id": projectId, "owner": owner}, update, {new: true}, (err, project) => {
                if (err){
                    res.send(err);
                    return;
                }

                res.json(project);
            });
        } else {
            res.send(Constants.PrivilegeErrorMsg);
        }
    }
}
