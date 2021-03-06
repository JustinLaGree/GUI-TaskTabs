'use strict';

// import mongoose and express
import { Counter } from "../models/counterModel";
import mongoose from "mongoose";

// export controller for use in the routes generation
export class CounterController {

    // get a specific counter in the db by passing an id
    static get_a_counter(counterId: string): Promise<mongoose.Document> {
        const query = Counter.findById(counterId);
        return query.exec();
    }

    // update a specific counter in the db by passing an id ... all other info expected in the body
    // uses body of x-www-form-urlencoded type
    static async update_a_counter(counterId: string, body: any) {
        const update = new Counter(body);

        await Counter.findByIdAndUpdate(counterId, update, (err, counter) => {
            if (err){
                throw new Error(err);
            }
            return counter;
        });
    }
}

// Dictionary for the logical name to Identifier in db
export const CounterMapping = {
    "taskSequence": "1"
}
