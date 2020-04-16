'use strict';

import express from "express";
import { StatsController } from "../controllers/statsController";

// set up a list of exports for our stats api
export function routeStatsApis(app: express.Application) {

  // stats routes that require a project id
  app.route('/api/stats/completion/:projectId')
    .get(StatsController.get_completion_stats)
};