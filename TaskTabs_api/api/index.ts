'use strict';

import express from "express";
import mongoose from "mongoose";
import * as bodyParser from "body-parser";
import { routeTaskApis } from "./routes/taskRoutes";
import { ApplicationConfig } from "./ApplicationConfig";

// set up the express application
const app: express.Application = express();
const port: number = ApplicationConfig.api.port;

// connect to our local mongo db
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://${ApplicationConfig.database.hostname}:${ApplicationConfig.database.port}/${ApplicationConfig.database.name}`,
    { useNewUrlParser: true, useUnifiedTopology: true });

// middleware setup to allow for json routing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// route the /api/Tasks endpoint
routeTaskApis(app);

// listen on the configured port
app.listen(port);