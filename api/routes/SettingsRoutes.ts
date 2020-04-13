'use strict';

import express from "express";
import { SettingsController } from "../controllers/settingsController";

// set up a list of exports for our settings api
export function routeSettingsApis(app: express.Application) {

  // settings routes that require a user id to query
  app.route('/api/settings/:userId')
    .get(SettingsController.get_a_settings);
};