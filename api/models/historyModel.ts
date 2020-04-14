'use strict'; // must define variables to use them

import mongoose from "mongoose";// using the mongoose library (js/mongodb integration) to create the json schemas

// Our MongoDB schema for the Task table
const HistorySchema: mongoose.Schema = new mongoose.Schema({
    taskId: {
        type: String,
        required: true
    },
    responsibleUser: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    textBody: {
        type: String,
        required: true
    }
});

// Export this schema for use in other js files.
export const History = mongoose.model("History", HistorySchema, "history");