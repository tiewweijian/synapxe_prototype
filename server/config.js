import { MongoClient } from "mongodb";


export const uri =  "mongodb://127.0.0.1:27017" 

//to run locally change uri to mongodb://127.0.0.1:27017
//to run on cloud: mongodb+srv://admin:admin@cluster0.amsbhce.mongodb.net/?retryWrites=true&w=majority
export const client = new MongoClient(uri)