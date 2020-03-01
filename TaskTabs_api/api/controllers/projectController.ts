'use strict';

// import mongoose and express
import express from "express";
import { Project } from "../models/projectModel";
import { TaskController } from "./taskController";

// export controller for use in the routes generation
export class ProjectController {

    // list all of the projects in the db
    static list_all_projects(_req: express.Request, res: express.Response) {
        Project.find({}, (err, project) => {
            if (err){
                res.send(err);
            }
            res.json(project);
        });
    }

    // create a new project in the db
    // uses body of x-www-form-urlencoded type
    static create_a_project(body: any, res: express.Response) {
        const newProject = new Project();
        newProject._id = body._id;

        if (newProject._id){
            newProject.save((err, project) => {
                if (err){
                    res.send(err);
                    return;
                }
            });
        }
    }
}
