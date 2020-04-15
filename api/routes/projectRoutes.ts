'use strict';

import express from "express";
import { ProjectController } from "../controllers/projectController";
import { TaskController } from "../controllers/taskController";

// set up a list of exports for our project api
export function routeProjectApis(app: express.Application) {

  // project routes that do not require a project id to query
  app.route('/api/projects')
    .get(ProjectController.list_all_projects)
    .post(TaskController.create_a_task_project);

  // project routes that require a project id to query
  app.route('/api/projects/:projectId')
    .put(ProjectController.update_a_project)
};