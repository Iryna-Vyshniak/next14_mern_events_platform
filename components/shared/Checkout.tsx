import React from 'react';

import { IEvent } from '@/lib/database/models/event.model';
import { Button } from '../ui/button';

type CheckoutProps = {
  event: IEvent;
  userId: string;
};

const Checkout = ({ event, userId }: CheckoutProps) => {
  const onCheckout = async () => {
    console.log('CHECKOUT');
  };

  return (
    <form action={onCheckout} method='post'>
      <Button type='submit' role='link' size='lg' className='button rounded-full sm:w-fit'>
        {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
      </Button>
    </form>
  );
};

export default Checkout;
