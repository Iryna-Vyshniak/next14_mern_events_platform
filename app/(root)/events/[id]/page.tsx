import React from 'react';
import { SearchParamsProps } from '@/types';
import { getEventById } from '@/lib/actions/event.actions';
import Image from 'next/image';
import { formatDateTime } from '@/lib/utils';

const EventDetails = async ({ params: { id }, searchParams }: SearchParamsProps) => {
  const event = await getEventById(id);

  return (
    <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain bg-center'>
      <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
        <Image
          src={event.imageUrl}
          alt='hero image'
          width={1000}
          height={1000}
          className='w-full h-full min-h-[300px] object-cover object-center'
        />
        <div className='flex w-full flex-col gap-8 p-5 md:p-10'>
          <div className='flex flex-col gap-6'>
            <h2 className='wrapper h2-bold text-center sm:text-left drop-shadow-[1px_1px_1px_rgba(250,250,250,1)]'>
              {event.title}
            </h2>

            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <div className='flex gap-3'>
                <p className='p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-800'>
                  {event.isFree ? 'FREE' : `$${event.price}`}
                </p>
                <p className='p-medium-16 px-4 py-2.5 text-muted uppercase bg-muted-foreground rounded-full '>
                  {event.category.name}
                </p>
              </div>
              <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                by{' '}
                <span className='text-slate-800'>
                  {event.organizer.firstName} {event.organizer.lastName}
                </span>
              </p>
            </div>
          </div>
          <p>CHECKOUT BUTTON</p>
          <div className='flex flex-col gap-5'>
            <div className='flex gap-2 md:gap-3'>
              <Image src='/assets/icons/calendar.svg' alt='calendar' width={32} height={32} />
              <div className='p-medium-16 lg:p-regular-20 flex flex-wrap items-center'>
                <p>
                  {formatDateTime(event.startDateTime).dateOnly} -{' '}
                  {formatDateTime(event.startDateTime).timeOnly}
                </p>
                <p>
                  {formatDateTime(event.endDateTime).dateOnly} -{' '}
                  {formatDateTime(event.endDateTime).timeOnly}
                </p>
              </div>
            </div>
            <div className='p-regular-20 flex items-center gap-3'>
              <Image src='/assets/icons/location.svg' alt='location' width={32} height={32} />
              <p className='p-medium-16 lg:p-regular-20'>{event.location}</p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='p-bold-20 text-grey-600'>Discover the Experience:</p>
            <p className='p-medium-16 lg:p-regular-18'>{event.description}</p>
            <p className='p-medium-16 lg:p-regular-18 truncate text-slate-500 underline cursor-pointer hover:text-slate-800 focus:text-slate-800'>
              <a rel='noopener noreferrer' href={event.url}>
                Link
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
