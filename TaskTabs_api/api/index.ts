'use strict';

import express from "express";
import mongoose from "mongoose";
import * as bodyParser from "body-parser";
import { routeTaskApis } from "./routes/taskRoutes";

// set up the express application
const app: express.Application = express();
const port: number = 1337;

// connect to our local mongo db
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/TaskTabsDBMS-Test', { useNewUrlParser: true, useUnifiedTopology: true });

// middleware setup to allow for json routing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// route the /api/Tasks endpoint
routeTaskApis(app);

// listen on the configured port
app.listen(port);