import * as z from 'zod';

// event form schema validation
export const eventFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters.'),
    description: z.string().min(10, 'Description must be at least 10 characters.').max(450, 'Description must be at least 450 characters'),
    location: z.string().min(3, 'Location must be at least 3 characters.').max(250, 'Location must be at least 250 characters'),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url()
});