import React from 'react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';

import Collection from '@/components/shared/Collection';

import { getEventsByUser } from '@/lib/actions/event.actions';
import { getOrdersByUser } from '@/lib/actions/order.actions';

import { SearchParamsProps } from '@/types';
import { Button } from '@/components/ui/button';

import { IOrder } from '@/lib/database/models/order.model';

const ProfilePage = async ({ searchParams }: SearchParamsProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.orderPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  const organizedEvents = await getEventsByUser({
    userId,
    page: eventsPage,
    limit: 6,
  });

  return (
    <>
      <section className='py-5 md:py-10 bg-primary-50 bg-dotted-pattern bg-cover bg-center'>
        <div className='wrapper flex flex-items justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left drop-shadow-[1px_1px_1px_rgba(250,250,250,1)]'>
            My Tickets
          </h3>
          <Button asChild size='lg' className='button hidden sm:flex'>
            <Link href={'/#events'}>Explore More Events</Link>
          </Button>
        </div>
      </section>
      <section className='wrapper my-8'>
        <Collection
          data={orderedEvents}
          emptyTitle='No event tickets purchased yet'
          emptyStateSubtext='No worries - plenty of exciting events to explore!'
          collectionType='My_Tickets'
          limit={3}
          page={ordersPage}
          urlParamName='ordersPage'
          totalPages={orders?.totalPages}
        />
      </section>

      <section className='py-5 md:py-10 bg-primary-50 bg-dotted-pattern bg-cover bg-center'>
        <div className='wrapper flex flex-items justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left drop-shadow-[1px_1px_1px_rgba(250,250,250,1)]'>
            Events Organized
          </h3>
          <Button asChild size='lg' className='button hidden sm:flex'>
            <Link href={'/events/create'}>Create New Event</Link>
          </Button>
        </div>
      </section>
      <section className='wrapper my-8'>
        <Collection
          data={organizedEvents?.data}
          emptyTitle='No events have been created yet'
          emptyStateSubtext='Go create some events now'
          collectionType='Events_Organized'
          limit={3}
          page={searchParams.page as string}
          urlParamName='eventsPage'
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default ProfilePage;
