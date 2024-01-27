'use client';

import React from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import Link from 'next/link';

import { IEvent } from '@/lib/database/models/event.model';
import { Button } from '../ui/button';

import Checkout from './Checkout';

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const hasEventFinished = new Date(event.endDateTime) < new Date();
  return (
    <div className='flex items-center gap-3'>
      {/* {CAN`T BUY TICKET PAST EVENT} */}
      {hasEventFinished ? (
        <p className='p-2 text-primary-500'>Sorry, tickets are no longer available</p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className='button rounded-full' size='lg'>
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
