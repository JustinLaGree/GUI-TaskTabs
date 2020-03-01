'use strict';

import { Project } from "../models/projectModel"
import { ProjectObj } from "./projectObj"
import mongoose from "mongoose";

// class to reconstruct project table test data
export class ProjectTestData {

    // list of inserts to be saved into the db
    static inserts: ProjectObj[] = [
        new ProjectObj("1"),
        new ProjectObj("3")
    ];

    // clear the project table and re-generate test data
    static ConstructTestData(){
        mongoose.connection.collections.projects.deleteMany({ });

        this.inserts.forEach(element => {
            const newProject = new Project(element);
            newProject.save();
        });
    }


}
