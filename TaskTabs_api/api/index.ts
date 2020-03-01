'use strict';

import express from "express";
import mongoose from "mongoose";
import * as bodyParser from "body-parser";
import { routeTaskApis } from "./routes/taskRoutes";
import { routeProjectApis } from "./routes/projectRoutes";
import { ApplicationConfig } from "./ApplicationConfig";

// set up the express application
const app: express.Application = express();
const port: number = ApplicationConfig.api.port;

// connect to our local mongo db
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://localhost:${ApplicationConfig.database.port}/${ApplicationConfig.database.name}`,
    { useNewUrlParser: true, useUnifiedTopology: true });

// middleware setup to allow for json routing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// route all API endpoints
routeTaskApis(app);
routeProjectApis(app);

// listen on the configured port
app.listen(port);