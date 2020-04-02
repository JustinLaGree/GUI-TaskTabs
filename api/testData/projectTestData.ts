'use strict';

import { Project } from "../models/projectModel"
import { ProjectObj } from "./projectObj"
import mongoose from "mongoose";

// class to reconstruct project table test data
export class ProjectTestData {

    // list of inserts to be saved into the db
    static inserts: ProjectObj[] = [
        new ProjectObj("1", "test@gmail.com", [ "test@gmail.com", "test2@gmail.com" ] ),
        new ProjectObj("3", "test2@gmail.com", [ "test2@gmail.com", "test3@gmail.com" ] )
    ];

    // clear the project table and re-generate test data
    static async ConstructTestData(){
        const saveAsync = async (element: ProjectObj) => {
            const newTask = new Project(element);
            await newTask.save();
        }

        const execAsync = async () => {
            await mongoose.connection.collections.projects.deleteMany({ });

            for (const element of this.inserts){
                await saveAsync(element);
            }
        }

        await execAsync();
    }


}
