import React from 'react';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

import { IEvent } from '@/lib/database/models/event.model';
import { formatDateTime } from '@/lib/utils';
import DeleteConfirmation from './DeleteConfirmation';

const Card = ({
  event,
  hasOrderLink,
  hidePrice,
}: {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
}) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className='relative group flex flex-col w-full max-w-[400px] min-h-[380px] md:min-h-[438px] bg-slate-50 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg '>
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className='flex-center flex-grow bg-slate-100 bg-cover bg-center text-slate-800'
      />
      {isEventCreator && !hidePrice && (
        <div className='absolute right-2 top-2 flex flex-col gap-4 p-3 rounded-xl bg-white shadow-sm shadow-slate-400 transition-all'>
          <Link href={`/events/${event._id}/update`}>
            <Image src='/assets/icons/edit.svg' alt='edit' width={20} height={20} />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <div className='flex min-h-[230px] flex-col gap-3 p-5 md:gap-4'>
        {!hidePrice && (
          <div className='flex gap-2'>
            <span className='flex items-center justify-center px-4 py-1 p-semibold-14 w-min rounded-full bg-green-50 text-green-800'>
              {event.isFree ? 'FREE' : `$${event.price}`}
            </span>
            <p className='flex items-center justify-center px-4 py-1 p-semibold-14 w-min text-muted uppercase bg-muted-foreground rounded-full line-clamp-1'>
              {event.category.name}
            </p>
          </div>
        )}
        <p className='p-medium-16 md:p-medium-18 text-slate-800'>
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        <p className='flex-1 p-medium-16 md:medium-20 line-clamp-2 text-black drop-shadow-[0px_1px_1px_rgba(250,250,250,1)]'>
          {event.title}
        </p>
        <div className='flex-between w-full'>
          <p className='p-medium-14 md:p-medium-16 text-slate-800'>
            @{event.organizer.firstName} {event.organizer.lastName}
          </p>
          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className='flex gap-2'>
              <p className='text-primary-500'>Order Details</p>
              <Image src='/assets/icons/arrow.svg' alt='search' width={10} height={10} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
