'use strict';

import express from "express";
import { HistoryController } from "../controllers/historyController";

// set up a list of exports for our task api
export function routeHistoryApis(app: express.Application) {

  // history routes that require a task id to query
  app.route('/api/history/:taskId')
    .get(HistoryController.get_a_history)
};