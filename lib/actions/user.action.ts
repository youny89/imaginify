
// this will mark all the functions from this file as server actions.
// server actions are asynchronous function that are executed on the server.
// server actions are simpler alternative to api routes
// we do not need to have many api routes, we can just use simple functino (server action)
'use server';

import User from "../database/models/user.model";
import { connectToDatebase } from "../database/mongoose";
import { handleError, responseJson } from "../utils";


// sync the data between a clerk user and our newly created database user.
// we will do that by using the concept known as webhook
// webhook is a concept where when a something happens as event is triggered.
// in our case what will trigger an event, well clerk will trigger an event once a user signs up with a new clerk account
// then it will make a request with a payload containing all that clerk user data 
// then it will send that data over to event processing directly to our databse
// so that we can create a new user

// create
export async function createUser (user:any) {
    try {
        await connectToDatebase();

        const newUser = await User.create(user);

        return responseJson(newUser);
    } catch (error) {
        handleError(error);
    }
}

// Read
export async function getUserById(userId: string){
    try {
        await connectToDatebase();
        const user = await User.findOne({clerkId: userId})
        if(!user) throw new Error('User not found!');
        return responseJson(user);
    } catch (error) {
        handleError(error);
    }
}

// update
export async function updateUser (clerkId:string, user:any) {
    try {
        await connectToDatebase();
        const updatedUser = await User.findOneAndUpdate(
            { clerkId },
            user,
            { new: true}
        )

        if(!updatedUser) throw new Error('User update failed');
        return responseJson(updatedUser);
    } catch (error) {
        handleError(error);
    }
}

//  DELETE
export async function deleteUser (clerkId: string) {
    try {
        await connectToDatebase();
        const userToDelete = await User.findOne({clerkId});
        
        if(!userToDelete) throw new Error('User not fonud!')

        // Delete user
        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        if(!deletedUser) return null;
        return responseJson(deletedUser)
    } catch (error) {
        handleError(error);
    }
}