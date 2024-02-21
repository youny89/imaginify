import { Schema, model, models } from "mongoose";

export interface User {
    clerkId: string;
    firstName?: string;
    lastName?: string;
    email: string;
    username: string;
    photo: string;
    planId?: number;
    creditBalance?: number;
    createdAt: Date;
    updatedAt: Date;
}


const UserSchema = new Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true
    },
    firstName:String,
    lastName:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    username: {
        type:String,
        required:true,
        unique:true
    },
    photo:{
        type:String,
        required:true
    },
    planId:{
        type:Number,
        default:1
    },
    creditBalance:{
        type:Number,
        default:0
    },
    createdAt:{ type:Date, default:Date.now },
    updatedAt:{ type:Date, default:Date.now },
});

 const User = models?.User || model('User', UserSchema);

 export default User;