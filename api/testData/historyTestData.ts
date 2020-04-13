'use strict';

import mongoose from "mongoose";

// class to reconstruct history table test data
export class HistoryTestData {

    // clear the tasks table and re-generate test data
    static async ConstructTestData(){
        await mongoose.connection.collections.history.deleteMany({ });
    }
}
