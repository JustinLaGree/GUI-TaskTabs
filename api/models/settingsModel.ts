'use strict'; // must define variables to use them

import mongoose, { Document } from "mongoose";// using the mongoose library (js/mongodb integration) to create the json schemas

// Our MongoDB schema for the Task table
const SettingsSchema: mongoose.Schema = new mongoose.Schema({
    _id: String,
    theme: String,
    fontStyle: String,
    fontSize: Number
});

// Export this schema for use in other js files.
export const Settings = mongoose.model("Settings", SettingsSchema, "settings");