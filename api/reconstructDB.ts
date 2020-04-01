'use strict';

import mongoose from "mongoose";
import { TaskTestData } from "./testData/taskTestData";
import { ProjectTestData } from "./testData/projectTestData";
import { CounterTestData } from "./testData/counterTestData";
import { ApplicationConfig } from "./ApplicationConfig";

// connect to our local mongo db
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

if(process.env.NODE_ENV === "production") {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}
else {
    mongoose.connect(`mongodb://localhost:${ApplicationConfig.api.port}/${ApplicationConfig.database.name}`,
    { useNewUrlParser: true, useUnifiedTopology: true });
}

// reconstruct the test data for the Tasks table
const execAsync = async () => {
    await TaskTestData.ConstructTestData();
    await ProjectTestData.ConstructTestData();
    await CounterTestData.ConstructTestData();
}

execAsync().then(() => {
    mongoose.connection.close();
    process.exit();
});