'use strict';

//import mongoose and express
import express from "express";
import mongoose, { MongooseDocument } from "mongoose";

var Tasks: mongoose.Model<mongoose.Document, {}> = mongoose.model("Tasks");

export class TaskController {

    static list_all_tasks(req: express.Request, res: express.Response) {
        Tasks.find({}, function(err, task) {
            if (err){
                res.send(err);
            }
            res.json(task);
      });
    }

    static get_a_task(req: express.Request, res: express.Response) {
        Tasks.findById(req.params.taskId, function(err, task) {
            if (err){
                res.send(err);
            }
            res.json(task);
        });
    }

    static create_a_task(req: express.Request, res: express.Response) {
        var newTask = new Tasks(req.body);
        newTask.save(function(err, task) {
            if (err){
                res.send(err);
            }
            res.json(task);
        });
    }

    static update_a_task(req: express.Request, res: express.Response) {
        Tasks.findByIdAndUpdate(req.params.taskId, req.body, function(err, task) {
            if (err){
                res.send(err);
            }
            res.json(task);
        });
    }

    static delete_a_task(req: express.Request, res: express.Response) {
        Tasks.findByIdAndDelete(req.params.taskId, function(err, task) {
            if (err){
                res.send(err);
            }
            res.json({ message: `Task ${req.params.taskId} successfully deleted`});
        });
    }
}
