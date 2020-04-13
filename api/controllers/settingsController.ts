'use strict';

// import mongoose and express
import express from "express";
import { Settings } from "../models/settingsModel";


// export controller for use in the routes generation
export class SettingsController {

    private static defaultSettings: any = {
        theme: "light",
        fontStyle: "verdana",
        fontSize: 16
    }

    // get a specific task in the db by passing an id
    static get_a_settings(req: express.Request, res: express.Response) {
        Settings.findById(req.params.userId, (err, setting) => {
            if (err){
                res.send(err);
                return;
            }

            if (!setting){
                const settingsJson = SettingsController.defaultSettings;
                settingsJson._id = req.params.userId;
                const settings = new Settings(settingsJson);

                settings.save((saveErr, inserted) => {
                    if (saveErr){
                        res.send(saveErr);
                        return;
                    }

                    res.json(inserted);
                });
            }
            else{
                res.json(setting);
            }
        });
    }
}
