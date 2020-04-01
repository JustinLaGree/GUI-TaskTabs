'use strict';

import mongoose from "mongoose";
import { TaskTestData } from "./testData/taskTestData";
import { ProjectTestData } from "./testData/projectTestData";
import { CounterTestData } from "./testData/counterTestData";
import { ApplicationConfig } from "./ApplicationConfig";

const port: string = process.env.PORT || ApplicationConfig.api.port.toString();

// connect to our local mongo db
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

if(process.env.NODE_ENV === "development") {
    mongoose.connect(`mongodb://localhost:${port}/${ApplicationConfig.database.name}`,
    { useNewUrlParser: true, useUnifiedTopology: true });
}
else {
    mongoose.connect(`mongodb://root:tasktabs1@ds133086.mlab.com:33086/heroku_hn0kpx12`,
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