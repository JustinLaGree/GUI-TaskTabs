'use strict';

import mongoose from "mongoose";
import { TaskTestData } from "./testData/taskTestData";
import { ProjectTestData } from "./testData/projectTestData";
import { CounterTestData } from "./testData/counterTestData";

// connect to our local mongo db
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/TaskTabsDBMS-Test', { useNewUrlParser: true, useUnifiedTopology: true });

// reconstruct the test data for the Tasks table
TaskTestData.ConstructTestData();
ProjectTestData.ConstructTestData();
CounterTestData.ConstructTestData();