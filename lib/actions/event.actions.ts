'use server';

import { revalidatePath } from "next/cache";

import { CreateEventParams, DeleteEventParams, GetAllEventsParams, GetRelatedEventsByCategoryParams, UpdateEventParams } from "@/types";
import { connectToDatabase } from "../database";
import { handleError } from "../utils"

import Event from "../database/models/event.model";
import User from "../database/models/user.model";
import Category from "../database/models/category.model";

const populateEvent = async (query: any) => {
    // populate використовується для заміни посилань на інші документи їхніми реальними значеннями на основі вказаних умов. У даному випадку: path: 'organizer': Вказує шлях, який має бути замінений(поле organizer у документі). model: User: Вказує модель Mongoose, яка повинна використовуватися для заповнення цього поля(User).select: '_id firstName lastName': Вказує поля, які потрібно вибрати з об'єктів User для заповнення.
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

// get events with same category

export const getRelatedEventsByCategory = async ({ categoryId, eventId, limit = 3, page = 1 }: GetRelatedEventsByCategoryParams) => {
    try {
        await connectToDatabase();

        const skipAmount = (Number(page) - 1) * limit;
        const conditions = { $and: [{ categoryId: categoryId }, { _id: { $ne: eventId } }] }
        // $and (логічне "І") { categoryId: categoryId }: Умова, яка обмежує результати до документів, де поле categoryId дорівнює значенню categoryId. Це фільтрує результати за категорією.
        // { _id: { $ne: eventId } }: Умова, яка виключає документи з результатів, де поле _id не дорівнює значенню eventId.

        const eventsQuery = await Event.find(conditions).sort({ createdAt: 'desc' }).skip(skipAmount).limit(limit);
        const events = await populateEvent(eventsQuery);
        const eventsCount = await Event.countDocuments(conditions);

        return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }

    } catch (error) {
        handleError(error);
    }
}

// update event
export const updateEvent = async ({ userId, event, path }: UpdateEventParams) => {
    try {
        await connectToDatabase();

        const eventToUpdate = await Event.findById(event._id);
        if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
            throw new Error('Unauthorized or event not found');
        }

        const updatedEvent = await Event.findByIdAndUpdate(event._id, { ...event, category: event.categoryId }, { new: true });
        revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedEvent));
    } catch (error) {
        handleError(error);
    }
}