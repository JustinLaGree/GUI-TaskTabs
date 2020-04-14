'use strict';

import mongoose from "mongoose";

// class to reconstruct history table test data
export class HistoryTestData {

    // clear the history table and re-generate test data
    static async ConstructTestData(){
        const history = mongoose.connection.collection("history");

        if (history){
            await history.deleteMany({ });
        }

    }
}
