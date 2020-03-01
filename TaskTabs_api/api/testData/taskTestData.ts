'use strict';

import { Task } from "../models/taskModel"
import { TaskObj } from "./taskObj"
import mongoose from "mongoose";

// class to reconstruct task table test data
export class TaskTestData {

    // list of inserts to be saved into the db
    static inserts: TaskObj[] = [
        new TaskObj("1", "Task1T", "Task1D", "Task1N", 1, new Date(), "New"),
        new TaskObj("2", "Task2T", "Task2D", "Task2N", 2, new Date(), "Active"),
        new TaskObj("3", "Task3T", "Task3D", "Task3N", 3, new Date(), "Done"),
        new TaskObj("4", "Task4T", "Task4D", "Task4N", 4, new Date(), "New")
    ];

    // clear the tasks table and re-generate test data
    static ConstructTestData(){
        mongoose.connection.collections.tasks.deleteMany({ });

        this.inserts.forEach(element => {
            const newTask = new Task(element);
            newTask.save();
        });
    }


}
