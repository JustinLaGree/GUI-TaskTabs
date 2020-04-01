'use strict'; // must define variables to use them

import mongoose from "mongoose";// using the mongoose library (js/mongodb integration) to create the json schemas

// Our MongoDB schema for the project table
const ProjectSchema: mongoose.Schema = new mongoose.Schema({
    _id: String
});

// Export this schema for use in other js files.
export const Project = mongoose.model("Project", ProjectSchema);