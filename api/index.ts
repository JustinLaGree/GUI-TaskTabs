'use strict';

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as bodyParser from "body-parser";
import { routeTaskApis } from "./routes/taskRoutes";
import { routeProjectApis } from "./routes/projectRoutes";
import { ApplicationConfig } from "./ApplicationConfig";

// set up the express application
const app: express.Application = express();
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


// allow cross origin requests
app.use(cors());

// middleware setup to allow for json routing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// route all API endpoints
routeTaskApis(app);
routeProjectApis(app);

// listen on the configured port
app.listen(port);