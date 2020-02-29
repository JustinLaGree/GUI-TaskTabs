'use strict'; // must define variables to use them

import mongoose from "mongoose";// using the mongoose library (js/mongodb integration) to create the json schemas

// Our MongoDB schema for the Task table
const TaskSchema: mongoose.Schema = new mongoose.Schema({
    id: {
        type: Number,
        index: true,
        required: "An id must be specified for a task"
    },
    title: {
        type: String,
        required: "A title must be specified",
        maxlength: 100
    },
    description: {
        type: String,
        maxlength: 5000 // 200 words ~= 1000 chars ... 1000 words ~= 5000 chars
    },
    notes: {
        type: String,
        maxlength: 5000 // 200 words ~= 1000 chars ... 1000 words ~= 5000 chars
    },
    assignedTo: {
        type: Number
    },
    deadline: {
        type: Date
    },
    status: {
        type: String,
        required: "A status must be specified"
    }
});

// Export this schema for use in other js files.
export const Task = mongoose.model("Task", TaskSchema);