'use strict'; //must define variables to use them

import mongoose from "mongoose";//using the mongoose library (js/mongodb integration) to create the json schemas

//Our MongoDB schema for the Task table
var TaskSchema: mongoose.Schema = new mongoose.Schema({
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
        maxlength: 1000
    },
    notes: {
        type: String,
        maxlength: 1000
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

//Export this schema for use in other js files.
module.exports = mongoose.model('Tasks', TaskSchema);