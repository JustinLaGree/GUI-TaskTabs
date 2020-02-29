'use strict';

import express from "express";
import { TaskController } from "../controllers/taskController";

// set up a list of exports for our task api
export function routeTaskApis(app: express.Application) {

  // task routes that do not require a task id to query
  app.route('/api/tasks')
    .get(TaskController.list_all_tasks)
    .post(TaskController.create_a_task);

  // task routes that require a task id to query
  app.route('/api/tasks/:taskId')
    .get(TaskController.get_a_task)
    .put(TaskController.update_a_task)
    .delete(TaskController.delete_a_task);
};