import { connectDB } from "@/config/dbConfig";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";
connectDB();

export const handleNewUserRegistration = async () => {
    try {
        const loggedInUser = await currentUser();

        //check if user is arleadyregistered
        const userExists = await UserModel.findOne({
            clerkUserId: loggedInUser?.id
        }, { timeout: 30000 });
        if (userExists) return userExists;

        //create a new user
        const newUser = new UserModel({
            userName: loggedInUser?.username,
            email: loggedInUser?.emailAddresses[0].emailAddress,
            clerkUserId: loggedInUser?.id,
        });

        await newUser.save();
        return newUser;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getMongoDBUserIDOfLoggedInUser = async () => {
    try {
        const loggedInUser = await currentUser();
        const userInMongoDb = await UserModel.findOne({
            clerkUserId: loggedInUser?.id,
        });
        if (userInMongoDb) return userInMongoDb._id;
    } catch (error:any) {
       throw new Error(error); 
    }
};