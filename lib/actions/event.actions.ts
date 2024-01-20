'use server';

import { CreateEventParams } from "@/types";
import { connectToDatabase } from "../database";
import { handleError } from "../utils"
import Event from "../database/models/event.model";
import User from "../database/models/user.model";

export const createEvent = async ({ event, userId, path }: CreateEventParams) => {
    try {
        await connectToDatabase();

        // find the event organizer
        const organizer = await User.findById(userId);

        if (!organizer) throw new Error(`Could not find the event organizer`);

        // create new event
        const newEvent = Event.create({
            ...event,
            category: event.categoryId,
            organizer: userId,
        });

        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        handleError(error);
    }
}

