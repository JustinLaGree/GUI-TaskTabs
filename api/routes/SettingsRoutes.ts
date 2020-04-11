'use strict';

import express from "express";
import { SettingsController } from "../controllers/settingsController";

// set up a list of exports for our task api
export function routeSettingsApis(app: express.Application) {

  // task routes that require a task id to query
  app.route('/api/settings/:userId')
    .get(SettingsController.get_a_settings);
};