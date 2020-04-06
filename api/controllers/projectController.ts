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
    public static async list_all_projects(_req: express.Request, res: express.Response) {
        let projectJson: Document[];
        let projects: string[] = [];

        await Project.find({}, (_, project) => {
            projectJson = project;
            projects = project.map(a => a._id);
        });

        Task.find({ "_id" : { $in: projects }}, (err, tasks) => {
            if (err){
                res.send(err);
                return;
            }

            const mergedJson = [];
            for(const project of projectJson){
                const task = tasks.filter((el) => el._id === project._id)[0];
                mergedJson.push(JsonDocumentHelpers.mergeJsonDocuments(task, project));
            }

            res.json(mergedJson);
        });
    }

    // create a new project in the db
    // uses body of x-www-form-urlencoded type
    public static async create_a_project(body: any, res: express.Response) {
        const newProject = new Project(body);

        if (newProject._id){
            await newProject.save(async (err) => {
                if (err){
                    throw new Error(err);
                }
            });
        }
    }
}
