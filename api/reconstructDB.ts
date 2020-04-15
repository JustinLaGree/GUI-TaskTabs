'use strict';

import mongoose from "mongoose";
import { TaskTestData } from "./testData/taskTestData";
import { ProjectTestData } from "./testData/projectTestData";
import { CounterTestData } from "./testData/counterTestData";
import { ApplicationConfig } from "./ApplicationConfig";
import { HistoryTestData } from "./testData/historyTestData";
import { SettingsTestData } from "./testData/settingsTestData";

// connect to our local mongo db
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

const connectToDB = async () => {
    if(process.env.NODE_ENV === "production") {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    else {
        await mongoose.connect(`mongodb://localhost:${ApplicationConfig.database.port}/${ApplicationConfig.database.name}`,
        { useNewUrlParser: true, useUnifiedTopology: true })
    }
}

// reconstruct the test data for the Tasks table
const execAsync = async () => {
    await connectToDB();
    await TaskTestData.ConstructTestData();
    await ProjectTestData.ConstructTestData();
    await CounterTestData.ConstructTestData();
    await SettingsTestData.ConstructTestData();
    await HistoryTestData.ConstructTestData();
}

execAsync().then(() => {
    mongoose.connection.close();
    process.exit();
});