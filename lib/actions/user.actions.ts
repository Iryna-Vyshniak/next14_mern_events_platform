'use server';

import { CreateUserParams } from "@/types";
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