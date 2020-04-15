'use strict';

// import mongoose and express
import express from "express";
import { Constants } from "../helpers/constants";
import { History } from "../models/historyModel";
import { BasePrivilegeRequiredController } from "./basePrivilegeRequiredController";

// export controller for use in the routes generation
export class HistoryController extends BasePrivilegeRequiredController {

    // get a specific History in the db by passing an id
    public static async get_a_history(req: express.Request, res: express.Response) {
        const taskId =  req.params.taskId;

        const isPriv = await this.verifyTaskModificationPrivilege(taskId, req);

        if (isPriv) {
            await History.find({ "taskId" : req.params.taskId }, (err, history) => {
                if (err){
                    res.send(err);
                    return;
                }
                res.json(history);
            });
        }
        else {
            res.send(Constants.PrivilegeErrorMsg);
        }
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
