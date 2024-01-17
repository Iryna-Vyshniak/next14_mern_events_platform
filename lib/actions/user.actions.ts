'use server';

import { CreateUserParams, UpdateUserParams } from "@/types";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";

import User from "../database/models/user.model";

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