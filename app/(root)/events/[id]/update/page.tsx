import React from 'react';
import { auth } from '@clerk/nextjs';

import EventForm from '@/components/shared/EventForm';
import { getEventById } from '@/lib/actions/event.actions';

type UpdateEventProps = {
  params: { id: string };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  // get user id for form

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const event = await getEventById(id);

  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <h3 className='wrapper h3-bold text-center sm:text-left drop-shadow-[1px_1px_1px_rgba(250,250,250,1)]'>
          Update Event
        </h3>
      </section>

      <div className='wrapper my-8'>
        <EventForm userId={userId} type='Update' event={event} eventId={event._id} />
      </div>
    </>
  );
};

export default UpdateEvent;
