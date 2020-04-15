'use strict';

import mongoose from "mongoose";

// class to reconstruct settings table test data
export class SettingsTestData {

    // clear the settings table and re-generate test data
    static async ConstructTestData(){
        const settings = mongoose.connection.collection("settings");

        if (settings){
            await settings.deleteMany({ });
        }

    }
}
