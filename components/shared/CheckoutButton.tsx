'use client';

import React from 'react';

import { IEvent } from '@/lib/database/models/event.model';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { Button } from '../ui/button';
import Link from 'next/link';
import Checkout from './Checkout';

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const hasEventFinished = new Date(event.endDateTime) < new Date();
  return (
    <div className='flex flex-center gap-3'>
      {/* {CAN`T BUY TICKET PAST EVENT} */}
      {hasEventFinished ? (
        <p className='text-primary-500'>Sorry, tickets are no longer available</p>
      ) : (
        <>
          <SignedOut>
            <Button asChild size='lg' className='button rounded-full'>
              <Link href='/sign-in'>Get Tickets</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
