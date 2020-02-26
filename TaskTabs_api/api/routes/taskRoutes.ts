'use strict';

import express from "express";
import { TaskController } from "../controllers/taskController";

//set up a list of exports for our api
export function routes(app: express.Application) {

  // task Routes
  app.route('/tasks')
    .get(TaskController.list_all_tasks)
    .post(TaskController.create_a_task);

  app.route('/tasks/:taskId')
    .get(TaskController.get_a_task)
    .put(TaskController.update_a_task)
    .delete(TaskController.delete_a_task);
};