'use server';

import { revalidatePath } from "next/cache";

import { CreateEventParams, DeleteEventParams, GetAllEventsParams } from "@/types";
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
        const newEvent = await Event.create({
            ...event,
            category: event.categoryId,
            organizer: userId
        })
        revalidatePath(path)

        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        handleError(error);
    }
}


// get one event by id
export const getEventById = async (eventId: string) => {
    try {
        await connectToDatabase()

        const event = await populateEvent(Event.findById(eventId))

        if (!event) throw new Error('Event not found')

        return JSON.parse(JSON.stringify(event))
    } catch (error) {
        handleError(error)
    }
}

// get all events
export const getAllEvents = async ({ query, limit = 6, page, category }: GetAllEventsParams) => {
    try {
        await connectToDatabase();


        const conditions = {}
        const eventsQuery = Event.find(conditions).sort({ createdAt: 'desc' }).skip(0).limit(limit);


        const allEvents = await populateEvent(eventsQuery);

        const eventsCount = await Event.countDocuments(conditions);

        return {
            data: JSON.parse(JSON.stringify(allEvents)),
            totalPages: Math.ceil(eventsCount / limit),
        }
    } catch (error) {
        handleError(error);
    }

}


// delete event
export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
    try {

        await connectToDatabase();

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (deletedEvent) revalidatePath(path);
    } catch (error) {
        handleError(error);

    }

}