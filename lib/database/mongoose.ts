// in express application, you might have seen directly connect to mongodb  within the application only once!
// but in nextjs it is the other way around, we have to call it on each and every sever action or api reqeust
// in nextjs unlike in traditional server-based application lik express using mongodb you connect to the database on every reqeust or server action
// because nextjs runs in a serverless environment.
// serverless functions are stateless meaning that they start up to handle a request and shut donw right after without mainting a continuous connection to database
// this approach ensure that each request is handled independedntly allowing for better scalability and realiability as there's no need to manage persistent connections across many instances which works well with scalable and flexible nature of nextjs application.
// but doing that without any optimization would mean too many mongodb connections open for each and every action will perform on the server-side
// so to optimize our process will resort to catching our connections
// to properly implement caching , we can create a 

import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL;


interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null
}
let cached: MongooseConnection = (global as any).mongoose;
if(!cached) {
    cached = (global as any).mongoose = {
        conn:null,
        promise:null
    }
}

// everytime we try to connect to databas,
// first we will check if we already have a cached connection, if we have it we will exit out immediately, therefore optimizing our application
export const connectToDatebase = async () => {
    if(cached.conn) return cached.conn;
    if(!MONGODB_URL) throw new Error('Missing MONGODB URL!');
    
    cached.promise = 
        cached.promise || 
        mongoose.connect(MONGODB_URL, { dbName:"imaginify", bufferCommands: false})

    cached.conn = await cached.promise;

    return cached.conn;
}