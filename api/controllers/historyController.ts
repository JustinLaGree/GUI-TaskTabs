'use strict';

// import mongoose and express
import express from "express";
import { History } from "../models/historyModel"

// export controller for use in the routes generation
export class HistoryController {

    // get a specific H in the db by passing an id
    public static get_a_history(req: express.Request, res: express.Response) {
        History.find({ "taskId" : req.params.taskId }, (err, task) => {
            if (err){
                res.send(err);
                return;
            }
            res.json(task);
        });
    }

    // create a row in the history table that corresponds to the provided body
    public static async create_a_history(body: any){
        const history = new History(body);

        await history.save((err) => {
            if (err){
                throw new Error(err);
            }
        });
    }
}
