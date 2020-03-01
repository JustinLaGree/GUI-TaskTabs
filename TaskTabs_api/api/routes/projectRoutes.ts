'use strict';

import express from "express";
import { ProjectController } from "../controllers/projectController";
import { TaskController } from "../controllers/taskController";

// set up a list of exports for our project api
export function routeProjectApis(app: express.Application) {

  // project routes that do not require a task/project id to query
  app.route('/api/projects')
    .get(ProjectController.list_all_projects)
    .post(TaskController.create_a_project);
};