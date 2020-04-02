'use strict';

import { Document } from "mongoose";

// class that will help will json document functions
export class JsonDocumentHelpers{

    // merge two json documents together
    public static mergeJsonDocuments(a: Document, b: Document){
        const aObj = a.toObject();
        const bObj = b.toObject();

        return this.mergeJson(aObj, bObj);
    }

    // merge two json any objects together
    private static mergeJson(a: any, b: any){
        const keys = Object.keys(b);

        for (const key of keys) {
            if (a[key] == null){
                a[key] = b[key];
            }
        }
        return a;
    }
}