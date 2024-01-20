'use server';

import { CreateEventParams } from "@/types";
import { connectToDatabase } from "../database";
import { handleError } from "../utils"
import Event from "../database/models/event.model";
import User from "../database/models/user.model";
import Category from "../database/models/category.model";

const populateEvent = async (query: any) => {
    return query
        .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
        .populate({ path: 'category', model: Category, select: '_id name' })
}

//  greate event
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


// get one event by id
export async function getEventById(eventId: string) {
    try {
        await connectToDatabase()

        const event = await populateEvent(Event.findById(eventId))

        if (!event) throw new Error('Event not found')

        return JSON.parse(JSON.stringify(event))
    } catch (error) {
        handleError(error)
    }
}