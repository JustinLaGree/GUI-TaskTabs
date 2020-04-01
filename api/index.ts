'use strict';

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as bodyParser from "body-parser";
import { routeTaskApis } from "./routes/taskRoutes";
import { routeProjectApis } from "./routes/projectRoutes";
import { ApplicationConfig } from "./ApplicationConfig";

// connect to our local mongo db
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

if(process.env.NODE_ENV === "production") {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}
else {
    mongoose.connect(`mongodb://localhost:${ApplicationConfig.database.port}/${ApplicationConfig.database.name}`,
    { useNewUrlParser: true, useUnifiedTopology: true });
}

// set up the express application
const app: express.Application = express();

// allow cross origin requests
app.use(cors());

// middleware setup to allow for json routing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// route all API endpoints
routeTaskApis(app);
routeProjectApis(app);

// listen on the configured port
const port: string = process.env.PORT || ApplicationConfig.api.port.toString();
app.listen(port);