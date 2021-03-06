'use strict';

import mongoose from "mongoose";
import { Task } from "../models/taskModel";
import { TaskObj } from "./taskObj";

// class to reconstruct task table test data
export class TaskTestData {

    // list of inserts to be saved into the db
    public static inserts: TaskObj[] = [
        new TaskObj("1", null, 1, "Task1T", "Task1D", null, new Date(), "New", 50),
        new TaskObj("2", 1, 1, "Task2T", "Task2D", null, new Date(), "Active", 100),
        new TaskObj("3", null, 3, "Task3T", "Task3D", null, new Date(), "Done", 0),
        new TaskObj("4", 1, 1, "Task4T", "Task4D", null, new Date(), "New", 0),
        new TaskObj("5", 4, 1, "Task4T", "Task4D", null, new Date(), "New", 0),
        new TaskObj("6", 4, 1, "Task4T", "Task4D", null, new Date(), "New", 0)
    ];

    // clear the tasks table and re-generate test data
    static async ConstructTestData(){
        const saveAsync = async (element: TaskObj) => {
            const newTask = new Task(element);
            await newTask.save();
        }

        const execAsync = async () => {
            await mongoose.connection.collections.tasks.deleteMany({ });

            for (const element of this.inserts){
                await saveAsync(element);
            }
        }

        await execAsync();
    }


}
