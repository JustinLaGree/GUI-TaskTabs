'use strict';

// import mongoose and express
import express from "express";
import { Project } from "../models/projectModel";
import { Task } from "../models/taskModel";
import { Document } from "mongoose";
import { JsonDocumentHelpers } from "../helpers/jsonDocumentHelpers";

// export controller for use in the routes generation
export class ProjectController {

    // list all of the projects in the db
    static async list_all_projects(_req: express.Request, res: express.Response) {
        let projectJson: Document[];
        let projects: string[] = [];

        await Project.find({}, (_, project) => {
            projectJson = project;
            projects = project.map(a => a._id);
        });

        Task.find({ "_id" : { $in: projects }}, (err, tasks) => {
            if (err){
                res.send(err);
            }

            const mergedJson: Document[] = [];
            for(const project of projectJson){
                const task = tasks.filter((el) => el._id === project._id)[0];
                mergedJson.push(JsonDocumentHelpers.mergeJsonDocuments(task, project));
            }

            res.json(mergedJson);
        });
    }

    // create a new project in the db
    // uses body of x-www-form-urlencoded type
    static create_a_project(body: any, res: express.Response) {
        const newProject = new Project();
        newProject._id = body._id;

        if (newProject._id){
            newProject.save((err) => {
                if (err){
                    res.send(err);
                    return;
                }
            });
        }
    }
}
