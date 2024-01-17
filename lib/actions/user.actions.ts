'use server';

import { revalidatePath } from "next/cache";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";

import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import Order from "../database/models/order.model";

export const createUser = async (user: CreateUserParams) => {
    try {
        await connectToDatabase();

        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error);
    }
}

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
    try {
        await connectToDatabase();

        const updateUser = await User.findByIdAndUpdate({ clerkId }, user, { new: true });

        if (!updateUser) throw new Error('User update failed');

        return JSON.parse(JSON.stringify(updateUser));
    } catch (error) {
        handleError(error);
    }

}


export const deleteUser = async (clerkId: string) => {
    try {
        await connectToDatabase();

        // find user to delete  from database

        const userForDeleted = await User.findById({ clerkId });

        if (!userForDeleted) throw new Error(`User ${userForDeleted} not found`);

        // unlink relationships

        await Promise.all([
            // update the events` collection to remove references to the user
            Event.updateMany(
                { _id: { $in: userForDeleted.events } },
                { $pull: { organizer: userForDeleted._id } }
            ),

            // update the 'orders' collection to remove references to the user
            Order.updateMany(
                { _id: { $in: userForDeleted.orders } },
                { $unset: { buyer: 1 } }),
        ])

        // delete user
        const deletedUser = await User.findByIdAndDelete(userForDeleted._id);
        revalidatePath('/');

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;;

    } catch (error) {
        handleError(error);
    }

}