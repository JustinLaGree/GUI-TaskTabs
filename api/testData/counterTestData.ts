'use strict';

import { Counter } from "../models/counterModel"
import { CounterObj } from "./counterObj"
import mongoose from "mongoose";

// class to reconstruct counter table test data
export class CounterTestData {

    // list of inserts to be saved into the db
    static inserts: CounterObj[] = [
        new CounterObj("1", 5)
    ];

    // clear the counter table and re-generate test data
    static ConstructTestData(){
        mongoose.connection.collections.counters.deleteMany({ });

        this.inserts.forEach(element => {
            const newCounter = new Counter(element);
            newCounter.save();
        });
    }


}
