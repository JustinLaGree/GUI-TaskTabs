'use strict'; // must define variables to use them

import mongoose from "mongoose";// using the mongoose library (js/mongodb integration) to create the json schemas

// Our MongoDB schema for the Task table
const TaskSchema: mongoose.Schema = new mongoose.Schema({
    _id: String,
    parentId: {
        type: Number
    },
    projectId: {
        type: Number,
        required: "A projectId must be sepcified"
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
    assignedTo: {
        type: Number
    },
    deadline: {
        type: Date
    },
    status: {
        type: String,
        required: "A status must be specified"
    },
    progress: {
        type: Number,
        min: 0,
        max: 100
    }
});

// Export this schema for use in other js files.
export const Task = mongoose.model("Task", TaskSchema);