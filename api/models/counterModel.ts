'use strict'; // must define variables to use them

import mongoose from "mongoose";// using the mongoose library (js/mongodb integration) to create the json schemas

// Our MongoDB schema for the counter table
const CounterSchema: mongoose.Schema = new mongoose.Schema({
    _id: String,
    sequenceValue: {
        type: Number,
        required: true
    }
});

// Export this schema for use in other js files.
export const Counter = mongoose.model("Counter", CounterSchema);