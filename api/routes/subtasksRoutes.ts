'use strict';

import express from "express";
import { SubtasksController } from "../controllers/subtasksController";

// set up a list of exports for our subtasks api
export function routeSubtasksApis(app: express.Application) {

    // subtasks routes that require a task/project id to query
    app.route('/api/subtasks/:taskId')
      .get(SubtasksController.list_all_subtasks);
};