'use strict';

import { Counter } from "../models/counterModel"
import { CounterObj } from "./counterObj"
import mongoose from "mongoose";
import { TaskTestData } from "./taskTestData";

// class to reconstruct counter table test data
export class CounterTestData {

    // list of inserts to be saved into the db
    static inserts: CounterObj[] = [
        new CounterObj("1", TaskTestData.inserts.length + 1)
    ];

    // clear the counter table and re-generate test data
    static async ConstructTestData(){
        const saveAsync = async (element: CounterObj) => {
            const newTask = new Counter(element);
            await newTask.save();
        }

        const execAsync = async () => {
            await mongoose.connection.collections.counters.deleteMany({ });

            for (const element of this.inserts){
                await saveAsync(element);
            }
        }

        await execAsync();
    }


}
